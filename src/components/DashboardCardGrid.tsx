import { Box, IndianRupee, Star } from "lucide-react";
import DashboardCard from "./DashboardCard";
const DashboardCardGrid = ({className}:{className?:string}) => {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${className}`}>
      <DashboardCard
        cardHeader="Total Earnings"
        customMessage=""
        value={45789.01}
        icon={<IndianRupee />}
      />
      <DashboardCard
        cardHeader="Total Bookings"
        customMessage=""
        value={1360}
        icon={<Box />}
      />
      <DashboardCard
        cardHeader="Overall Rating"
        customMessage=""
        value={4.5}
        icon={<Star />}
      />
    </div>
  );
};

export default DashboardCardGrid;
