import { useState, useEffect, useRef } from "react";
import { SearchBarBox } from "./SearchBarBox";
import { SearchResultsList } from "./SearchResultsList";
import { Venue } from "@/types/venue";

export function CustomSearchBar() {
  const [showPopover, setShowPopover] = useState(false);
  const [results, setResults] = useState<Venue[]>([]);
  const [inputValue, setInputValue] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative w-full max-w-2xl mx-auto mb-8">
      <SearchBarBox
        setResults={setResults}
        setShowPopover={setShowPopover}
        setInputValue={setInputValue}
      />
      {showPopover && inputValue.length > 0 && (
        <div className="absolute w-full z-50">
          <SearchResultsList results={results} />
        </div>
      )}
    </div>
  );
}
