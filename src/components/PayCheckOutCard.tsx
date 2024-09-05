import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";

interface PayCheckOutCardProps {
  amount: number;
  charges: number;
  taxes: number;
}

const PayCheckOutCard: React.FC<PayCheckOutCardProps> = ({
  amount,
  charges,
  taxes,
}) => {
  const total = amount + charges + taxes;

  return (
    <Card className="w-1/5 bg-white shadow-md rounded-lg p-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Cart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <Label className="font-medium text-gray-600">Amount:</Label>
          <span className="text-gray-800">{amount}</span>
        </div>
        <div className="flex justify-between">
          <Label className="font-medium text-gray-600">Charges:</Label>
          <span className="text-gray-800">{charges}</span>
        </div>
        <div className="flex justify-between">
          <Label className="font-medium text-gray-600">Taxes:</Label>
          <span className="text-gray-800">{taxes}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2">
          <Label className="font-semibold text-gray-800">Total:</Label>
          <span className="text-gray-900 font-bold">{total}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
          Checkout & Pay
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PayCheckOutCard;
