import React from "react";
import SearchResult from "./SearchResult";

interface SearchResultsListProps {
  results: { name: string }[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <div className="w-[100%] shadow-lg flex flex-col rounded-md mt-1 max-h-[150px] overflow-y-auto">
      {results.map((res, id) => (
        <SearchResult key={id} result={res} />
      ))}
    </div>
  );
};

export default SearchResultsList;
