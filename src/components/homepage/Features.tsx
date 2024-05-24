import { TbAutomaticGearbox } from "react-icons/tb";
import { GiAutomaticSas } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { MdSettingsSuggest } from "react-icons/md";

import React from "react";

export default function Features() {
  return (
    <section className="mt-14 px-4 flex flex-col md:flex-row gap-2">
      <div className="bg-input md:w-1/3 p-5 border border-primary rounded-3xl flex items-start gap-2 min-h-[232px]">
        <GiAutomaticSas className="text-6xl basis-1/6 grow shrink" />

        <div className=" basis-5/6">
          <h2 className="font-bold text-2xl">Automatic</h2>
          <h3 className="text-xl">
            Set your pump to automatically fill your tank when a certain lower
            threshold is reached,you can go old school and take control via your
            dashboard...The choice is yours!
          </h3>
        </div>
      </div>
      <div className="bg-input md:w-1/3 p-5 border border-primary  rounded-3xl flex items-start gap-2 min-h-[232px] ">
        <MdVerified className="text-6xl basis-1/6 grow shrink" />

        <div className=" basis-5/6">
          <h2 className="font-bold text-2xl">Reliable</h2>
          <h3 className="text-xl">
            Built on a resilient system, you can be sure of continous reliable
            operation
          </h3>
        </div>
      </div>
      <div className="bg-input md:w-1/3 p-5 border border-primary  rounded-3xl flex items-start gap-2 min-h-[232px] ">
        <MdSettingsSuggest className="text-6xl basis-1/6 grow shrink" />

        <div className=" basis-5/6">
          <h2 className="font-bold text-2xl">Efficient</h2>
          <h3 className="text-xl">
            Low power hardware, energy saving, intelligent power management and
            sleep mode.
          </h3>
        </div>
      </div>
    </section>
  );
}
