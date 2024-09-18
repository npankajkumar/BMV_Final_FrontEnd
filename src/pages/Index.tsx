import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIndex from "../pages/user/Index";
import ProviderIndex from "../pages/provider/Index";

const Index = () => {
  const [rootLoading, setRootLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  // useEffect(() => {
  //   if (!token || (token != "user" && token != "provider")) {
  //     navigate("/login");
  //   }
  //   setRootLoading(false);
  // });
  if (rootLoading) return <div>Loading</div>;
  if (token == "provider") return <ProviderIndex />;
  return <UserIndex />;
};

export default Index;
