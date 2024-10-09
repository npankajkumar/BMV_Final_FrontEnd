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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useBmv } from "@/contexts/bmvContext";

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
  const { id } = useParams();

  const { token, isLoggedin } = useBmv();

  const handleCheckoutClick = () => {
    if (!isLoggedin) {
      toast({
        title: "Login to book slots",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => navigate(`/login?redirect=venues/${id}`)}
          >
            Login
          </ToastAction>
        ),
      });
      return;
    }
    axios
      .post(
        "http://localhost:5059/api/booking",
        {
          date: format(date, "dd-MM-yyyy"),
          slotIds: selectedSlots.map((s) => s.id),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast({ title: "Booking done successfully" });
        navigate("/bookings");
      })
      .catch((e) => {
        console.log(e);
        toast({ title: "Error occured", variant: "destructive" });
      });
  };

  return (
    <Card className=" bg-white shadow-md rounded-lg p-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Cart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <Label className="font-medium text-gray-600">Amount:</Label>
          <span className="text-gray-800">{amount}</span>
        </div>
        <div className="flex justify-between">
          <Label className="font-medium text-gray-600">Platform Charges:</Label>
          <span className="text-gray-800">{amount < 1000 ? 10 : 50}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2">
          <Label className="font-semibold text-gray-800">Total:</Label>
          <span className="text-gray-900 font-bold">{total}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          disabled={selectedSlots.length < 1}
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleCheckoutClick}
        >
          Checkout & Pay
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PayCheckOutCard;
