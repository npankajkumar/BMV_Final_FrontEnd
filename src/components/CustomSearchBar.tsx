import { useState, useEffect, useRef } from "react";
import SearchBarBox from "./SearchBarBox";
import SearchResultsList from "./SearchResultsList";

type venue = {
  venueId: number;
  venueName: string;
  venueDescription: string;
  venueCategory: string;
  city: string;
};

const CustomSearchBar: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [results, setResults] = useState<venue[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div
      ref={searchBarRef}
      className="w-[40%] flex flex-col items-center min-w-[200px] m-auto relative"
    >
      <SearchBarBox setResults={setResults} setShowPopover={setShowPopover} />
      {showPopover && <SearchResultsList results={results} />}
    </div>
  );
};

export default CustomSearchBar;
