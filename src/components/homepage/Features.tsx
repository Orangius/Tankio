import { TbAutomaticGearbox } from "react-icons/tb"
import { GiAutomaticSas } from "react-icons/gi"
import { MdVerified } from "react-icons/md"
import { MdSettingsSuggest } from "react-icons/md"

import React from "react"

export default function Features() {
  return (
    <section className="mt-14 px-4 flex flex-col md:flex-row gap-2">
      <div className="bg-input p-5 border border-primary  rounded-3xl flex items-start gap-2 min-h-[232px] ">
        <GiAutomaticSas className="text-6xl basis-1/6 grow shrink" />

        <div className=" basis-5/6">
          <h2 className="font-bold text-2xl">Automatic</h2>
          <h3 className="text-xl">
            Lorem ipsum dolor sit amet consectetur. Phasellus neque venenatis
            metus sapien vulputate. Diam diam netus amet iaculis phasellus
            aliquam.
          </h3>
        </div>
      </div>
      <div className="bg-input p-5 border border-primary  rounded-3xl flex items-start gap-2 min-h-[232px] ">
        <MdVerified className="text-6xl basis-1/6 grow shrink" />

        <div className=" basis-5/6">
          <h2 className="font-bold text-2xl">Reliable</h2>
          <h3 className="text-xl">
            Lorem ipsum dolor sit amet consectetur. Phasellus neque venenatis
            metus sapien vulputate. Diam diam netus amet iaculis phasellus
            aliquam.
          </h3>
        </div>
      </div>
      <div className="bg-input p-5 border border-primary  rounded-3xl flex items-start gap-2 min-h-[232px] ">
        <MdSettingsSuggest className="text-6xl basis-1/6 grow shrink" />

        <div className=" basis-5/6">
          <h2 className="font-bold text-2xl">Efficient</h2>
          <h3 className="text-xl">
            Lorem ipsum dolor sit amet consectetur. Phasellus neque venenatis
            metus sapien vulputate. Diam diam netus amet iaculis phasellus
            aliquam.
          </h3>
        </div>
      </div>
    </section>
  )
}
