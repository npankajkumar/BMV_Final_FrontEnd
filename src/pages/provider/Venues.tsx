import VenueCard from "@/components/VenueCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { venueCardsData } from "@/db";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Venues = ({ provider }: { provider: any }) => {
  const [pageLoading, setPageLoading] = useState(false);

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
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold my-4">Your Venues</h3>
        <Link to={"/venues/new"}>
          <Button variant={"outline"} className="mr-2">
            <Plus />
            Add Venue
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {provider.venues.map((venue: any) => (
          <div key={venue.id}>
            <VenueCard
              id={venue.id}
              title={venue.name}
              city={venue.city}
              rating={venue.rating}
              imageUrl={venue.images}
              provider={provider.name}
              latitude={venue.latitude}
              longitude={venue.longitude}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;
