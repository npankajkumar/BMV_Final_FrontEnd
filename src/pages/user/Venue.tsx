import { ConditionalDatePicker } from "@/components/ConditionalDatePicker";
import PayCheckOutCard from "@/components/PayCheckOutCard";
import SlotBox from "@/components/SlotBox";
import VenuePageHeader from "@/components/VenuePageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { endOfMonth, format, isWeekend, startOfDay } from "date-fns";
import { CalendarIcon, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useParams } from "react-router-dom";

type venue = {};
type slot = {
  id: string;
  start: Date;
  end: Date;
  price: number;
  status: "booked" | "blocked" | "available";
};

const Venue = () => {
  const params = useParams();
  const [venue, setVenue] = useState<any>();
  const [pageLoading, setPageLoading] = useState(true);
  const [book, setBooking] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<slot[]>([]);
  const [cartValue, setCartValue] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [slots, setSlots] = useState<any>([]);

  const handleSlotBoxClick = (selectedSlot: slot, selected: boolean) => {
    if (selected) {
      const find = selectedSlots.find((s) => s.id === selectedSlot.id);
      if (find) return;
      setSelectedSlots((c) => [...c, selectedSlot]);
      setCartValue((c) => c + selectedSlot.price);
    } else {
      const find = selectedSlots.find((s) => s.id === selectedSlot.id);
      if (!find) return;
      setSelectedSlots((c) => c.filter((s) => s.id !== selectedSlot.id));
      setCartValue((c) => c - selectedSlot.price);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5059/api/Venues/${parseInt(params.id ?? "1")}`)
      .then((response) => {
        setVenue(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPageLoading(false);
      });
  }, [params.id]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5059/api/Slot?date=${format(
          date ?? new Date(),
          "dd-MM-yyyy"
        )}&venueId=${params.id}`
      )
      .then((res) => setSlots(res.data))
      .catch((e) => console.log(e));
  }, [date, params.id]);

  if (pageLoading)
    return (
      <div className="p-4 ">
        <div className="grid grid-cols-2 space-x-4  p-4">
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
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-60 w-full rounded-md" />
          <div className="col-span-2">
            <Skeleton className="h-60" />
          </div>
        </div>
      </div>
    );

  const imageUrl = "https://media.hudle.in/photos/49940";
  return (
    <div className="p-6">
      <VenuePageHeader
        venue={venue}
        btnName="Book"
        book={book}
        onBookClick={() => {
          setBooking((c) => !c);
        }}
      />
      <Separator className="my-6" />
      {!book ? (
        <div className="grid grid-cols-3 gap-4">
          <ScrollArea className="h-60 w-full whitespace-nowrap rounded-md">
            <div className="flex flex-col gap-4 w-max mx-auto">
              {venue.images.map((img: any, i: number) => (
                <div key={i} className=" ">
                  <img
                    src={img}
                    alt=""
                    className="bg-cover overflow-hidden rounded-lg h-60"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-medium text-center">
                    Offers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex gap-1 my-2">
                    <IndianRupee className="h-5 w-5 mt-2" />{" "}
                    <div className="my-auto">200 </div>
                    <div className="text-sm font-normal my-auto mt-2">
                      off on booking over 2000
                    </div>
                  </div>
                  Use BMV200
                </CardContent>
              </Card>
            </div>
            <Separator className="my-4" />
            <div></div>
            <div className="text-2xl font-bold flex gap-1 my-2 mx-2">
              Exclusive:
              <IndianRupee className="h-5 w-5 mt-2" />{" "}
              <div className="my-auto">230 </div>
              <div className="text-sm font-normal my-auto mt-2">/ week</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <ScrollArea className="col-span-3 h-76">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < startOfDay(new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="m-5 grid grid-cols-4 gap-4">
              {slots.length < 1 ? (
                <div className="text-lg font-semibold">No slots</div>
              ) : (
                slots.map((slot: any) => (
                  <SlotBox
                    key={slot.id}
                    slot={{
                      id: slot.id,
                      start: slot.start,
                      end: slot.end,
                      price: isWeekend(date ?? new Date())
                        ? slot.weekendPrice
                        : slot.weekdayPrice,
                      status: slot.status,
                    }}
                    onClick={handleSlotBoxClick}
                  />
                ))
              )}
            </div>
          </ScrollArea>
          <div className="col-span-1">
            <PayCheckOutCard
              date={date ?? new Date()}
              amount={cartValue}
              charges={1}
              taxes={1}
              selectedSlots={selectedSlots}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Venue;
