import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useBmv } from "@/contexts/bmvContext";
import { Moon, Sun, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = ({ className }: { className?: string; clientType: string }) => {
  const navigate = useNavigate();
  const {
    isLoggedin,
    role,
    setIsLoggedin,
    setToken,
    setRole,
    darkMode,
    setDarkMode,
  } = useBmv();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    setIsLoggedin(false);
    setRole("customer");
    setToken("");
    setIsDialogOpen(false);
    toast({ title: "Successfully logged out" });
    navigate("/");
  };

  const NavItems = () => (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDarkMode(!darkMode)}
        className="px-2 dark:text-white text-gray-900 shadow-primary shadow-sm rounded hover:text-primary-foreground hover:bg-primary"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      {isLoggedin && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setRole(role === "customer" ? "provider" : "customer");
            navigate("/");
          }}
          className="dark:text-white text-gray-900 shadow-primary shadow-sm rounded hover:text-primary-foreground hover:bg-primary"
        >
          Switch to {role === "customer" ? "Provider" : "Customer"}
        </Button>
      )}
      {role === "provider" && (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-gray-900 dark:text-white shadow-primary shadow-sm rounded  hover:text-primary-foreground hover:bg-primary"
        >
          <Link to="/venues">Venues</Link>
        </Button>
      )}
      {isLoggedin && (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-gray-900 dark:text-white shadow-primary shadow-sm rounded hover:text-primary-foreground hover:bg-primary"
        >
          <Link to="/bookings">Bookings</Link>
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-900 dark:text-white shadow-primary shadow-sm rounded hover:text-primary-foreground hover:bg-primary "
      >
        {!isLoggedin ? (
          <Link to="https://bookmyvenue.b2clogin.com/bookmyvenue.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignUpSignIn2&client_id=90177501-7d83-4248-9550-1ffc00a439f4&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&scope=openid&response_type=code&prompt=login">
            Login
          </Link>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <span
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                Logout
              </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:shadow-md dark:shadow-primary/5 rounded">
              <DialogHeader>
                <DialogTitle>Are you sure you want to logout?</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <div className="mt-4">
                  <Button
                    variant={"outline"}
                    onClick={() => setIsDialogOpen(false)}
                    className="mr-3"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleLogout}>Logout</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </Button>
      {isLoggedin && (
        <Link to="/profile">
          <div className="rounded-full shadow-primary shadow-sm p-2 hover:bg-primary hover:text-white">
            <User className="h-5 w-5 font-bold" strokeWidth={2} />
          </div>
        </Link>
      )}
    </>
  );

  return (
    <nav
      className={`border-b-2 flex justify-between items-center w-full p-4 ${className}`}
    >
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Book My Venue Logo"
          className="h-8 w-auto hover:cursor-pointer"
          onClick={() => navigate("/")}
        />
        <Button
          variant="ghost"
          className="text-lg font-semibold hover:bg-transparent px-0"
          asChild
        >
          <Link to="/">
            <span
              className="text-xl text-gray-900 dark:text-white rounded font-bold"
              style={{ fontFamily: "Montserrat" }}
            >
              Book My Venue
            </span>
          </Link>
        </Button>
      </div>
      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-primary-foreground hover:bg-primary"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <NavItems />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center space-x-4">
          <NavItems />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
