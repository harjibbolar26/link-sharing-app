"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { PlatformColors, PlatformIcons } from "./constant";
import { usePathname } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const UserView = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [links, setLinks] = useState<
    {
      platform: string;
      url: string;
    }[]
  >([]);

  const fetchUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setProfileImage(data.profileImage || null);
      setLinks(data.links);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserData(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);
  const pathname = usePathname();
  return (
    <div
      className={`bg-white w-full h-full p-10 lg:flex justify-center items-start rounded-lg hidden`}
      // style={{ height: "calc(100vh - 136px)" }}
    >
      <div className="relative w-[300px] h-[600px] top-0">
        <Image
          src="/mobile.png"
          alt="mobile"
          layout="fill"
          objectFit="contain"
          className=""
        />
        <div className="absolute inset-0 flex justify-center items-center p-2">
          <Image
            src="/mobile2.png"
            alt="mobile2"
            width={260}
            height={520}
            className=""
          />
          <div className="absolute w-full h-full flex flex-col gap-4 justify-start top-20 items-center">
            {profileImage ? (
              <div className="border border-border bg-border w-24 h-24 rounded-full z-10 relative">
                <Image
                  src={profileImage}
                  alt="profile_image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="border border-border bg-border w-24 h-24 rounded-full z-10"></div>
            )}

            <div className="flex flex-col gap-1 items-center">
              {firstName && lastName ? (
                <div className="z-10 text-[18px] font-[600]">
                  {firstName} {lastName}
                </div>
              ) : (
                <div className="border border-border bg-border w-32 h-4 rounded-xl z-10"></div>
              )}
              {email ? (
                <div className="z-10 text-[14px] font-[400]">{email}</div>
              ) : (
                <div className="border border-border bg-border w-20 h-2 rounded-xl z-10"></div>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-5 z-10 overflow-auto h-52 hide-scrollbar">
              {links && links.length > 0 ? (
                links.map((link) => {
                  const Icon = PlatformIcons[link.platform];
                  return (
                    <div
                      className={`${
                        PlatformColors[link.platform] || "gray-400"
                      } w-52 p-4 rounded-md z-10 ${
                        link.platform === "Frontend Mentor"
                          ? "text-black"
                          : "text-white"
                      } flex items-center justify-between gap-2 text-base`}
                      key={link.platform}
                    >
                      <div className="flex justify-start items-center gap-2">
                        <Icon />
                        {link.platform}
                      </div>
                      <Link
                        className={`${
                          link.platform === "Frontend Mentor"
                            ? "text-black"
                            : "text-white"
                        } cursor-pointer`}
                        href={`${link.url}`} target="blank"
                      >
                        <FaArrowRight />
                      </Link>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="border border-border bg-border w-52 h-8 rounded-md z-10"></div>
                  <div className="border border-border bg-border w-52 h-8 rounded-md z-10"></div>
                  <div className="border border-border bg-border w-52 h-8 rounded-md z-10"></div>
                  <div className="border border-border bg-border w-52 h-8 rounded-md z-10"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
