import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Bookings from "./Bookings";
import Venue from "./Venue";
import Home from "./Home";
import NavBar from "@/components/NavBar";
import NotFound from "@/components/NotFound";

const Index = () => {
  return (
    <div>
      <NavBar clientType="" />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route
          path="/venues/:id"
          element={
            <div>
              <Venue />
            </div>
          }
        />
        <Route path="*" element={<NotFound message="Page" />} />
      </Routes>
    </div>
  );
};

export default Index;
