import Navbar from "@/components/Navbar";
import ProfilePage from "@/components/ProfilePage";
import React from "react";
import UserView from "@/components/UserView";

const page = () => {
  return (
    <div className="bg-lightGrey w-full">
      <div className="p-4">
        <Navbar />
      </div>
      <div className="lg:flex items-start justify-center gap-4">
        <div className="w-[40%] flex justify-center items-center ps-4 h-full sticky top-4">
          <UserView/>
        </div>
        <div className="lg:w-[60%] pr-4 max-lg:px-4">
          <ProfilePage />
        </div>
      </div>
    </div>
  );
};

export default page;
