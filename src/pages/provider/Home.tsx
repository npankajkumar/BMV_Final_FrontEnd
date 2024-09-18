import DashboardCardGrid from "@/components/DashboardCardGrid";
import RecentBookings from "@/components/RecentBookings";
import {
  BarChartComponent,
  EarningsChart,
} from "@/components/line-chart/LineChart";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { chartData } from "@/db";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ provider }: { provider: any }) => {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    // axios.get('https://api.example.com/data')
    //       .then(response => {
    //         setData(response.data);
    //         setLoading(false);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //         setLoading(false);
    //       });
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  });

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

  return (
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
        <DashboardCardGrid className="col-span-3" />
        <Card className="h-full p-4 col-span-1">
          <CardTitle className="my-2">Upcoming Slot</CardTitle>
          <div className="flex gap-2">
            <p className="font-semibold text-lg">7:30 P.M - 8:30 P.M</p>
            <p className="font-light text-sm mt-1">
              {format(new Date(), "dd/MM/yyyy")}
            </p>
          </div>
          <p className="font-light text-sm">Box Cricket</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <BarChartComponent
          className=""
          data={chartData}
          bookings={100}
          percentageIncrease={1.5}
        />
        <RecentBookings />
      </div>
    </div>
  );
};

export default Home;
