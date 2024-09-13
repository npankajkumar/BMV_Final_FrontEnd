import { IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
import { format } from "date-fns";

type Slot = {
  id: number;
  startTime: Date;
  endTime: Date;
};

type Booking = {
  id: number;
  venue: string;
  provider: string;
  slotDate: Date;
  status: string;
  slots: Slot[];
};
const BookingCard = () => {
  const cardName = "Box Cricket";
  const status = "UpComing";
  const venueName = "Eagle Academy";
  const amount = 3000;
  const today = new Date();
  const formattedDate = format(today, "dd/MM/yyyy");
  const startTime = "12:30 pm";
  const endTime = "02:30pm";
  return (
    <div className="w-full border grid grid-cols-6  p-4 rounded-lg">
      <div className="col-span-4">
        <h1 className="text-2xl font-bold">{cardName}</h1>
        <h1 className="text-lg   mb-2">{venueName}</h1>
        <div className="mt-2  font-medium">{formattedDate}</div>
        <div className=" ">
          <span className="font-semibold">Slots: </span>
          <span className="">{startTime} </span>{" "}
          <span className="font-semibold">- </span>{" "}
          <span className="">{endTime} </span>
        </div>
      </div>
      <div className="flex flex-col justify-center ml-auto col-span-2">
        <div className="">
          <span className="mr-4 font-semibold text-gray-800">Booking Id:</span>
          <span className="mr-4 text-black font-semibold">
            {"B9934hib7bkkgj"}
          </span>
        </div>
        <div className="">
          <span className="mr-4 font-semibold text-gray-800">Status:</span>
          <span className="mr-4 text-black font-semibold">{status}</span>
        </div>
        <div className="">
          <span className="mr-4 font-semibold text-gray-800">Paid:</span>
          <IndianRupee className="w-4 h-8 inline" />
          <span className="mr-4 text-black font-semibold">{amount}</span>
        </div>
        <div className="flex">
          {status && (
            <Button className="ml-auto hover:shadow-sm bg-primary font-semibold py-2 px-4 ">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
