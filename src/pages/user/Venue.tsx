import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PayCheckOutCard from "@/components/PayCheckOutCard";
import SlotBox from "@/components/SlotBox";
import VenuePageHeader, { getProviderById } from "@/components/VenuePageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { endOfMonth, format, isWeekend, startOfDay } from "date-fns";
import {
  CalendarIcon,
  IndianRupee,
  Info,
  Mail,
  MapPin,
  MoveUpRight,
  Pencil,
  Phone,
  Star,
  Ticket,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Autoplay from "embla-carousel-autoplay";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFound from "@/components/NotFound";
import { toast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DashboardCard from "@/components/DashboardCard";
import { useBmv } from "@/contexts/bmvContext";
import { ToastAction } from "@/components/ui/toast";

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
  const [venue, setVenue] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [book, setBooking] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<slot[]>([]);
  const [cartValue, setCartValue] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [slots, setSlots] = useState<any>([]);
  const [rating, setRating] = useState<number>(0);
  const token = localStorage.getItem("id_token");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { isLoggedin } = useBmv();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleStarClick = (value: number) => {
    if (!isLoggedin) {
      toast({
        title: "Login to rate venue",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() =>
              (window.location.href = `https://bookmyvenue.b2clogin.com/bookmyvenue.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignUpSignIn2&client_id=90177501-7d83-4248-9550-1ffc00a439f4&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&scope=openid&response_type=code&prompt=login`)
            }
          >
            Login
          </ToastAction>
        ),
      });
      return;
    }
    setRating(value);
    handleRatingClick(value);
  };
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        onClick={() => handleStarClick(star)}
        xmlns="http://www.w3.org/2000/svg"
        fill={star <= rating ? "gold" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-6 w-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    ));
  };

  const handleRatingClick = (value: number) => {
    axios
      .put(
        `http://localhost:5059/api/Venues/${parseInt(params.id ?? "1")}`,
        { rating: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Rated the venue successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error changing the venue rating", error);
        setPageLoading(false);
      });
    handleDialogClose();
    toast({ title: "Your rating has been submitted successfully" });
  };

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
    // const find = selectedSlots.find((s) => s.id === selectedSlot.id);
    // if (find) {
    //   setSelectedSlots((c) => c.filter((s) => s.id !== selectedSlot.id));
    //   setCartValue((c) => c - selectedSlot.price);
    // } else {
    //   setSelectedSlots((c) => [...c, selectedSlot]);
    //   setCartValue((c) => c + selectedSlot.price);
    // }
  };

  useEffect(() => {
    setDate(new Date());

    axios
      .get(`http://localhost:5059/api/Venues/${parseInt(params.id ?? "1")}`)
      .then((response) => {
        setVenue(response.data);
        getProviderById(response.data.providerId).then((p) => {
          setMobile(p.mobile);
          setEmail(p.email);
          setPageLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPageLoading(false);
      });
  }, [params.id, rating]);

  useEffect(() => {
    console.log(date);
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

  if (!venue) {
    return <NotFound message="Venue" />;
  }

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
        <div className="grid grid-cols-2 mx-10">
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {venue.images.map((img: any, i: number) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <img
                      src={img}
                      alt=""
                      className="bg-cover overflow-hidden rounded-lg h-[360px] w-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="lg:ml-20">
            <div className={`grid grid-cols-3 p-0`}>
              <DashboardCard
                classname="w-36 border-0 border-r-2 shadow-none rounded-none dark:bg-black"
                cardHeader="Bookings"
                customMessage=""
                value={venue?.bookings?.length ?? 0}
                icon={<Ticket />}
              />
              <DashboardCard
                classname="w-36 border-0 border-r-2 shadow-none rounded-none dark:bg-black"
                cardHeader="Rating"
                customMessage=""
                value={venue ? Math.round(venue.rating * 10) / 10 : 0}
                icon={<Star />}
              />

              <div className="p-6">
                <div className="tracking-tight text-sm flex gap-4 font-medium">
                  Rate Venue
                  <Pencil width={20} height={20} />
                </div>
                <div className="flex justify-center space-x-1 py-4">
                  {renderStars()}
                </div>
              </div>
            </div>
            <div className="my-6">
              <div className="tracking-tight text-xl font-medium flex items-center gap-3 my-4">
                Contact Info <Info />
              </div>
              <div className="flex flex-col gap-4 my-2 text-lg">
                <div className="tracking-tight flex items-center gap-3">
                  <Phone /> {mobile}
                </div>
                <div className="tracking-tight flex items-center gap-3">
                  <Mail /> {email}
                </div>
                <div className="tracking-tight flex gap-3">
                  <MapPin className="shrink-0 w-6 h-6" />
                  <div className="leading-tight">{venue.address}</div>
                </div>
                <a
                  className="flex items-center gap-1 text-primary hover:underline"
                  href={`https://maps.google.com/?q=${venue.latitude},${venue.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on maps
                  <MoveUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <ScrollArea className="col-span-3 h-76">
            <div className="flex w-full justify-between">
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
              <div className="flex space-x-4 p-4">
                {/* Blocked Legend */}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 cursor-not-allowed rounded border border-black"></div>
                  <span className="text-sm">Blocked</span>
                </div>

                {/* Booked Legend */}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 cursor-not-allowed rounded border border-black"></div>
                  <span className="text-sm">Booked</span>
                </div>

                {/* Available Legend */}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 cursor-pointer rounded border border-black"></div>
                  <span className="text-sm">Available</span>
                </div>

                {/* Selected Legend */}
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary cursor-pointer rounded border border-black"></div>
                  <span className="text-sm">Selected</span>
                </div>
              </div>
            </div>
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
