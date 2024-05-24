import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <main className="px-4 md:px-8 py-1">
      <div className="  text-center md:text-left flex flex-col md:flex-row">
        <div className="md:basis-[793px] md:shrink">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Never Run
            <br />
            Out Of Water <br />
            Again
          </h1>
          <h2 className="text-xl">
            Monitor and manage water in your <br />
            home from anywhere, anytime, anyday! <br />
          </h2>
          <button className="hidden md:block mt-4 md:mt-12 bg-accent w-full md:w-[221px] h-[72px] rounded-full text-accent-foreground">
            <Link href={"/signup"}>Get Started</Link>
          </button>
        </div>
        <div className="py-4 md:basis-[793px] md:shrink">
          <Image
            src={"/water-homepage.png"}
            alt="Tankio Logo"
            width={3172}
            height={2320}
            className="rounded-[24px] w-full"
            priority
          ></Image>
        </div>
        <button className="md:hidden mt-4 bg-accent w-1/2 md:w-[221px] h-12 rounded-[24px] text-accent-foreground">
          <Link href={"/signup"}>Get Started</Link>
        </button>
      </div>
    </main>
  );
}
