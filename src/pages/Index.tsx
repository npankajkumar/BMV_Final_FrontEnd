import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIndex from "../pages/user/Index";
import ProviderIndex from "../pages/provider/Index";
import { BmvContextProvider, useBmv } from "@/contexts/bmvContext";

const Index = () => {
  const [rootLoading, setRootLoading] = useState<boolean>(true);

  const authToken = localStorage.getItem("id_token");
  const loggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("role");

  const navigate = useNavigate();

  const { isLoggedin, token, role, setIsLoggedin, setToken, setRole } =
    useBmv();

  console.log({ isLoggedin, token, role, setIsLoggedin, setToken, setRole });

  useEffect(() => {
    if (authToken) {
      setToken(authToken);
    }
    if (loggedIn) {
      setIsLoggedin(loggedIn == "true" ? true : false);
    }
    if (userRole) {
      setRole(userRole);
    }
    setRootLoading(false);
  }, []);

  if (rootLoading) return <div>Loading</div>;
  if (role == "provider") return <ProviderIndex />;
  return <UserIndex />;
};

export default Index;
