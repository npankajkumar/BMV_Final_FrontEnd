import { useState } from "react";
import SearchBarBox from "./SearchBarBox";
import SearchResultsList from "./SearchResultsList";

const CustomSearchBar: React.FC = () => {
  const [results, setResults] = useState<{ name: string }[]>([]);

  return (
    <div className="w-[40%] flex flex-col items-center min-w-[200px] m-auto relative">
      <SearchBarBox setResults={setResults} />
      <SearchResultsList results={results} />
    </div>
  );
};

export default CustomSearchBar;
