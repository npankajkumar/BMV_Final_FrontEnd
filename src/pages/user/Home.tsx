import CustomSearchBar from "@/components/CustomSearchBar";
// import SearchBar from "@/components/SearchBar";
import UserVenueCardsGrid from "@/components/UserVenueCardsGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { venueCardsData } from "@/db";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [topRatedVenues, setTopRatedVenues] = useState<any>([]);
  const [topBookedVenues, setTopBookedVenues] = useState<any>([]);

  useEffect(() => {
    getTopRatedVenues().then((res) => {
      setTopRatedVenues(res.topRatedVenues);
      setTopBookedVenues(res.topBookedVenues);
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
      {/* <SearchBar className="my-10 mx-auto" /> */}
      <CustomSearchBar />
      <UserVenueCardsGrid
        className="my-4"
        title="Top-Rated"
        cardDataArray={topRatedVenues}
      />
      <UserVenueCardsGrid
        className="my-4"
        title="Top-Booked"
        cardDataArray={topBookedVenues}
      />
    </div>
  );
};

const getTopRatedVenues = async () => {
  const result = [];
  const res = await axios.get(
    "http://localhost:5059/api/Venues?topRated=true&topbooked=true"
  );
  const trVenues = res.data.topRatedVenues;
  const tbVenues = res.data.topBookedVenues;

  const trVenuePromises = trVenues.map(async (v: any) => {
    const pName = await getProviderById(v.providerId);
    return {
      id: v.id,
      name: v.name,
      rating: v.rating,
      city: v.city,
      imageUrl: v.images,
      provider: pName,
      latitude: v.latitude,
      longitude: v.longitude,
    };
  });
  const tbVenuePromises = tbVenues.map(async (v: any) => {
    const pName = await getProviderById(v.providerId);
    return {
      id: v.id,
      name: v.name,
      rating: v.rating,
      city: v.city,
      imageUrl: v.images,
      provider: pName,
      latitude: v.latitude,
      longitude: v.longitude,
    };
  });

  const resolvedTrVenues = await Promise.all(trVenuePromises);
  const resolvedTbVenues = await Promise.all(tbVenuePromises);
  return {
    topRatedVenues: resolvedTrVenues,
    topBookedVenues: resolvedTbVenues,
  };
};

const getProviderById = async (id: number) => {
  const res = await axios.get(`http://localhost:5059/api/Providers/${id}`);
  return res.data.name;
};

export default Home;
