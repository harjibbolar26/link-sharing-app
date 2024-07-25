"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Image from "next/image";
import Input from "./Input";
import { auth, db, storage } from "@/firebase/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaLink, FaSave } from "react-icons/fa";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

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
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setEmail(userData.email || "");
      setProfileImage(userData.profileImage || null);
    }
  }, [userData]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setProfileImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `profile_images/${userId}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateFirstName = (name: string) => {
    if (name.length < 3) {
      setFirstNameError("at least 3 letters");
      return false;
    } else if (name.trim() === "") {
      setFirstNameError("cannot be empty");
      return false;
    } else {
      setFirstNameError("");
      return true;
    }
  };

  const validateLastName = (name: string) => {
    if (name.length < 3) {
      setLastNameError("at least 3 letters");
      return false;
    } else if (name.trim() === "") {
      setLastNameError("cannot be empty");
      return false;
    } else {
      setLastNameError("");
      return true;
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else if (email.trim() === "") {
      setEmailError("cannot be empty");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleSave = async () => {
    if (!userId) {
      alert("No user is signed in.");
      return;
    }

    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isEmailValid = validateEmail(email);

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid) {
      return;
    }

    try {
      let profileImageUrl = profileImage;
      if (profileImageFile) {
        profileImageUrl = await uploadImageToStorage(profileImageFile);
      }

      const userDocRef = doc(db, "users", auth.currentUser!.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        await updateDoc(userDocRef, {
          firstName,
          lastName,
          email,
          profileImage: profileImageUrl,
        });
      } else {
        await setDoc(userDocRef, {
          firstName,
          lastName,
          email,
          profileImage: profileImageUrl,
        });
      }
      updateUserData();
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  return (
    <div className="w-full">
      <div className="px-8 pt-8 pb-4 bg-white w-full rounded-lg relative">
        <div className="font-bold text-[32px] text-default mb-2">
          Profile Details
        </div>
        <div className="text-base text-default mb-8">
          Add your details to create a personal touch to your profile.
        </div>
        <div className="p-10 bg-lightGrey mt-10 rounded-xl flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
          <p className="text-base lg:w-[40%] md:w-[30%]">Profile picture</p>
          <div className="flex items-center gap-4 lg:w-[60%] md:w-[60%] max-sm:flex-col max-sm:items-start max-sm:gap-6">
            <div
              className="w-48 h-48 bg-secondary rounded-lg overflow-hidden cursor-pointer relative"
              onClick={triggerFileInput}
            >
              {profileImage ? (
                <div className="">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                    className="blur-[1px]"
                  />
                  <div className="flex flex-col justify-center items-center h-48 gap-2 z-10 absolute top-3 left-8">
                    <Image
                      src="/imgHolder2.svg"
                      alt="img_holder"
                      width={40}
                      height={40}
                    />
                    <p className="text-white font-[600]">
                      {profileImage ? "+ Change Image" : "+ Upload Image"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-48 gap-2">
                  <Image
                    src="/imgHolder.svg"
                    alt="img_holder"
                    width={40}
                    height={40}
                  />
                  <p className="text-primary font-[600]">
                    {profileImage ? "+ Change Image" : "+ Upload Image"}
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <p className="text-xs sm:w-1/2">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>

        <div className="p-10 bg-lightGrey mt-10 rounded-xl">
          <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
            <div className="sm:w-1/3">First name*</div>
            <div
              className={`sm:w-2/3 flex items-center justify-between gap-2 border p-2 rounded-[8px] focus-within:border-primary focus-within:shadow-custom-focus ${
                firstNameError ? "border-error" : "focus-within:border-primary"
              }`}
            >
              <input
                type="text"
                required
                placeholder="e.g John"
                className="w-full focus:outline-none text-default px-2 text-sm bg-transparent"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="text-error text-[10px] w-28 hidden lg:block">
                {firstNameError}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
            <div className="sm:w-1/3">Last name*</div>
            <div
              className={`sm:w-2/3 flex items-center justify-between gap-2 border p-2 rounded-[8px] focus-within:border-primary focus-within:shadow-custom-focus ${
                lastNameError ? "border-error" : "focus-within:border-primary"
              }`}
            >
              <input
                type="text"
                required
                placeholder="e.g Doe"
                className="w-full focus:outline-none text-default px-2 text-sm bg-transparent"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="text-error text-[10px] w-28 hidden lg:block">
                {lastNameError}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
            <div className="sm:w-1/3">Email</div>
            <div
              className={`sm:w-2/3 flex items-center justify-between gap-2 border p-2 rounded-[8px] focus-within:border-primary focus-within:shadow-custom-focus ${
                emailError ? "border-error" : "focus-within:border-primary"
              }`}
            >
              <input
                type="text"
                required
                placeholder="e.g Doe"
                className="w-full focus:outline-none text-default px-2 text-sm bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-error text-[10px] w-28 hidden lg:block">
                {emailError}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 pb-4 bg-white lg:w-[60%] w-full">
        <hr style={{ marginTop: 20 }} />
        <div className="flex justify-end mr-16">
          <Button
            bgColor="primary"
            hover="bg-hover"
            radius="lg"
            textColor="white"
            value="Save"
            otheClasses="mt-5 py-1 px-4"
            handleClick={handleSave}
          />
        </div>
      </div>
      </div>
      {showNotification && (
        <div className="fixed bottom-4 bg-default text-white text-center py-2 px-4 w-fit rounded-xl flex items-center justify-center mx-auto left-1/2 transform -translate-x-1/2">
          <div className="flex justify-start items-center gap-2 text-base">
            <FaSave className="text-grey" />
            Your changes have been successfully saved!
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
