import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBmv } from "@/contexts/bmvContext";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AuthController: React.FC = () => {
  const { setIsLoggedin, setToken, setRole } = useBmv();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the 'code' from the URL search params
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Call your backend to exchange the code for a token
      axios
        .get(`http://localhost:5059/api/Auth/${code}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.id_token) {
            // Set the token and role in the context
            setToken(data.id_token);
            setRole("customer");
            setIsLoggedin(true);

            localStorage.setItem("id_token", data.id_token);
            localStorage.setItem("role", "customer");
            localStorage.setItem("isLoggedIn", "true");

            // Redirect to the home page
            navigate("/");
          } else {
            // Handle any error (e.g., missing token)
            console.error("Failed to retrieve token or role from response");
          }
        })
        .catch((error) => {
          console.error("Error during token exchange:", error);
        });
    }
    else{
      setToken("");
            setRole("customer");
            setIsLoggedin(false);

            localStorage.setItem("id_token", "");
            localStorage.setItem("role", "customer");
            localStorage.setItem("isLoggedIn", "false");

            toast({title:"Unable to login"})
            // Redirect to the home page
            navigate("/");
    }
  }, [navigate, setIsLoggedin, setToken, setRole]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <div className="flex gap-4">
          Redirecting
          <LoaderCircle className="animate-spin text-primary h-8 w-8 text center" />
        </div>
      </div>
    </div>
  ); // Can add a loader or message here
};

export default AuthController;
