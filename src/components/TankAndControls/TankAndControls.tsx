import TankImage from "@/components/TankImage/TankImage";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { TankDataType } from "@/app/dashboard/page";
import { useSession } from "next-auth/react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { fetchTankLevel } from "@/lib/serverActions";

import { WS_URL } from "@/lib/constants";
const type = "DASHBOARD";

const TankAndControls = ({
  userTankData,
}: {
  userTankData: TankDataType | undefined;
}) => {
  const [pumpOnImage, setPumpOnImage] = useState(false);
  const [waterLevel, setWaterLevel] = useState(0);
  const { data: session, status } = useSession();

  async function fetchTankInfo() {
    // setIsLoading(true);

    await fetchTankLevel(session?.user?.name).then((res) => {
      setWaterLevel(res.tankMonitor.tankLastLevel);
    });
  }

  function swap() {
    setPumpOnImage((currentValue) => !currentValue);

    const toggleState = {
      headers: {
        type: "message",
        senderId: String(userTankData?.tankMonitor.tankMonitorId),
        receiverType: "HARDWARE",
      },
      body: {
        type: "togglestate",
        value: !pumpOnImage,
      },
    };
    sendMessage(JSON.stringify(toggleState));
  }

  const [deviceIsOnline, setDeviceisOnline] = useState(false);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(WS_URL, {
    onOpen: () => {},
    queryParams: {
      id: String(userTankData?.tankMonitor.tankMonitorId),
      type: type,
    },
    share: true,
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 10,
    //attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
    reconnectInterval: 3000,
    onMessage: (message) => {
      try {
        const jsonMessage: WsRequest | WsResponse = JSON.parse(message.data);
        console.log(jsonMessage);
        switch (jsonMessage.headers.type) {
          case "update":
            if (jsonMessage.headers.online) {
              setDeviceisOnline(true);
              fetchTankInfo();
            } else {
              setDeviceisOnline(false);
              setPumpOnImage(false);
            }

            break;
          case "message":
            if ("body" in jsonMessage && jsonMessage.body) {
              switch (jsonMessage.body.type) {
                case "updatetanklevel":
                  setWaterLevel(Number(jsonMessage.body.value));
                  break;

                case "togglestate":
                  break;
              }
            }
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  useEffect(() => {
    const CheckStatus = {
      headers: {
        type: "checkstatus",
        senderId: "MTANK",
        receiverType: "HARDWARE",
      },
    };
    sendMessage(JSON.stringify(CheckStatus));
  }, [userTankData?.tankMonitor.tankMonitorId, sendMessage]);

  return (
    <div className="w-full mt-40  md:w-1/3">
      <div className="mb-4">
        {userTankData?.username ? (
          <h1 className="text-2xl text-center font-bold">
            Welcome,{" "}
            {userTankData.username?.charAt(0).toUpperCase() +
              userTankData.username?.slice(1)}
          </h1>
        ) : null}
      </div>
      <div className=" bg-secondary border border-primary rounded-[24px] ">
        <div className="flex justify-between items-center mt-2 mx-2">
          {deviceIsOnline ? (
            <button
              className="h-8 ml-2 mt-2 rounded-[15px] font-bold text-xl w-20 bg-primary text-primary-foreground"
              onClick={swap}
            >
              {pumpOnImage ? "Off" : "On"}
            </button>
          ) : (
            <h3 className="text-gray-400 text-xl">Device Offline</h3>
          )}
          {deviceIsOnline ? (
            <h3 className="font-bold text-xl">{`${waterLevel}%`}</h3>
          ) : (
            <h3 className="font-bold text-l">Level: unknown</h3>
          )}
        </div>
        <div className={clsx({ hidden: pumpOnImage })}>
          {" "}
          <TankImage level={waterLevel} animated={false} />
        </div>
        <div className={clsx({ hidden: !pumpOnImage })}>
          {" "}
          <TankImage level={waterLevel} animated={true} />
        </div>
      </div>
    </div>
  );
};

export default TankAndControls;
