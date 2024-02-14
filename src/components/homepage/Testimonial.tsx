import React from "react"
import Image from "next/image"
export default function Testimonial() {
  return (
    <section className="flex flex-col md:flex-row mt-20">
      <div className="mt-10 mx-4 text-center border border-primary rounded-[24px] px-5 pt-16 pb-10">
        <div className="flex flex-col justify-center items-center bg-secondary-foreground text-center rounded-tl-[24px] rounded-tr-[24px] min-h-[122px]  relative">
          <Image
            src={"/woman-1.png"}
            alt="Tankio Logo"
            width={1000}
            height={1000}
            className="rounded-full h-[88px] w-[88px] absolute -top-10"
            priority
          ></Image>
          <h3 className="text-primary-foreground mt-10 font-bold text-2xl">
            Lorem ipsum
          </h3>
        </div>
        <div>
          <h3 className="text-xl">
            Lorem ipsum dolor sit amet consectetur. Urna non aliquet nibh leo
            erat. Ac nunc enim cursus aliquam quam at integer tortor. Commodo
            massa diam tempor sem purus id massa. Volutpat elit arcu sit et.
          </h3>
        </div>
      </div>
      <div className="mt-10 mx-4 text-center border border-primary rounded-[24px] px-5 pt-16 pb-10   ">
        <div className="flex flex-col justify-center items-center bg-secondary-foreground text-center rounded-tl-[24px] rounded-tr-[24px] min-h-[122px]  relative">
          <Image
            src={"/woman-1.png"}
            alt="Tankio Logo"
            width={1000}
            height={1000}
            className="rounded-full h-[88px] w-[88px] absolute -top-10"
            priority
          ></Image>
          <h3 className="text-primary-foreground mt-10 font-bold text-2xl">
            Lorem ipsum
          </h3>
        </div>
        <div>
          <h3 className="text-xl">
            Lorem ipsum dolor sit amet consectetur. Urna non aliquet nibh leo
            erat. Ac nunc enim cursus aliquam quam at integer tortor. Commodo
            massa diam tempor sem purus id massa. Volutpat elit arcu sit et.
          </h3>
        </div>
      </div>
      <div className="mt-10 mx-4 text-center border border-primary rounded-[24px] px-5 pt-16 pb-10   ">
        <div className="flex flex-col justify-center items-center bg-secondary-foreground text-center rounded-tl-[24px] rounded-tr-[24px] min-h-[122px]  relative">
          <Image
            src={"/woman-1.png"}
            alt="Tankio Logo"
            width={1000}
            height={1000}
            className="rounded-full h-[88px] w-[88px] absolute -top-10"
            priority
          ></Image>
          <h3 className="text-primary-foreground mt-10 font-bold text-2xl">
            Lorem ipsum
          </h3>
        </div>
        <div>
          <h3 className="text-xl">
            Lorem ipsum dolor sit amet consectetur. Urna non aliquet nibh leo
            erat. Ac nunc enim cursus aliquam quam at integer tortor. Commodo
            massa diam tempor sem purus id massa. Volutpat elit arcu sit et.
          </h3>
        </div>
      </div>
    </section>
  )
}
