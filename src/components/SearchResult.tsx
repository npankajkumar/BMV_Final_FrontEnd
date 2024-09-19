import React from "react";
import { Link } from "react-router-dom";

interface SearchResultProps {
  result: venue;
}

type venue = {
  venueId: number;
  venueName: string;
  venueDescription: string;
  venueCategory: string;
  city: string;
};

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <div className="text-start text-md px-4 py-2 m-1 font-semibold hover:bg-gray-100 hover:cursor-pointer hover:rounded-md">
      <Link to={`venues/${result.venueId}`} className="grid grid-cols-3 gap-2">
        <div className="col-span-2 text-xl font-semibold">
          {result.venueName}
        </div>
        <div className="col-span-1 text-right">
          <div className="text">{result.venueCategory}</div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
