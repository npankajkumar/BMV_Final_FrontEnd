import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div className={`flex w-full max-w-sm items-center space-x-2 ${className}`}>
      <Input
        className="md:w-[100px] lg:w-[300px] text-black"
        type="search"
        placeholder="Search..."
      />    
      <Button type="submit">Search</Button>
    </div>
  );
};
export default SearchBar;
