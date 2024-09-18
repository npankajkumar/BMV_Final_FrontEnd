import { Register as RegisterComponent } from "@/components/Register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <RegisterComponent />
    </div>
  );
};

export default Register;
