"use client";
import React, { useState } from "react";
import { Navbar } from "flowbite-react";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import useSWR from "swr";

// @ts-expect-error
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const navbar = () => {
  let pathname = usePathname() || "/";
  if (pathname.includes("/projects/")) {
    pathname = "/projects";
  }

  let jwt: any = "";
  let username: any = "";

  if (typeof window !== "undefined") {
    jwt = localStorage.getItem("jwt");
    username = localStorage.getItem("username");
  }

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/authenticate/validate?token=${jwt}`,
    fetcher
  );

  const navItems = {
    "/": {
      name: "home",
    },
    // [`/${username}`]: {
    //   name: username ? "Profile" : "Profile",
    // },
    [`/profile/${username}`]: {
      name: username ? "My Profile" : "My Profile",
    },

    "/login": {
      name: data ? "logout" : "login",
    },
  };

  console.log(pathname);

  function handleLogout(e: any): void {
    const logoutString = e.target.innerText;
    if (logoutString === "logout") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
    }
  }

  return (
    <div className="flex flex-row md:flex-row space-x-0 pr-10 mb-2 mt-2 md:mt-0">
      {Object.entries(navItems).map(([path, { name }]) => {
        const isActive = path === pathname;

        return (
          <Link
            onClick={(e) => handleLogout(e)}
            key={path}
            href={path}
            className={clsx(
              "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle",
              {
                "text-neutral-500": !isActive,
                "font-bold": isActive,
              }
            )}
          >
            <span className="relative py-[5px] px-[10px] text-gray-500">
              {name}
              {path === pathname ? (
                <motion.div
                  className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1]"
                  layoutId="sidebar"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              ) : null}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default navbar;
