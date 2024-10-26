import { Venue } from "@/types/venue";
import { SearchResult } from "./SearchResult";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResultsListProps {
  results: Venue[];
}

export function SearchResultsList({ results }: SearchResultsListProps) {
  if (results.length === 0) {
    return (
      <div>
        <div className="w-[70%] mx-auto mt-3 p-4 bg-background border rounded-md shadow-lg max-h-[300px]">
          No Results
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="w-[70%] mx-auto mt-3 bg-background border rounded-md shadow-lg max-h-[300px]">
      {results.map((result) => (
        <SearchResult key={result.venueId} result={result} />
      ))}
    </ScrollArea>
  );
}
