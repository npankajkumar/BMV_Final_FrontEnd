import { useState } from "react";

import MemberProfilePage from "./MemberProfilePage";
import { Separator } from "./ui/separator";
// import VenueProfilePage from "./VenueProfilePage";

const MemberProfile = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Profile");

  const renderContent = () => {
    switch (activeMenuItem) {
      case "Profile":
        return (
          <div>
            <MemberProfilePage
              name="Donthula"
              email="nikethdonthula@gmail.com "
              phone="8247373288"
            />
          </div>
        );
     
      case "My Venues":
        return <div>{/* <VenueProfilePage /> */}</div>;
      
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold">Welcome</h2>
            <p>Select an item from the menu.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex w-[95%] h-[95%] mx-auto mt-10 bg-white  rounded-lg overflow-hidden">
      <div className="w-1/4 bg-gray-50 p-4">
        <ul className="space-y-4">
          <li
            className={`px-4 py-3 rounded-lg text-center text-lg font-bold cursor-pointer transition-colors duration-200 ${
              activeMenuItem === "Profile"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"
            }`}
            onClick={() => setActiveMenuItem("Profile")}
          >
            Profile
          </li>
          
          <li
            className={`px-4 py-3 rounded-lg text-center text-lg font-bold cursor-pointer transition-colors duration-200 ${
              activeMenuItem === "My Venues"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"
            }`}
            onClick={() => setActiveMenuItem("My Venues")}
          >
            My Venues
          </li>
        </ul>
      </div>
      <Separator orientation="vertical" className="h-72"/>
      <div className="w-3/4 p-6">{renderContent()}</div>
    </div>
  );
};

export default MemberProfile;
