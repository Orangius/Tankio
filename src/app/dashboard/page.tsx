"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { fetchUserDevice } from "@/lib/serverActions";
import TankAndControls from "@/components/TankAndControls/TankAndControls";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

export interface TankDataType {
  username: string;
  tankMonitor: {
    tankMonitorId: string;
    numberOfMonitoredTanks: string;
  };
  setTank: () => void;
}

import DialogBox from "@/components/dialog/dialog";

const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const [userTankData, setUserTankData] = useState<TankDataType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tankAdded, setTankAdded] = useState<boolean>(false);

  function addTank() {
    setTankAdded(true);
  }

  useEffect(() => {
    async function fetchTankInfo() {
      // setIsLoading(true);

      await fetchUserDevice(session?.user?.name).then((res) => {
        setUserTankData(res);
        setIsLoading(false);
      });
    }
    if (status === "authenticated") {
      fetchTankInfo();
    }
  }, [session?.user?.name, tankAdded]);

  return (
    <div className=" mx-4 h-[80vh] flex flex-col justify-center items-center">
      {!isLoading ? (
        <>
          {userTankData?.tankMonitor ? (
            <TankAndControls userTankData={userTankData} />
          ) : !tankAdded ? (
            <DialogBox setTank={addTank} userTankData={userTankData} />
          ) : null}{" "}
        </>
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
