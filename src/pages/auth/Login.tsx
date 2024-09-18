import LoginComponent from "@/components/Login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const client = localStorage.getItem("auth");
    const token = localStorage.getItem("authToken");
    if (client && token) {
      navigate("/");
    }
    setPageLoading(false);
  }, []);
  if (pageLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex justify-center pt-20">
      <LoginComponent />
    </div>
  );
};

export default Login;
