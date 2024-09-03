import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
const NavBar = ({className}:{className?:string}) => {
  return (
    <div className={`border-2 flex justify-between h-16 items-center font-bold ${className}`} >
        <h1 className="text-3xl ml-4">Book My Venue</h1>
        <div className="flex">
        <Button variant="outline" className="mr-10 hover:shadow-sm">Bookings</Button>
        <Button variant="outline" className="mr-10 hover:shadow-sm">Logout</Button>
        {/* <Button variant="outline" className="mr-10 rounded-full hover:bg-slate-300">P</Button> */}
        <Avatar className="mr-4 hover:cursor-pointer">
      <AvatarImage src="https://github.com/shadcn.png" alt="user/provider profile " />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        </div>
    </div>
  )
}

export default NavBar