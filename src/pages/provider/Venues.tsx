import VenueCard from "@/components/VenueCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { venueCardsData } from "@/db";
import React, { useEffect, useState } from "react";

const Venues = () => {
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
    }, 5000);
  });
  if (pageLoading)
    return (
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-5">
        {[1, 2, 3, 4, 5].map((i) => {
          return <Skeleton className="h-44" key={i} />;
        })}
      </div>
    );
  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold my-4">Your Venues</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {venueCardsData.map((cardData, i) => (
          <div key={i}>
            <VenueCard
              id={i}
              title={cardData.title}
              city={cardData.city}
              rating={cardData.rating}
              imageUrl={cardData.imageUrl}
              provider={cardData.provider}
              latitude={cardData.latitude}
              longitude={cardData.longitude}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;
