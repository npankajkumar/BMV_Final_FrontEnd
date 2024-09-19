import LoginComponent from "@/components/Login";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div>
      <div className="border-b-2 flex justify-between h-12 items-center w-full font-bold">
        <Button
          className="text-xl ml-4 text-nowrap text-black"
          variant={"ghost"}
        >
          <Link to={"/"}>Book My Venue</Link>
        </Button>
      </div>
      <div className="flex justify-center pt-3">
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
