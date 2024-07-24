import Navbar from "@/components/Navbar";
import React from "react";
import Newwww from "@/components/Newww";

const Preview = () => {
  return (
    <div className="">
      <div className="bg-primary h-64 p-2 rounded-es-3xl rounded-ee-3xl">
        <Navbar />
      </div>
      <div className="flex justify-center items-center mt-[-100px] w-fit mx-auto">
        <Newwww />
      </div>
    </div>
  );
};

export default Preview;
