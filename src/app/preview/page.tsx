import Domain from "@/components/ProfileLink";
import Navbar from "@/components/Navbar";
import React from "react";
import ProfileLink from "@/components/ProfileLink";

const Preview = () => {
  return (
    <div className="">
      <div className="bg-primary h-64 p-2 rounded-es-3xl rounded-ee-3xl">
        <Navbar />
      </div>
      <div className="absolute top-44 left-[40%]">
        <ProfileLink />
      </div>
      {/* <Domain/> */}
    </div>
  );
};

export default Preview;
