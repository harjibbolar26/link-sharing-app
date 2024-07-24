"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { PlatformColors } from "./constant";
import { usePathname } from "next/navigation";

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
            <div className="mt-16 flex flex-col gap-5 bg-[]">
              {links && links.length > 0 ? (
                links.map((link) => (
                  <div
                    className={`bg-${
                      link.platform === "Github"
                        ? "[#1A1A1A]"
                        : link.platform === "Twitter"
                        ? "[#43B7E9]"
                        : link.platform === "LinkedIn"
                        ? "[#2D68FF]"
                        : link.platform === "Youtube"
                        ? "[#EE3939]"
                        : link.platform === "Facebook"
                        ? "[#2442AC]"
                        : link.platform === "Twitch"
                        ? "[#EE3FC8]"
                        : link.platform === "Dev.to"
                        ? "[#333333]"
                        : link.platform === "Codewars"
                        ? "[#8A1A50]"
                        : link.platform === "Codepen"
                        ? "[#000000]"
                        : link.platform === "freeCodeCamp"
                        ? "[#302267]"
                        : link.platform === "GitLab"
                        ? "[#EB4925]"
                        : link.platform === "Hashnode"
                        ? "[#0330D1]"
                        : link.platform === "Stack Overflow"
                        ? "[#EC7100]"
                        : "grey-400"
                      // PlatformColors[link.platform] || "gray-400"
                    } w-52 h-8 rounded-md z-10 text-white flex items-center justify-center`}
                    key={link.platform}
                  >
                    {link.platform}
                  </div>
                ))
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
