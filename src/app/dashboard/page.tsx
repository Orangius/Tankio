"use client"

import React, { useState } from "react"
import TankImage from "@/components/TankImage/TankImage"
import clsx from "clsx"
export default function page() {
  const [pumpOnImage, setPumpOnImage] = useState(false)

  function swap() {
    setPumpOnImage(!pumpOnImage)
  }

  return (
    <div className="mx-4">
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
  )
}
