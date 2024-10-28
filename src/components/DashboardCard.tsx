import { Card } from "@/components/ui/card";

const DashboardCard = ({
  classname,
  cardHeader,
  value,
  customMessage,
  icon,
}: {
  classname?: string;
  cardHeader: string;
  value: number;
  customMessage: string;
  icon?: JSX.Element;
}) => {
  return (
    <Card
      className={`w-[250px] p-6 rounded-xl border bg-card text-card-foreground shadow ${classname}`}
    >
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{cardHeader}</h3>
        <div>{icon}</div>
      </div>
      <div className="pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{customMessage}</p>
      </div>
    </Card>
  );
};

export default DashboardCard;
