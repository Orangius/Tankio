import TankImage from "@/components/TankImage/TankImage";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { TankDataType } from "@/app/dashboard/page";

import useWebSocket, { ReadyState } from "react-use-websocket";
const WS_URL = "ws://localhost:3000/api/devices";
const USERNAME = "dashboard_secret";

const TankAndControls = ({
  userTankData,
}: {
  userTankData: TankDataType | undefined;
}) => {
  const [pumpOnImage, setPumpOnImage] = useState(false);
  function swap() {
    setPumpOnImage(!pumpOnImage);
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
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    queryParams: { id: USERNAME },
    share: true,
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 10,
    //attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
    reconnectInterval: 3000,
    onMessage: (message) => {
      if (message.data == "offline") {
        setDeviceisOnline(false);
      } else {
        setDeviceisOnline(true);
      }

      console.log("Message Received: ", message.data);
    },
  });

  console.log("Message is: ", deviceIsOnline);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    console.log("effect ran");
    sendMessage("PING:");
  }, []);

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

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
          <button
            className="h-8 ml-2 mt-2 rounded-[15px] font-bold text-xl w-20 bg-primary text-primary-foreground"
            onClick={swap}
          >
            {pumpOnImage ? "Off" : "On"}
          </button>
          <h3 className="font-bold text-xl">50%</h3>
        </div>
        <div className={clsx({ hidden: pumpOnImage })}>
          {" "}
          <TankImage level={50} animated={false} />
        </div>
        <div className={clsx({ hidden: !pumpOnImage })}>
          {" "}
          <TankImage level={50} animated={true} />
        </div>
      </div>
    </div>
  );
};

export default TankAndControls;
