import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
const NavBar = ({
  className,
  clientType,
}: {
  className?: string;
  clientType: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`border-b-2 flex justify-between h-12 items-center w-full font-bold ${className}`}
    >
      <Button className="text-xl ml-4 text-nowrap" variant={"ghost"}>
        <Link to={"/"}>Book My Venue</Link>
      </Button>
      <div className="flex">
        {clientType == "provider" && (
          <Button variant="link" className="mr-10 text-primary">
            <Link to={"/venues"}>Venues</Link>
          </Button>
        )}
        {(clientType == "provider" || clientType == "user") && (
          <Button variant="link" className="mr-10 text-primary">
            <Link to={"/bookings"}>Bookings</Link>
          </Button>
        )}

        <Button
          variant="outline"
          className="mr-10 hover:shadow-sm border-primary"
        >
          {clientType != "provider" && clientType != "user" ? (
            <Link to={"/login"}>Login</Link>
          ) : (
            <Link
              to={"/login"}
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </Link>
          )}
        </Button>
        {/* <Button variant="outline" className="mr-10 rounded-full hover:bg-slate-300">P</Button> */}
        <Link to={"/profile"}>
          <Avatar className="mr-4 hover:cursor-pointer">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="user/provider profile "
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
