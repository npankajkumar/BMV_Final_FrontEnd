import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Typewriter from "typewriter-effect";
import UserVenueCardsGrid from "@/components/UserVenueCardsGrid";

interface Venue {
  id: number;
  title: string;
  rating: number;
  city: string;
  imageUrl: string;
  provider: string;
  latitude: number;
  longitude: number;
}

interface CardData {
  id: number;
  title: string;
  rating: number;
  city: string;
  imageUrl: string[];
  provider: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [pageLoading, setPageLoading] = useState(true);
  const [topRatedVenues, setTopRatedVenues] = useState<CardData[]>([]);
  const [topBookedVenues, setTopBookedVenues] = useState<CardData[]>([]);

  useEffect(() => {
    getTopRatedVenues()
      .then((res) => {
        setTopRatedVenues(res.topRatedVenues.map(venueToCardData));
        setTopBookedVenues(res.topBookedVenues.map(venueToCardData));
        setPageLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch venues:", error);
        setPageLoading(false);
      });
  }, []);

  if (pageLoading)
    return (
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-5">
        {[1, 2, 3, 4, 5].map((i) => {
          return <Skeleton className="h-44" key={i} />;
        })}
      </div>
    );

  return (
    <div className="p-5">
      <div className="mb-8 text-center">
        <div
          className="text-4xl font-bold bg-gradient-to-r from-[#bb4848] to-[#982842] bg-clip-text text-transparent"
          style={{
            fontFamily: "Montserrat, sans-serif", // Ensure fallback font is included
            WebkitBackgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Discover the Best Venues")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Book Today for Easy Planning...")
                .start();
            }}
            options={{
              cursor: "|",
              delay: 75,
            }}
          />
        </div>
        <style>
          {`
            .Typewriter__cursor {
              font-size: 2.25rem; 
              color: #a01535; 
              font-family: 'Montserrat', sans-serif; 
              width: 10px; 
              display: inline-block; 
            }
          `}
        </style>

        <p
          className="mt-2 text-md text-gray-700 w-[50%] mx-auto font-semibold dark:text-slate-200"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Find the perfect venue for your next event! From stunning banquet
          halls to cozy meeting spaces, we offer a wide selection of venues
          tailored to fit every occasion.
        </p>
      </div>
      <UserVenueCardsGrid
        className="my-7"
        title="Top Rated Venues"
        cardDataArray={topRatedVenues}
      />
      <UserVenueCardsGrid
        className="my-8"
        title="Top Booked Venues"
        cardDataArray={topBookedVenues}
      />
    </div>
  );
}

async function getTopRatedVenues() {
  try {
    const res = await axios.get(
      "http://localhost:5059/api/Venues?topRated=true&topbooked=true"
    );
    return {
      topRatedVenues: await Promise.all(
        res.data.topRatedVenues.map(formatVenue)
      ),
      topBookedVenues: await Promise.all(
        res.data.topBookedVenues.map(formatVenue)
      ),
    };
  } catch (error) {
    console.error("Error fetching top rated venues:", error);
    throw error;
  }
}

async function formatVenue(v: any): Promise<Venue> {
  try {
    const providerName = await getProviderById(v.providerId);
    return {
      id: v.id,
      title: v.name,
      rating: v.rating,
      city: v.city,
      imageUrl: v.images,
      provider: providerName,
      latitude: v.latitude,
      longitude: v.longitude,
    };
  } catch (error) {
    console.error("Error formatting venue:", error);
    throw error;
  }
}

function venueToCardData(venue: Venue): CardData {
  return {
    ...venue,
    imageUrl: Array.isArray(venue.imageUrl) ? venue.imageUrl : [venue.imageUrl],
  };
}

async function getProviderById(id: number) {
  try {
    const res = await axios.get(`http://localhost:5059/api/Providers/${id}`);
    return res.data.name;
  } catch (error) {
    console.error("Error fetching provider:", error);
    throw error;
  }
}
