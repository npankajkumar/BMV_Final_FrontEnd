import BookingCard from "@/components/BookingCard";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Bookings = ({ provider }: { provider: any }) => {
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
        console.log(response.data);
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
    <div className="mx-40 my-10">
      <BookingCard />
    </div>
  );
};

export default Bookings;
