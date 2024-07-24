"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Image from "next/image";
import { PlatformColors, PlatformIcons } from "./constant";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface Link {
  platform: string;
  url: string;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
  links?: Link[];
}

const Newwww: React.FC = () => {
  const params = useParams();
  const userId = params.userId as string;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchProfileData = async () => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data() as ProfileData);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching profile data: ", error);
        }
      };
      fetchProfileData();
    }
  }, [userId]);

  return (
    <div
      className={`bg-white w-full p-2 flex justify-center items-start overflow-hidden rounded-lg`}
      style={{ height: "calc(100vh - 170px)" }}
    >
      <div className="relative w-[300px] h-[500px] top-0">
        <div className="absolute inset-0 flex justify-center items-center p-2">
          <div className="absolute w-full h-full flex flex-col gap-4 justify-start top-8 items-center">
            {profileData && profileData.profileImage ? (
              <div className="border border-border bg-border w-24 h-24 rounded-full z-10 relative">
                <Image
                  src={profileData.profileImage}
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
              {profileData && profileData.firstName && profileData.lastName ? (
                <div className="z-10 text-[18px] font-[600]">
                  {profileData.firstName} {profileData.lastName}
                </div>
              ) : (
                <div className="border border-border bg-border w-32 h-4 rounded-xl z-10"></div>
              )}
              {profileData && profileData.email ? (
                <div className="z-10 text-[14px] font-[400]">{profileData.email}</div>
              ) : (
                <div className="border border-border bg-border w-20 h-2 rounded-xl z-10"></div>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-5 z-10 overflow-auto h-52 hide-scrollbar">
              {profileData &&
              profileData.links &&
              profileData.links.length > 0 ? (
                profileData.links.map((link: Link) => {
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
                        href={`${link.url}`}
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

export default Newwww;
