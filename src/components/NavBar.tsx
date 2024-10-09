import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useBmv } from "@/contexts/bmvContext";
const NavBar = ({
  className,
  clientType,
}: {
  className?: string;
  clientType: string;
}) => {
  const navigate = useNavigate();
  const { isLoggedin, token, role, setIsLoggedin, setToken, setRole } =
    useBmv();

  return (
    <div
      className={`border-b-2 flex justify-between h-12 items-center w-full font-bold p-7 mb-3 ${className}`}
    >
      <div className="flex items-center">
      <img src="/logo.png" alt="" className="h-10 w-13 hover:cursor-pointer" onClick={()=>navigate('/')}/>
      <Button className="text-xl hover:bg-white  text-nowrap" variant={"ghost"}>
        <Link to={"/"}>Book My Venue</Link>
      </Button>
      </div>
      <div className="flex gap-4">
        {isLoggedin && (
          <Button
            onClick={() => {
              if (role == "customer") {
                setRole("provider");
              } else {
                setRole("customer");
              }
              navigate('/');
            }}
          >
            {"Switch to " + (role == "customer" ? "Provider" : "Customer")}
          </Button>
        )}
        {role == "provider" && (
          <Button variant="link" className="mr-10 text-primary">
            <Link to={"/venues"}>Venues</Link>
          </Button>
        )}
        {isLoggedin && (
          <Button variant="link" className="mr-10 text-primary">
            <Link to={"/bookings"}>Bookings</Link>
          </Button>
        )}

        <Button
          variant="outline"
          className="mr-10 hover:shadow-sm border-primary"
        >
          {!isLoggedin ? (
            <Link
              to={`https://bookmyvenue.b2clogin.com/bookmyvenue.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignUpSignIn2&client_id=90177501-7d83-4248-9550-1ffc00a439f4&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&scope=openid&response_type=code&prompt=login`}
            >
              Login
            </Link>
          ) : (
            <Link
              to={"/"}
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </Link>
          )}
        </Button>
        {/* <Button variant="outline" className="mr-10 rounded-full hover:bg-slate-300">P</Button> */}
       {isLoggedin &&
        <Link to={"/profile"}>
          <Avatar className="mr-4 hover:cursor-pointer">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="user/provider profile "
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>}
      </div>
    </div>
  );
};

export default NavBar;
