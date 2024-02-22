"use client"
import Image from "next/image"
import React, { useState } from "react"
import { IoMenu } from "react-icons/io5"
import { IoMdClose } from "react-icons/io"
import { Separator } from "@/components/ui/separator"
import { clsx } from "clsx"
import Link from "next/link"

function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  function openMobileMenu() {
    setOpenMenu(!openMenu)
  }
  return (
    <header className="flex  items-center justify-between mt-4 mx-4 md:mx-8 my-4 h-12 text-lg relative z-[9999]">
      <Link href="/" className="cursor-pointer z-10 md:z-0">
        <div className="flex justify-center items-center">
          <Image
            src={"/Logo.png"}
            alt="Tankio Logo"
            width={1000}
            height={1000}
            className="rounded-full h-12 w-12"
            priority
          ></Image>

          <h2 className="font-bold text-2xl">Tankio</h2>
        </div>
      </Link>
      <nav
        className={clsx(
          "w-full bg-background/30 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none absolute top-12 left-0 md:static",
          {
            "hidden md:block": openMenu === false,
          }
        )}
      >
        <ul className="w-full flex flex-col gap-2 items-center justify-end md:flex-row md:gap-16 font-medium text-">
          <li>
            <Link className="cursor-pointer" href="/demo">
              {" "}
              Demo{" "}
            </Link>
          </li>
          <Separator className="w-3/12 md:hidden" />
          <li>
            <Link className="cursor-pointer" href="/blog">
              Blog
            </Link>
          </li>
          <Separator className="w-3/12 md:hidden" />
          <li>
            <Link className="cursor-pointer" href="/login">
              <button className="h-[36px] w-[89px] md:bg-primary md:text-primary-foreground md:rounded-[40px]">
                Login
              </button>
            </Link>
          </li>
          <Separator className="w-3/12 md:hidden" />
          <li>
            <Link className="cursor-pointer" href="/signup">
              SIgn up
            </Link>
          </li>
        </ul>
      </nav>

      {!openMenu ? (
        <IoMenu className="md:hidden " onClick={openMobileMenu} />
      ) : (
        <IoMdClose className="md:hidden" onClick={openMobileMenu} />
      )}
    </header>
  )
}

export default Header
