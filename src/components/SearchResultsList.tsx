import React from "react";
import SearchResult from "./SearchResult";

interface SearchResultsListProps {
  results: venue[];
}

type venue = {
  venueId: number;
  venueName: string;
  venueDescription: string;
  venueCategory: string;
  city: string;
};

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <div className="w-[100%] shadow-lg flex flex-col rounded-md bg-white max-h-[150px] overflow-y-auto z-10 absolute mt-14">
      {results.length == 0 && (
        <div>
          <div className="text-start text-md px-4 py-2 m-1 font-semibold hover:bg-gray-100 hover:cursor-pointer hover:rounded-md">
            No Results
          </div>
        </div>
      )}
      {results.map((res, id) => {
        console.log(res);
        return <SearchResult key={id} result={res} />;
      })}
    </div>
  );
};

export default SearchResultsList;
