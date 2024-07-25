"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import Image from "next/image";
import { PlatformOptions } from "./constant";
import CustomDropdown from "./CustomDropdown";
import { auth, db } from "@/firebase/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaEquals } from "react-icons/fa6";
import { useUser } from "./UserContext";

interface Link {
  platform: string;
  url: string;
  urlError?: string;
}

const AddLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string>("");
  const [isSaveEnabled, setIsSaveEnabled] = useState<boolean>(false);
  const { updateUserData, userData } = useUser();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        // fetchUserData(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  useEffect(() => {
    const allLinksValid = links.every(
      (link) => link.platform !== "" && validateUrl(link.url)
    );
    setIsSaveEnabled(allLinksValid);
  }, [links]);

  useEffect(() => {
    if (userData) {
      setLinks(userData.links || []);
    }
    // else {
    //   router.push('/login');
    // }
  }, [userData]);

  const router = useRouter();

  const addNewLink = () => {
    console.log("addNewLink called");
    if (!userId) {
      console.log("No user ID, redirecting to login");
      router.push("/login");
      alert("Not logged in. You'll be redirected to login page");
      return;
    }
    const newLinks = [...links, { platform: "", url: "" }];
    console.log("New links:", newLinks);
    setLinks(newLinks);
  };

  const updateLink = (index: number, field: keyof Link, value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);

    if (field === "url") {
      newLinks[index].urlError = validateUrl(value)
        ? ""
        : value === ""
        ? "Can't be empty"
        : "Please check the URL";
    }
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handlePlatformChange = (index: number, value: string) => {
    updateLink(index, "platform", value);
  };

  const validateUrl = (url: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(url);
  };

  const handleSave = async () => {
    if (!userId) {
      alert("No user is signed in.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", auth.currentUser!.uid);
      const docSnap = await getDoc(userDocRef);

      let alertMessage = "Links saved successfully";

      if (docSnap.exists()) {
        const existingLinks: Link[] = docSnap.data().links || [];
        const updatedLinks = links.filter((link) => {
          const existingLink = existingLinks.find(
            (existing: Link) => existing.platform === link.platform
          );
          return existingLink && existingLink.url !== link.url;
        });

        await updateDoc(userDocRef, {
          links: links,
        });

        if (updatedLinks.length > 0) {
          alertMessage = "Links updated successfully";
        }
      } else {
        await setDoc(userDocRef, {
          links: links,
        });
        alert("Links saved successfully");
      }
      alert(alertMessage);
      setLinks([]);
      updateUserData();
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  return (
    <div className="w-full">
      <div className="px-8 pt-8 pb-20 mb-4 bg-white w-full rounded-lg">
        <div className="font-bold text-[32px] text-default mb-2">
          Customize your links
        </div>
        <div className="text-base text-default mb-8">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </div>
        <Button
          bgColor="white"
          hover="bg-secondary"
          radius="lg"
          textColor="primary"
          value="+ Add new link"
          width="full"
          otheClasses="border border-primary p-2 rounded-lg font-[600]"
          handleClick={addNewLink}
        />
        {links.length === 0 ? (
          <div className="p-8 bg-lightGrey mt-10 rounded-xl flex flex-col justify-center items-center">
            <Image
              src="/started.svg"
              alt="get_started"
              width={250}
              height={150}
            />
            <div className="text-center lg:w-[58%] sm:w-[79%] w-[93%]">
              <div className="font-bold text-[32px] max-sm:text-2xl text-default my-3">
                Let&apos;s get you started
              </div>
              <div className="text-[16px] text-default leading-[24px]">
                Use the &quot;Add new link&quot; button to get started. Once you
                have more than one link, you can reorder and edit them.
                We&apos;re here to help you share your profiles with everyone!
              </div>
            </div>
          </div>
        ) : (
          links.map((link, index) => (
            <div
              key={index}
              className="mt-10 p-4 bg-lightGrey rounded-xl overflow-auto hide-scrollbar"
              // style={{ height: "(calc(100vh - 50px))" }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 mb-4">
                  <FaEquals />
                  <h3 className="font-bold text-lg">Link #{index + 1}</h3>
                </div>
                <Button
                  bgColor="transparent"
                  hover="text-secondary"
                  radius=""
                  textColor=""
                  value="Remove"
                  otheClasses="mt-2"
                  handleClick={() => removeLink(index)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-default mb-2">
                  Platform
                </label>
                <CustomDropdown
                  options={PlatformOptions}
                  value={PlatformOptions.find(
                    (option) => option.display === link.platform
                  )}
                  onChange={(value) => handlePlatformChange(index, value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-default mb-2">
                  Link
                </label>
                <div
                  className={`flex items-center justify-between gap-2 border p-2 rounded-[8px] focus-within:border-primary focus-within:shadow-custom-focus ${
                    urlError ? "border-error" : "focus-within:border-primary"
                  }`}
                >
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateLink(index, "url", e.target.value)}
                    className="block w-full p-1 rounded-md focus:outline-none text-default px-2 text-sm bg-transparent"
                    placeholder="e.g. https://www.github.com/johnappleseed"
                  />
                  {link.urlError && (
                    <div className="text-error text-[10px] mt-1">
                      {link.urlError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="fixed bottom-0 pb-4 bg-white lg:w-[60%] w-full">
        <hr style={{ marginTop: 20 }} />
        <div className="flex justify-end mr-10">
          <Button
            bgColor="primary"
            hover="bg-hover"
            radius="lg"
            textColor="white"
            value="Save"
            otheClasses="mt-5 py-1 px-4"
            disabled={!isSaveEnabled || links.length === 0}
            handleClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLinks;
