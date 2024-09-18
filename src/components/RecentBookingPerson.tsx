import { Avatar, AvatarFallback } from "./ui/avatar";
const RecentBookingPerson = ({
  name,
  date,
  amount,
}: {
  name: string;
  date: string;
  amount: number;
}) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <div className="ml-auto font-medium">+&#8377;{amount}</div>
    </div>
  );
};

export default RecentBookingPerson;
