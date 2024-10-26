import { Link } from "react-router-dom";
import { Venue } from "@/types/venue";
import { MapPin } from "lucide-react";

interface SearchResultProps {
  result: Venue;
}

export function SearchResult({ result }: SearchResultProps) {
  return (
    <Link to={`/venues/${result.venueId}`}>
      <div className="flex items-center justify-between p-4 hover:bg-muted transition-colors">
        <div>
          <h3 className="font-semibold">{result.venueName}</h3>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {result.city}
          </p>
        </div>
        <div className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
          {result.venueCategory}
        </div>
      </div>
    </Link>
  );
}
