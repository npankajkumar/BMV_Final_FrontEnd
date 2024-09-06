import { Avatar, AvatarFallback } from "./ui/avatar";
const RecentBookingPerson = ({
  name,
  phoneNumber,
  amount,
}: {
  name: string;
  phoneNumber: string;
  amount: number;
}) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{phoneNumber}</p>
      </div>
      <div className="ml-auto font-medium">+&#8377;{amount}</div>
    </div>
  );
};

export default RecentBookingPerson;
