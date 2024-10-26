import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import VenueCard from "@/components/VenueCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Venues = ({ provider }: { provider: any }) => {
  const [pageLoading, setPageLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSortedVenues = useMemo(() => {
    return provider.venues
      .filter((venue: any) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: any, b: any) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [provider.venues, searchTerm, sortBy]);

  if (pageLoading)
    return (
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton className="h-72" key={i} />
        ))}
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-semibold">Your Venues</h3>
        <Link to="/venues/new">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Venue
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Sort By:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedVenues.map((venue: any) => (
          <VenueCard
            key={venue.id}
            id={venue.id}
            title={venue.name}
            city={venue.city}
            rating={venue.rating}
            imageUrl={venue.images}
            latitude={venue.latitude}
            longitude={venue.longitude}
            provider={provider.name}
          />
        ))}
      </div>

      {filteredAndSortedVenues.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          No venues found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default Venues;
