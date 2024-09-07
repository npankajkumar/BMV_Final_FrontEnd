import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
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
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
const MemberProfilePage = ({
  firstName,
  lastName,
  email,
  phone,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) => {
  return (
    <div className="h-full p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-left text-gray-800">
        Your Profile :
      </h2>

      <div className="flex justify-between space-x-8 w-[80%]">
        <div className="flex-1 space-y-4">
          <div className="p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-base font-medium text-gray-600 mb-1">
              First Name
            </span>
            <span className="block text-lg text-gray-800">{firstName}</span>
          </div>

          <div className="p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-base font-medium text-gray-600 mb-1">
              Last Name
            </span>
            <span className="block text-lg text-gray-800">{lastName}</span>
          </div>

          <div className="p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-base font-medium text-gray-600 mb-1">
              Email
            </span>
            <span className="block text-lg text-gray-800">{email}</span>
          </div>

          <div className="p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="block text-base font-medium text-gray-600 mb-1">
              Phone
            </span>
            <span className="block text-lg text-gray-800">{phone}</span>
          </div>
        </div>

        <div className="pl-20 flex flex-col  items-start justify-around p-6">
          <Avatar className="h-32 w-32 rounded-full bg-gray-300 flex items-center justify-center shadow-lg">
            <AvatarFallback className="text-xl text-gray-700">
              <Label className="text-4xl font-bold">
                {firstName[0] + lastName[0]}
              </Label>
            </AvatarFallback>
          </Avatar>
          <div className="">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="px-6 py-2 h-12 bg-primary text-white font-semibold rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-200"
                >
                  Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstname" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="firstname"
                      defaultValue={firstName}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastname" className="text-right">
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      defaultValue={lastName}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-center">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue={email}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-center">
                      Mobile
                    </Label>
                    <Input
                      id="phone"
                      defaultValue={phone}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant={"outline"}
                      className="px-6 py-2 h-12 bg-primary text-white font-semibold rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-200"
                    >
                      Save Changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfilePage;
