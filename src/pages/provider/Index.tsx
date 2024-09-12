import NavBar from "@/components/NavBar";

import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddVenue from "./AddVenue";
import Bookings from "./Bookings";
import Venues from "./Venues";
import Profile from "./Profile";
import Venue from "./Venue";

const Index = () => {
  return (
    <div>
      <NavBar clientType="provider" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route
          path="/venues"
          element={
            <div>
              <Venues />
            </div>
          }
        />
        <Route path="/venues/new" element={<AddVenue />} />
        <Route path="/venues/:id" element={<Venue />} />
        <Route path="*" element={<div>Provider Not Found</div>} />
      </Routes>
    </div>
  );
};

export default Index;
