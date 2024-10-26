import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import CustomBookingCard from "@/components/CustomBookingCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useBmv } from "@/contexts/bmvContext";
import { CalendarX, Search, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Bookings = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [timeWindow, setTimeWindow] = useState("all");
  const navigate = useNavigate();

  const { token } = useBmv();

  useEffect(() => {
    axios
      .get("http://localhost:5059/api/Booking", {
        headers: {
          Authorization: `Bearer ${token}`,
          User: "customer",
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
  }, [navigate, token]);

  const filteredAndSortedBookings = bookings
    .filter((booking: any) => {
      const venueMatch = booking.venueName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const dateMatch = dateFilter ? booking.date === dateFilter : true;

      let timeWindowMatch = true;
      if (timeWindow !== "all") {
        const bookingDate = new Date(booking.date);
        const currentDate = new Date();
        const diffTime = Math.abs(
          currentDate.getTime() - bookingDate.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (timeWindow) {
          case "week":
            timeWindowMatch = diffDays <= 7;
            break;
          case "month":
            timeWindowMatch = diffDays <= 30;
            break;
          case "year":
            timeWindowMatch = diffDays <= 365;
            break;
        }
      }

      return venueMatch && dateMatch && timeWindowMatch;
    })
    .sort((a: any, b: any) => {
      if (sortAscending) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

  const uniqueVenues = Array.from(
    new Set(filteredAndSortedBookings.map((booking: any) => booking.venueName))
  );

  if (pageLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-3xl font-bold mb-8 text-primary dark:text-primary-foreground"
          style={{ fontFamily: "Montserrat" }}
        >
          Your Bookings
        </h1>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-9 w-36" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-8 text-black dark:text-primary-foreground"
        style={{ fontFamily: "Montserrat" }}
      >
        Your Bookings
      </h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by venue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-auto"
        />
        <Select value={timeWindow} onValueChange={setTimeWindow}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select time window" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="week">Last week</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setSortAscending(!sortAscending)}
          className="w-full sm:w-auto"
        >
          {sortAscending ? <SortAsc size={20} /> : <SortDesc size={20} />}
          Sort by ID
        </Button>
      </div>
      {filteredAndSortedBookings.length === 0 ? (
        <Card className="p-8 text-center">
          <CalendarX className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            No bookings...
          </h2>
          <Button
            variant={"link"}
            className="text-md font-semibold"
            onClick={() => navigate("/")}
            style={{ fontFamily: "Montserrat" }}
          >
            Explore Venues
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {uniqueVenues.map((venueName) => (
            <div key={venueName}>
              {filteredAndSortedBookings
                .filter((booking: any) => booking.venueName === venueName)
                .map((booking: any, id: number) => (
                  <CustomBookingCard key={id} booking={booking} />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
