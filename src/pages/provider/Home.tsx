import DashboardCard from "@/components/DashboardCard";
import RecentBookings from "@/components/RecentBookings";
import { BarChartComponent } from "@/components/line-chart/LineChart";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Box, IndianRupee, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ provider }: { provider: any }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>();
  useEffect(() => {
    setPageLoading(true);
    axios
      .get("http://localhost:5059/api/Dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        setDashboard(res.data);
        setPageLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setPageLoading(false);
      });
  }, []);
  let chartd: any[] = [];
  if (dashboard) {
    chartd = dashboard.cData.earnings.map((e: any, i: any) => {
      return { day: i + 1, earnings: e };
    });
  }
  if (pageLoading) {
    return (
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Dashboard</CardTitle>
          <Skeleton className="w-40 h-10" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-5">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-full h-32" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  return dashboard ? (
    <div className="w-vw p-4">
      <div className="flex items-center justify-between gap-4">
        <CardTitle>Dashboard</CardTitle>
        <Link to={"/venues/new"}>
          <Button variant={"outline"}>
            <Plus />
            Add Venue
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-5">
        <div className={`col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3`}>
          <DashboardCard
            cardHeader="Total Earnings"
            customMessage=""
            value={dashboard.totalEarnings}
            icon={<IndianRupee />}
          />
          <DashboardCard
            cardHeader="Total Bookings"
            customMessage=""
            value={dashboard.totalBookings}
            icon={<Box />}
          />
          <DashboardCard
            cardHeader="Overall Rating"
            customMessage=""
            value={dashboard.overallRating}
            icon={<Star />}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <BarChartComponent
          className=""
          data={chartd}
          bookings={100}
          percentageIncrease={1.5}
        />
        <RecentBookings bookings={dashboard.recentBookings} />
      </div>
    </div>
  ) : (
    <div>Error occured</div>
  );
};

export default Home;
