import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import CustomBookingCard from "@/components/CustomBookingCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Bookings = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login?redirect=bookings");
      return;
    }

    axios
      .get("http://localhost:5059/api/Booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        toast({
          title: "Error loading your bookings page",
          description: error.message,
        });
      });
    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  }, [navigate]);

  if (pageLoading) {
    return (
      <div className="mx-40 flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="grid grid-cols-2 space-x-4 p-4">
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
    <div className="mx-40 my-10 flex flex-col">
      {bookings.length == 0 ? (
        <div className="mx-auto my-auto">
          <h1 className="text-3xl font-semibold">You have no Bookings..</h1>
          <Button variant={"link"} className="text-md font-semibold mt-2 ml-20">
            explore venues
          </Button>
        </div>
      ) : (
        <h1 className="mb-5 text-3xl ">Your Bookings : </h1>
      )}
      {bookings.map((booking, id) => (
        <CustomBookingCard key={id} booking={booking} />
      ))}
    </div>
  );
};

export default Bookings;
