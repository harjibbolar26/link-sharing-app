import Navbar from "@/components/Navbar";
import RightDetails from "@/components/RightDetails";
import UserView from "@/components/UserView";

export default function Home() {
  return (
    <div className="bg-lightGrey w-full h-[100vh]">
      <div className="p-4">
        <Navbar />
      </div>
      <div className="lg:flex items-start justify-center gap-4">
        <div className="w-[40%] flex justify-center items-center ps-4">
          <UserView/>
        </div>
        <div className="lg:w-[60%] pr-4 max-lg:px-4">
          <RightDetails />
        </div>
      </div>
    </div>
  );
}
 