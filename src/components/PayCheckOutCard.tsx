import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { format } from "date-fns";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useBmv } from "@/contexts/bmvContext";
import LoadingButton from "./LoadingButton";
import { useState } from "react";

interface PayCheckOutCardProps {
  amount: number;
  charges: number;
  taxes: number;
  selectedSlots: any[];
  date: Date;
}

const PayCheckOutCard: React.FC<PayCheckOutCardProps> = ({
  amount,
  charges,
  taxes,
  selectedSlots,
  date,
}) => {
  const total = amount + (amount < 1000 ? 10 : 50);
  const navigate = useNavigate();
  const { token, isLoggedin } = useBmv(); // Retrieve token here
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleCheckoutClick = async () => {
    setLoading(true);
    if (!isLoggedin) {
      toast({
        title: "Login to book slots",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() =>
              (window.location.href = `https://bookmyvenue.b2clogin.com/bookmyvenue.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignUpSignIn2&client_id=90177501-7d83-4248-9550-1ffc00a439f4&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&scope=openid&response_type=code&prompt=login`)
            }
          >
            Login
          </ToastAction>
        ),
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/payment", {
        email: localStorage.getItem("email"),
        price: total,
        success_url: `http://localhost:5173/bookings`,
        cancel_url: `http://localhost:5173/${location.pathname}`,
        date: format(date, "dd-MM-yyyy"), // Correctly format the date
        selectedSlots: selectedSlots.map((s) => s.id), // Send only slot IDs
        token: token, // Send the token
      });

      if (response && response.status === 200) {
        window.location.href = response.data.url;
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error during payment process:", error);
      toast({ title: "Payment process error", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-3 dark:bg-gray-950 dark:text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
          Cart
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <Label className="font-medium text-gray-600 dark:text-white">
            Amount:
          </Label>
          <span className="text-gray-800 dark:text-white">{amount}</span>
        </div>
        <div className="flex justify-between">
          <Label className="font-medium text-gray-600 dark:text-white">
            Platform Charges:
          </Label>
          <span className="text-gray-800 dark:text-white">
            {amount < 1000 ? 10 : 50}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2">
          <Label className="font-semibold text-gray-800 dark:text-white">
            Total:
          </Label>
          <span className="text-gray-900 font-bold dark:text-white">
            {total}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <LoadingButton
          onClick={handleCheckoutClick}
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-rose-700 transition"
          loadingTitle="Checkout & Pay"
          loading={loading}
          disabled={selectedSlots.length < 1}
        >
          Checkout & Pay
        </LoadingButton>
      </CardFooter>
    </Card>
  );
};

export default PayCheckOutCard;
