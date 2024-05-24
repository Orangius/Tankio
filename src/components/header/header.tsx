"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { clsx } from "clsx";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();
  const menuRef = useRef() as React.RefObject<HTMLElement>; //React.LegacyRef<HTMLElement> //React.MutableRefObject<HTMLInputElement>;

  function openMobileMenu() {
    setOpenMenu(!openMenu);
  }

  useEffect(() => {
    const handleMenuAutoClose = (e: any) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleMenuAutoClose);
    return () => {
      document.removeEventListener("mousedown", handleMenuAutoClose);
    };
  });
  return (
    <>
      <header
        ref={menuRef}
        className="flex  items-center justify-between mt-4 mx-4 md:mx-8 my-4 h-12 text-lg relative z-[9999]"
      >
        <Link href="/" className="cursor-pointer z-10 md:z-0">
          <div className="flex justify-center gap-2 items-center">
            <Image
              src={"/Logo.png"}
              alt="Tankio Logo"
              width={1000}
              height={1000}
              className="rounded-full border border-primary h-12 w-12"
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
              <Link
                className="cursor-pointer"
                href="/demo"
                onClick={openMobileMenu}
              >
                {" "}
                Demo{" "}
              </Link>
            </li>
            <Separator className="w-3/12 md:hidden" />
            <li>
              <Link
                className="cursor-pointer"
                href="/dashboard"
                onClick={openMobileMenu}
              >
                {" "}
                Dashboard{" "}
              </Link>
            </li>
            <Separator className="w-3/12 md:hidden" />
            {/* <li>
              <Link
                className="cursor-pointer"
                href="/blog"
                onClick={openMobileMenu}
              >
                Blog
              </Link>
            </li> */}
            <Separator className="w-3/12 md:hidden" />
            <li>
              {status === "authenticated" ? (
                <Link
                  className="cursor-pointer"
                  href="/api/auth/signout?callbackUrl=/"
                  onClick={openMobileMenu}
                >
                  <button className="h-[36px] w-[89px] md:bg-primary md:text-primary-foreground md:rounded-[40px]">
                    Log out
                  </button>
                </Link>
              ) : (
                <Link
                  className="cursor-pointer"
                  href="/login"
                  onClick={openMobileMenu}
                >
                  <button className="h-[36px] w-[89px] md:bg-primary md:text-primary-foreground md:rounded-[40px]">
                    Login
                  </button>
                </Link>
              )}
            </li>
            <Separator className="w-3/12 md:hidden" />
            {status !== "authenticated" ? (
              <li>
                <Link
                  className="cursor-pointer"
                  href="/signup"
                  onClick={openMobileMenu}
                >
                  Sign up
                </Link>
              </li>
            ) : null}
            {session ? (
              <li className="hidden font-bold text-2xl md:flex md:justify-center md:items-center  bg-primary text-primary-foreground rounded-full w-10 h-10">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </li>
            ) : null}
          </ul>
        </nav>

        {!openMenu ? (
          <IoMenu className="md:hidden " onClick={openMobileMenu} />
        ) : (
          <IoMdClose className="md:hidden" onClick={openMobileMenu} />
        )}
      </header>
      <Separator className="w-full hidden  md:inline-block mb-4" />
    </>
  );
}

export default Header;
