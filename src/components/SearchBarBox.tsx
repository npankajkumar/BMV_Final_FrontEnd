import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarBoxProps {
  setResults: (results: { name: string }[]) => void;
  setShowPopover: (show: boolean) => void;
}

const SearchBarBox: React.FC<SearchBarBoxProps> = ({
  setResults,
  setShowPopover,
}) => {
  const [input, setInput] = useState<string>("");

  const fetchData = (value: string) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const data = response.data;
        const results = data.filter((user: { name: string }) => {
          return (
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
    setShowPopover(true);
  };

  return (
    <div className="flex w-[100%] rounded-md h-12 px-4 items-center shadow-md">
      <Search className="text-primary" />
      <input
        placeholder="Type to search"
        className="bg-transparent border-none h-[80%] text-xl outline-none ml-2"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowPopover(true)}
      />
    </div>
  );
};

export default SearchBarBox;
