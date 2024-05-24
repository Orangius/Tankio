import Link from "next/link";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";
export default function Footer() {
  return (
    <div className=" flex flex-col justify-center item-center bg-secondary min-h-[100px] mx-4 mt-10 rounded-tl-[24px] rounded-tr-[24px] text-center p-4 text-sm md:text-lg">
      <h4>
        Copyright{" "}
        <span>
          <MdCopyright className="inline-block" />
        </span>{" "}
        2024 All rights reserved | Designed by Nwani Remigius
      </h4>
      <div className="flex justify-center item-center gap-2 mt-2">
        <Link href={"#"}>
          <FaFacebook />
        </Link>
        <Link href={"https://www.linkedin.com/in/nwaniremi"}>
          <FaLinkedin />
        </Link>
        <Link href={"#"}>
          <FaInstagram />
        </Link>
      </div>
    </div>
  );
}
