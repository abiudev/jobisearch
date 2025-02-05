import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FetchJobs } from "./fetchJobs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Search } from "lucide-react";
const countries = [
  { code: "ke", name: "Kenya" },
  { code: "us", name: "United States" },
  { code: "ug", name: "Uganda" },
  { code: "tz", name: "Tanzania" },
  { code: "gb", name: "United Kingdom" },
];

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = () => {
    if (searchTerm.trim() !== "") {
      dispatch(FetchJobs({ searchTerm, selectedCountry }));
    }
  };

  const handleSearchKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  return (
    <div className="flex items-center mr-2 ml-2 justify-center mt-[-20px] sm:mt-[-60px]">
      <div className="w-full max-w-2xl">
        <div className="flex rounded-md h-12 shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[80px] h-13 rounded-l-md rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 bg-white">
              <SelectValue>
                <img
                  src={`https://flagcdn.com/w20/${selectedCountry}.png`}
                  width={20}
                  height={15}
                  alt={`Flag of ${
                    countries.find((c) => c.code === selectedCountry)?.name
                  }`}
                />
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <span className="flex items-center">
                    <img
                      src={`https://flagcdn.com/w20/${country.code}.png`}
                      width={20}
                      height={15}
                      alt={`Flag of ${country.name}`}
                      className="mr-2"
                    />
                    {country.code.toUpperCase()}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="w-px bg-teal-600 self-stretch my-1"></div>
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"></div>
            <Input
              value={searchTerm}
              onChange={handleSearch}
              onKeyUp={handleSearchKeyUp}
              placeholder="Accountant Jobs..."
              className="rounded-l-none bg-white rounded-r-none pl-10 pr-4 py-4 text-base h-full focus:ring-0 focus:ring-offset-0 border-l-0"
            />
          </div>
          <Button
            onClick={performSearch}
            className="rounded-l-none h-full px-4 bg-teal-600 hover:bg-teal-800"
          >
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
