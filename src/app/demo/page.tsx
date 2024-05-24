"use client";

import TankImage from "@/components/TankImage/TankImage";
import clsx from "clsx";
import { randomInt } from "crypto";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DemoPage = () => {
  const [waterLevel, setWaterLevel] = useState(50);
  const [pumpOnImage, setPumpOnImage] = useState(false);
  const { data: session, status } = useSession();
  function swap() {
    setPumpOnImage((currentValue)=>!currentValue);
  }

  useEffect(() => {
    if (pumpOnImage) {
      const intervalID = setInterval(() => {
        setWaterLevel((lastvalue) => {
          if (lastvalue >= 100) {
            return 0;
          } else {
            return lastvalue + 1;
          }
        });
      }, 200);
      return () => clearInterval(intervalID);
    }
  }, [pumpOnImage]);

  // console.log("water level is: ", waterLevel);
  // console.log("Session is", session?.user?.name);

  return (
    <div className="mx-8 md:mx-0 flex flex-col justify-center items-center">
      <div className="w-full md:w-1/3">
        <div className="mb-4">
          {session?.user?.name ? (
            <h1 className="text-2xl text-center font-bold">
              Welcome,{" "}
              {session?.user?.name.charAt(0).toUpperCase() +
                session?.user?.name.slice(1)}
            </h1>
          ) : (
            <h1 className="text-2xl text-center font-bold">Welcome, Guest</h1>
          )}
          <p className="text-center">
            Pump water into your tank by clicking the &quot;On&quot; button,
            turn it off by clicking the same button. Its as simple as that!
          </p>
        </div>
        <div className=" bg-secondary border border-primary rounded-[24px]">
          <div className="flex justify-between items-center mt-2 mx-2">
            <button
              className="h-8 ml-2 mt-2 rounded-[15px] font-bold text-xl w-20 bg-primary text-primary-foreground"
              onClick={swap}
            >
              {pumpOnImage ? "Off" : "On"}
            </button>

            <h3 className="font-bold text-xl">{`${waterLevel}%`}</h3>
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
    </div>
  );
};

export default DemoPage;
