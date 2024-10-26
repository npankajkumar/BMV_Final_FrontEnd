import { useState, useCallback } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Venue } from "@/types/venue";
import { debounce } from "lodash";

interface SearchBarBoxProps {
  setResults: (results: Venue[]) => void;
  setShowPopover: (show: boolean) => void;
  setInputValue: (value: string) => void;
}

export function SearchBarBox({
  setResults,
  setShowPopover,
  setInputValue,
}: SearchBarBoxProps) {
  const [input, setInput] = useState("");

  const fetchData = async (value: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5143/api/Search?q=${value}`
      );
      const venues: Venue[] = res.data.map((venue: any) => ({
        venueId: venue.venueId,
        venueName: venue.venueName,
        venueDescription: venue.venueDescription,
        venueCategory: venue.venueCategory,
        providerName: venue.providerName,
        city: venue.city,
        latitude: venue.latitude,
        longitude: venue.longitude,
      }));
      setResults(venues);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((value: string) => {
      if (value.length >= 0) {
        fetchData(value);
      } else {
        setResults([]);
      }
    }, 300),
    []
  );

  const handleChange = (value: string) => {
    setInput(value);
    setInputValue(value);
    debouncedFetchData(value);
    setShowPopover(true);
  };

  return (
    <div className="relative w-[70%] mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
      <Input
        type="text"
        placeholder="Search venues..."
        className="pl-10 pr-4 py-2 w-full"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowPopover(true)}
      />
    </div>
  );
}
