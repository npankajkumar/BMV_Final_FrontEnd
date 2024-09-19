import { Register as RegisterComponent } from "@/components/Register";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
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
      <div className="border-b-2 flex justify-between h-12 items-center w-full font-bold ">
        <Button
          className="text-xl ml-4 text-nowrap text-black"
          variant={"ghost"}
        >
          <Link to={"/"}>Book My Venue</Link>
        </Button>
      </div>
      <div>
        <RegisterComponent />
      </div>
    </div>
  );
};

export default Register;
