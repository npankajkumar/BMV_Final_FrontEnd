import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ClockIcon,
  IndianRupee,
  User,
  Download,
  Hash,
} from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptDocument from "./ReceiptDocument";

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

interface CustomBookingCardProps {
  booking: Booking;
}

const CustomBookingCard: React.FC<CustomBookingCardProps> = ({ booking }) => {
  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const isProvider = localStorage.getItem("auth") === "provider";
  const formattedDate = formatDate(booking.date);
  const formattedStartTime = formatTime(booking.start);
  const formattedEndTime = formatTime(booking.end);

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:scale-[1.02] mb-4">
      <CardHeader className="pb-2 bg-[#e11c48] dark:bg-primary">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-white dark:text-primary-foreground">
            {booking.venueName}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-medium">
              {isProvider ? booking.customerName : booking.providerName}
            </span>
          </div>
          <div className="flex items-center">
            <Hash className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-medium">
              Booking ID: {booking.id}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-medium">
              {formattedStartTime} - {formattedEndTime}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
        <div className="flex items-center">
          <IndianRupee className="w-5 h-5 mr-2 text-primary" />
          <span className="font-semibold text-lg">{booking.amount}</span>
        </div>
        <PDFDownloadLink
          document={<ReceiptDocument booking={booking} />}
          fileName="Receipt.pdf"
        >
          {({ loading }) => (
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              className="hover:bg-primary hover:text-primary-foreground p-5 rounded-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              {loading ? "Loading..." : "Receipt"}
            </Button>
          )}
        </PDFDownloadLink>
      </CardFooter>
    </Card>
  );
};

export default CustomBookingCard;
