import DashboardCard from "@/components/DashboardCard";
import RecentBookings from "@/components/RecentBookings";
import { BarChartComponent } from "@/components/line-chart/LineChart";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBmv } from "@/contexts/bmvContext";
import axios from "axios";
import { Ticket, IndianRupee, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ provider }: { provider: any }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { isLoggedin, token, role, setIsLoggedin, setToken, setRole } =
    useBmv();

  useEffect(() => {
    setPageLoading(true);
    axios
      .get("http://localhost:5059/api/Dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
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

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          <Button
            variant={"outline"}
            className="rounded shadow-primary hover:shadow-none shadow-sm p-4 hover:bg-primary hover:text-white hover:scale-95 transition ease-in-out"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Venue
          </Button>
        </Link>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 my-5`}>
        <div
          className={`col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3 ${
            isMobile ? "mx-auto" : ""
          }`}
        >
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
            icon={<Ticket />}
          />
          <DashboardCard
            cardHeader="Overall Rating"
            customMessage=""
            value={Math.round(dashboard.overallRating * 10) / 10}
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
