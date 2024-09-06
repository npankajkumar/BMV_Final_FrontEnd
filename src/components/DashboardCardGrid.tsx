import { Box, IndianRupee, Star } from "lucide-react";
import DashboardCard from "./DashboardCard";
const DashboardCardGrid = () => {
  return (
    <div className="w-[65%] m-5 flex justify-between">
      <DashboardCard
        cardHeader="Total Earnings"
        customMessage="+10.5% increase than last month"
        value={45789.01}
        icon={<IndianRupee />}
      />
      <DashboardCard
        cardHeader="Total Bookings"
        customMessage="20 more than last month"
        value={1360}
        icon={<Box />}
      />
      <DashboardCard
        cardHeader="Overall Rating"
        customMessage="+0.5% increase than last month"
        value={4.5}
        icon={<Star />}
      />
    </div>
  );
};

export default DashboardCardGrid;
