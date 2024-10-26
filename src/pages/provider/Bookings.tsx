import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import CustomBookingCard from "@/components/CustomBookingCard";
import { useBmv } from "@/contexts/bmvContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, SortDesc, CalendarX } from "lucide-react";

const Bookings = ({ provider }: { provider: any }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [timeWindow, setTimeWindow] = useState("all");
  const [sortAscending, setSortAscending] = useState(true);
  const navigate = useNavigate();
  const { token } = useBmv();

  useEffect(() => {
    axios
      .get("http://localhost:5059/api/Booking", {
        headers: { Authorization: `Bearer ${token}`, User: "provider" },
      })
      .then((response) => {
        setBookings(response.data);
        setFilteredBookings(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error occurred",
          description: "Refresh the page and try again",
        });
        setPageLoading(false);
      });
  }, [token]);

  useEffect(() => {
    const filtered = bookings
      .filter((booking) => {
        const searchMatch =
          booking.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerName.toLowerCase().includes(searchTerm.toLowerCase());
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

        return (
          searchMatch &&
          dateMatch &&
          timeWindowMatch &&
          booking.providerId === provider.id
        );
      })
      .sort((a, b) => {
        if (sortAscending) {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });

    setFilteredBookings(filtered);
  }, [
    bookings,
    searchTerm,
    dateFilter,
    timeWindow,
    sortAscending,
    provider.id,
  ]);

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
      <h1
        className="text-3xl font-semibold mb-5 text-black dark:text-primary-foreground"
        style={{ fontFamily: "Montserrat" }}
      >
        Your Bookings
      </h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by venue or customer name"
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
          className="w-full sm:w-auto bg-background text-foreground"
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
      {filteredBookings.length === 0 ? (
        <Card className="p-8 text-center">
          <CalendarX className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2
            className="text-2xl font-semibold mb-4 text-primary dark:text-primary-foreground"
            style={{ fontFamily: "Montserrat" }}
          >
            No bookings found
          </h2>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="default"
            className="text-md font-semibold"
            onClick={() => {
              setSearchTerm("");
              setDateFilter("");
              setTimeWindow("all");
            }}
            style={{ fontFamily: "Montserrat" }}
          >
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredBookings.map((booking, id) => (
            <CustomBookingCard key={id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
