"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Image from "next/image";

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

  if (!profileData) return <div>Loading...</div>;

  return (
    <div
      className={`bg-white w-full p-2 flex justify-center items-start overflow-hidden rounded-lg`}
      style={{ height: "calc(100vh - 136px)" }}
    >
      <div className="relative w-[300px] h-[600px] top-0">
        <div className="absolute inset-0 flex justify-center items-center p-2">
          <div className="absolute w-full h-full flex flex-col gap-4 justify-start top-20 items-center">
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

            <div className="flex flex-col gap-3 items-center">
              {profileData && profileData.firstName && profileData.lastName ? (
                <div className="z-10">
                  {profileData.firstName} {profileData.lastName}
                </div>
              ) : (
                <div className="border border-border bg-border w-32 h-4 rounded-xl z-10"></div>
              )}
              {profileData && profileData.email ? (
                <div className="z-10">{profileData.email}</div>
              ) : (
                <div className="border border-border bg-border w-20 h-2 rounded-xl z-10"></div>
              )}
            </div>
            <div className="mt-16 flex flex-col gap-5 bg-[]">
              {profileData && profileData.links && profileData.links.length > 0 ? (
                profileData.links.map((link: Link) => (
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

export default Newwww;
