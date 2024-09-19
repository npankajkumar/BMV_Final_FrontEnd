import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import CustomBookingCard from "@/components/CustomBookingCard";

const Bookings = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const client = localStorage.getItem("auth");
    if (!client || client != "provider") {
      navigate("/login?redirect=bookings");
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login?redirect=bookings");
    }
    axios
      .get("http://localhost:5059/api/Booking", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBookings(response.data);
        // console.log(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error occured",
          description: "Refresh the page and try again",
        });
        setPageLoading(false);
      });
  }, []);
  if (pageLoading) {
    return (
      <div className="mx-40 flex flex-col gap-2 ">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="grid grid-cols-2 space-x-4  p-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-40 h-10" />
              <Skeleton className="w-30 h-10" />
              <Skeleton className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-40 h-10" />
              <Skeleton className="w-40 h-10" />
              <div className="flex gap-2">
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="mx-40 my-5">
      <h1 className="text-3xl font-semibold mb-5">
        {bookings.length == 0 ? "No Bookings Made .." : "All Bookings : "}
      </h1>
      {bookings.map((booking, id) => (
        <CustomBookingCard key={id} booking={booking} />
      ))}
    </div>
  );
};

export default Bookings;
