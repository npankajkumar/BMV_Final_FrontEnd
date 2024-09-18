import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarBoxProps {
  setResults: (results: venue[]) => void;
  setShowPopover: (show: boolean) => void;
}

type venue = {
  venueId: number;
  venueName: string;
  venueDescription: string;
  venueCategory: string;
  providerName: string;
  city: string;
  latitude: number;
  longitude: number;
};

const SearchBarBox: React.FC<SearchBarBoxProps> = ({
  setResults,
  setShowPopover,
}) => {
  const [input, setInput] = useState<string>("");

  const fetchData = (value: string) => {
    axios
      .get(`http://localhost:5143/api/Search?q=${value}`)
      .then((res) => {
        let venues = res.data.map((venue: venue) => {
          return {
            venueId: venue.venueId,
            venueName: venue.venueName,
            venueDescription: venue.venueDescription,
            venueCategory: venue.venueCategory,
            providerName: venue.providerName,
            city: venue.city,
            latitude: venue.latitude,
            longitude: venue.longitude,
          };
        });
        setResults(venues);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
    setShowPopover(true);
  };

  return (
    <div className="flex w-[100%] rounded-md h-12 px-4 items-center shadow-md">
      <Search className="text-primary" />
      <input
        placeholder="Type to search"
        className="bg-transparent border-none h-[80%] text-xl outline-none ml-2"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowPopover(true)}
      />
    </div>
  );
};

export default SearchBarBox;
