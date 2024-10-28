import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowDown01,
  ArrowDown10,
  ArrowUp,
  ArrowUpDown,
  Search,
} from "lucide-react";
import VenueCard from "@/components/VenueCard";

interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  rating: number;
  images: string[];
  categoryId: number;
}

const AllVenues: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:5059/api/Venues/all");
        const data = await response.json();
        setVenues(data);
        setFilteredVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    let filtered = venues.filter((venue) => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === "all" || venue.city === selectedCity;
      const matchesRating =
        selectedRating === "all" || venue.rating >= parseInt(selectedRating);
      const matchesCategory =
        selectedCategory === "all" ||
        venue.categoryId.toString() === selectedCategory;
      return matchesSearch && matchesCity && matchesRating && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });

    setFilteredVenues(filtered);
  }, [
    searchTerm,
    selectedCity,
    selectedRating,
    selectedCategory,
    venues,
    sortOrder,
  ]);

  const cities = ["all", ...new Set(venues.map((venue) => venue.city))];

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-slate-200"
        style={{ fontFamily: "Montserrat" }}
      >
        All Venues
      </h1>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
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
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city === "all" ? "All Cities" : city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={toggleSortOrder}
          variant="outline"
          className="w-full md:w-auto"
        >
          Sort by Rating{" "}
          {sortOrder === "asc" ? (
            <ArrowDown className="ml-2 h-5 w-5 text-primary" />
          ) : (
            <ArrowUp className="ml-2 h-5 w-5 text-primary" />
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            id={venue.id}
            title={venue.name}
            rating={venue.rating}
            provider=""
            city={venue.city}
            imageUrl={venue.images}
            latitude={venue.latitude}
            longitude={venue.longitude}
          />
        ))}
      </div>
      {filteredVenues.length === 0 && (
        <p className="text-center text-gray-500 mt-8 dark:text-slate-300">
          No venues found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default AllVenues;
