import { useState } from "react";

import MemberProfilePage from "./MemberProfilePage";

const MemberProfile = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Profile");

  const renderContent = () => {
    switch (activeMenuItem) {
      case "Profile":
        return (
          <div>
            <MemberProfilePage
              firstName="Niketh"
              lastName="Donthula"
              email="nikethdonthula@gmail.com "
              phone="8247373288"
            />
          </div>
        );
      case "Bookings":
        return (
          <div>
            <h2 className="text-2xl font-bold">Bookings</h2>
            <p>Here are your bookings.</p>
          </div>
        );
      case "My Properties":
        return (
          <div>
            <h2 className="text-2xl font-bold">My Properties</h2>
            <p>Here are your properties.</p>
          </div>
        );
      case "Others":
        return (
          <div>
            <h2 className="text-2xl font-bold">Others</h2>
            <p>Other information will appear here.</p>
          </div>
        );
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
    <div className="flex w-[95%] h-[95%] mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
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
              activeMenuItem === "Bookings"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"
            }`}
            onClick={() => setActiveMenuItem("Bookings")}
          >
            Bookings
          </li>
          <li
            className={`px-4 py-3 rounded-lg text-center text-lg font-bold cursor-pointer transition-colors duration-200 ${
              activeMenuItem === "My Properties"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"
            }`}
            onClick={() => setActiveMenuItem("My Properties")}
          >
            My Properties
          </li>
          <li
            className={`px-4 py-3 rounded-lg text-center text-lg font-bold cursor-pointer transition-colors duration-200 ${
              activeMenuItem === "Others"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-400 hover:text-white"
            }`}
            onClick={() => setActiveMenuItem("Others")}
          >
            Others
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-6">{renderContent()}</div>
    </div>
  );
};

export default MemberProfile;
