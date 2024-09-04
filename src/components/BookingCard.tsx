import { IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
const BookingCard = () => {
  const cardName = "Box Cricket";
  const status = "UpComing";
  const venueName = "Eagle Academy";
  const amount = 3000;
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const startTime = "12:30 pm";
  const endTime = "02:30pm";
  return (
    <div className="w-full border-4 border-secondary grid grid-cols-2  p-4 bg-gray-50 rounded-lg shadow-lg">
      <div>
        <h1 className="text-3xl font-bold text-black ">{cardName}</h1>
        <h1 className="text-xl  text-gray-700 mb-2">{venueName}</h1>
        <div className="mt-2 text-gray-900 font-medium">{formattedDate}</div>
        <div className=" text-gray-900 text-lg">
          <span className="font-semibold">Slot: </span>
          <span className="font-semibold">{startTime} </span> <span className="font-semibold">To: </span> <span className="font-semibold">{endTime} </span>
        </div>
      </div>
      <div className="flex flex-col justify-center ml-auto">
        <div className="mb-2">
          <span className="mr-4 font-semibold text-gray-800">Status:</span>
          <span className="mr-4 text-black font-semibold">{status}</span>
        </div>
        <div className="mb-2">
          <span className="mr-4 font-semibold text-gray-800">Paid:</span>
          <IndianRupee className="w-4 h-8 inline"/><span className="mr-4 text-black font-semibold">{amount}</span>
        </div>
        <div className="flex">
          <Button
            variant="outline"
            className="mr-2 hover:shadow-sm text-white bg-primary font-semibold py-2 px-4 "
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="mr-2 hover:shadow-sm text-black bg-blue-500 font-semibold py-2 px-4 "
          >
            Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
