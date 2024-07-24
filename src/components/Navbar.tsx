"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEye, FaLink, FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const userProfileLink = () => {
    if (user) {
      return `/user/${user.uid}`;
    } else {
      return "/login";
    }
  };

  const profileLink = () => {
    if (user) {
      return `/profile`;
    } else {
      return "/login";
    }
  };

  const isProfilePage = pathname.startsWith("/user");

  return (
    <div className="bg-white p-4 flex justify-between items-center h-20 rounded-lg">
      {isProfilePage ? (
        <Link
          href={profileLink()}
          className="text-primary border border-primary hover:bg-secondary flex items-center gap-2 bg-white py-2 px-5 rounded-xl"
        >
          <p className="text-base">Back to Editor</p>
        </Link>
      ) : (
        <div className="flex gap-2 items-center">
          <Image src="/logo.png" alt="logo" height={33} width={33} />
          <div className="text-default font-bold text-2xl">devlinks</div>
        </div>
      )}
      <div className={`${isProfilePage ? "hidden" : "flex"} gap-4 items-center`}>
        <Link
          href="/"
          className={`text-default hover:text-primary flex items-center gap-2 ${
            pathname === "/"
              ? "bg-secondary py-[11px] px-[27px] rounded-lg text-primary"
              : "bg-transparent"
          }`}
        >
          <FaLink />
          <p className="text-base max-sm:hidden block">Links</p>
        </Link>
        <Link
          href="/profile"
          className={`text-default hover:text-primary flex items-center gap-2 ${
            pathname === "/profile"
              ? "bg-secondary py-[11px] px-[27px] rounded-lg text-primary"
              : "bg-transparent"
          }`}
        >
          <FaRegUserCircle size={20} />
          <p className="text-base max-sm:hidden block">Profile Details</p>
        </Link>
      </div>
      {isProfilePage ? (
        <div className="flex items-center gap-2 bg-primary py-[11px] px-[27px] rounded-lg text-white cursor-pointer">
          <p className="block">Share link</p>
        </div>
      ) : (
        <Link
          href={userProfileLink()}
          className="text-primary border border-primary hover:bg-secondary flex items-center gap-2 bg-white py-2 px-5 rounded-xl"
        >
          <div className="block sm:hidden">
            <FaEye size={20} />
          </div>
          <p className="text-base max-sm:hidden block">Profile Preview</p>
        </Link>
      )}
    </div>
  );
};

export default Navbar;