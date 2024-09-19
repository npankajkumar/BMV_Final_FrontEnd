import { IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptDocument from "./ReceiptDocument";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useState } from "react";

type Booking = {
  id: number;
  createdAt: string;
  status: string;
  customerId: number;
  providerId: number;
  venueId: number;
  amount: number;
  date: string;
  start: string;
  end: string;
  bookedSlots: [];
  customerName: string;
  providerName: string;
  venueName: string;
};

const CustomBookingCard = ({ booking }: { booking: Booking }) => {
  // const handleRatingChange = async (value: string) => {
  //   setPosition(value);
  //   try {
  //     const response = await fetch("http://localhost:5100/api/rating", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ rating: value }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to submit rating");
  //     }
  //     console.log("Rating submitted successfully");
  //   } catch (error) {
  //     console.error("Error submitting rating:", error);
  //   }
  // };
  // const [position, setPosition] = useState("fiveStar");

  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const cardName = booking.venueName;
  const status = booking.status;
  const venueName =
    localStorage.getItem("auth") != "provider"
      ? "Provider : " + booking.providerName
      : "Booked by : " + booking.customerName;
  const amount = booking.amount;
  const formattedDate = formatDate(booking.date);
  const startTime = booking.start;
  const endTime = booking.end;
  return (
    <div className="w-full border grid grid-cols-6  p-4 rounded-lg mb-3">
      <div className="col-span-4">
        <h1 className="text-2xl font-bold">{cardName}</h1>
        <h1 className="text-lg   mb-2">{venueName}</h1>
        <div className="mt-2  font-medium">{formattedDate}</div>
        <div className=" ">
          <span className="font-semibold">Slot Timing : </span>
          <span className="">{startTime} </span>{" "}
          <span className="font-semibold">- </span>{" "}
          <span className="">{endTime} </span>
        </div>
      </div>
      <div className="flex flex-col justify-center ml-auto col-span-2">
        <div className="">
          <span className="mr-4 font-semibold text-gray-800">Booking Id:</span>
          <span className="mr-4 text-black font-semibold">{booking.id}</span>
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
        <div className="flex ">
          {status && (
            <Button className="ml-auto hover:shadow-sm bg-primary font-semibold py-2 px-4 mr-3 ">
              Cancel
            </Button>
          )}

          <PDFDownloadLink
            document={<ReceiptDocument booking={booking} />}
            fileName="Receipt.pdf"
            className="py-2 mr-4 border border-primary hover:text-white hover:bg-primary rounded-md px-4"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Receipt"
            }
          </PDFDownloadLink>

          {/* <Button className="bg-white text-primary border border-primary hover:text-white">
            Download Receipt
          </Button> */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Rate</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-8">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={handleRatingChange}
              >
                <DropdownMenuRadioItem value="oneStar">
                  <Star /> &nbsp; 1
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="twoStar">
                  <Star /> &nbsp; 2
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="threeStar">
                  <Star /> &nbsp; 3
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fourStar">
                  <Star /> &nbsp; 4
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fiveStar">
                  <Star /> &nbsp; 5
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </div>
  );
};

export default CustomBookingCard;
