import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useBmv } from "@/contexts/bmvContext";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NavBar = ({
  className,
  clientType,
}: {
  className?: string;
  clientType: string;
}) => {
  const navigate = useNavigate();
  const {
    isLoggedin,
    token,
    role,
    setIsLoggedin,
    setToken,
    setRole,
    darkMode,
    setDarkMode,
  } = useBmv();

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`border-b-2 flex justify-between h-12 items-center w-full font-bold p-7 mb-3 ${className}`}
    >
      <div className="flex items-center ">
        <img
          src="/logo.png"
          alt=""
          className="h-10 w-13 hover:cursor-pointer dark:invert  "
          onClick={() => navigate("/")}
        />
        <Button
          className="text-xl hover:bg-white dark:hover:bg-black font-semibold hover:cursor-pointer  text-nowrap"
          variant={"ghost"}
        >
          <Link to={"/"}>
            {" "}
            <p style={{ fontFamily: "Montserrat" }}>Book My Venue</p>
          </Link>
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        {darkMode ? (
          <Button
            variant={"outline"}
            className="p-2 px-3 hover:shadow-sm border-primary"
            onClick={() => setDarkMode(!darkMode)}
          >
            <Sun className="w-5 h-5 " />
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="p-2 px-3  hover:shadow-sm border-primary"
            onClick={() => setDarkMode(!darkMode)}
          >
            <Moon className="w-5 h-5 " />
          </Button>
        )}
        {isLoggedin && (
          <Button
            onClick={() => {
              if (role == "customer") {
                setRole("provider");
              } else {
                setRole("customer");
              }
              navigate("/");
            }}
          >
            {"Switch to " + (role == "customer" ? "Provider" : "Customer")}
          </Button>
        )}
        {role == "provider" && (
          <Button variant="outline" className="hover:shadow-sm border-primary ">
            <Link to={"/venues"}>Venues</Link>
          </Button>
        )}
        {isLoggedin && (
          <Button variant="outline" className="hover:shadow-sm border-primary ">
            <Link to={"/bookings"}>Bookings</Link>
          </Button>
        )}

        <Button variant="outline" className=" hover:shadow-sm border-primary">
          {!isLoggedin ? (
            <Link
              to={`https://bookmyvenue.b2clogin.com/bookmyvenue.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignUpSignIn2&client_id=90177501-7d83-4248-9550-1ffc00a439f4&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&scope=openid&response_type=code&prompt=login`}
            >
              Login
            </Link>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <button>Logout</button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px] dark:shadow-md dark:shadow-gray-500">
                <DialogHeader>
                  <DialogTitle>Are you sure you want to logout ?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">
                    <Link
                      to={"/"}
                      onClick={() => {
                        localStorage.clear();
                        localStorage.setItem(
                          "darkMode",
                          JSON.stringify(darkMode)
                        );
                        setIsLoggedin(false);
                        setRole("customer");
                        setToken("");
                        toast({ title: "Successfully logged out" });
                      }}
                    >
                      Logout
                    </Link>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </Button>
        {/* <Button variant="outline" className="mr-10 rounded-full hover:bg-slate-300">P</Button> */}
        {isLoggedin && (
          <Link to={"/profile"}>
            <Avatar className="mr-4 hover:cursor-pointer">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="user/provider profile "
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
