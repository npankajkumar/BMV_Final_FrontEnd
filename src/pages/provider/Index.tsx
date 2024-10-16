import NavBar from "@/components/NavBar";

import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddVenue from "./AddVenue";
import Bookings from "./Bookings";
import Venues from "./Venues";
import Profile from "./Profile";
import Venue from "./Venue";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useBmv } from "@/contexts/bmvContext";
import NotFound from "@/components/NotFound";

const Index = () => {
  const [provider, setProvider] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const updateProvider = () => {
    axios
      .get("http://localhost:5059/api/Providers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProvider(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast({ title: "Error occured" });
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const { isLoggedin, token, role, setIsLoggedin, setToken, setRole } =
    useBmv();

  useEffect(() => {
    axios
      .get("http://localhost:5059/api/Providers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProvider(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast({ title: "Error occured" });
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    provider && (
      <div>
        <NavBar clientType="provider" />
        <Routes>
          <Route path="/" element={<Home provider={provider} />} />
          <Route
            path="/profile"
            element={
              <Profile provider={provider} updateProvider={updateProvider} />
            }
          />
          <Route path="/bookings" element={<Bookings provider={provider} />} />
          <Route
            path="/venues"
            element={
              <div>
                <Venues provider={provider} />
              </div>
            }
          />
          <Route
            path="/venues/new"
            element={
              <AddVenue provider={provider} updateProvider={updateProvider} />
            }
          />
          <Route
            path="/venues/:id"
            element={
              <Venue provider={provider} updateProvider={updateProvider} />
            }
          />
          <Route path="*" element={<NotFound message="Provider" />} />
        </Routes>
      </div>
    )
  );
};

export default Index;
