import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarBoxProps {
  setResults: (results: { name: string }[]) => void;
}

const SearchBarBox: React.FC<SearchBarBoxProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>("");

  const fetchData = (value: string) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const results = data.filter((user: { name: string }) => {
          return (
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="flex w-[100%] rounded-md h-12 px-4 items-center shadow-md">
      <Search className="text-primary" />
      <input
        placeholder="Type to search"
        className="bg-transparent border-none  h-[80%] text-xl outline-none  ml-2"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBarBox;
