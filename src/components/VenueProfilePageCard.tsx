import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { DialogClose } from "@/components/ui/dialog";

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

const VenueProfilePageCard = ({
  venueName,
  city,
  imageUrl,
  address,
}: {
  venueName: string;
  city: string;
  imageUrl: string;
  providerName: string;
  address: string;
}) => {
  return (
    <Card className="p-2 pb-3 w-80 h-60 shadow-xl">
      <img
        src={`${imageUrl}`}
        alt="VenueImage"
        className="h-4/6 w-full rounded-md"
      />
      <div className="flex justify-center w-full pt-2 pb-1 px-2">
        <CardTitle className="">{venueName}</CardTitle>
      </div>
      <div className="flex justify-between w-full px-2 py-1">
        <CardContent className="p-0 flex justify-between w-full">
          <Button>Manage slots</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="px-4 py-1 h-10 bg-primary text-white font-semibold rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-200"
              >
                Edit Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Edit Venue Details</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-3">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="venueName" className="text-right">
                    Venue Name
                  </Label>
                  <Input
                    id="venueName"
                    defaultValue={venueName}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="city" className="text-right">
                    city
                  </Label>
                  <Input id="city" defaultValue={city} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="address" className="text-center">
                    Address
                  </Label>
                  <Input
                    id="address"
                    defaultValue={address}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant={"outline"}
                    className="px-4 py-1 h-10 bg-primary text-white font-semibold rounded-lg shadow hover:bg-red-500 hover:text-white transition duration-200"
                  >
                    Save Changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </div>
    </Card>
  );
};

export default VenueProfilePageCard;
