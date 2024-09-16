import React from "react";

interface SearchResultProps {
  result: {
    name: string;
  };
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <div
      className="text-start text-md px-4 py-2 m-1 font-semibold hover:bg-gray-100 hover:cursor-pointer hover:rounded-md"
      onClick={() => {
        alert(result.name);
      }}
    >
      {result.name}
    </div>
  );
};

export default SearchResult;
