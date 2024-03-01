import TankImage from "@/components/TankImage/TankImage";
import { useState } from "react";
import clsx from "clsx";
import { TankDataType } from "@/app/dashboard/page";

const TankAndControls = ({
  userTankData,
}: {
  userTankData: TankDataType | undefined;
}) => {
  const [pumpOnImage, setPumpOnImage] = useState(false);
  function swap() {
    setPumpOnImage(!pumpOnImage);
  }
  return (
    <div className="w-full  md:w-1/3">
      <div className="mb-4">
        {userTankData?.username ? (
          <h1 className="text-2xl font-bold">
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
