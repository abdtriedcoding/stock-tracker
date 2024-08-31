"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { companies } from "../companies";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Command, CommandItem, CommandList } from "@/components/ui/command";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ name: string; ticker: string }[]>(
    []
  );

  function searchCompanies(query: string) {
    if (!query) return [];

    const lowerCaseQuery = query.toLowerCase();

    const filteredCompanies = companies
      .filter((company) => company.name.toLowerCase().includes(lowerCaseQuery))
      .slice(0, 5);

    return filteredCompanies;
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    const matches = searchCompanies(searchTerm);
    setResults(matches);
  };

  return (
    <div className="relative w-full">
      <Command>
        <Input
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a company..."
        />
        <CommandList
          className={cn(
            "absolute z-10 mt-12 w-full overflow-auto rounded-md border bg-popover p-2 shadow-md transition-all duration-75",
            {
              hidden: results.length === 0,
            }
          )}
        >
          {results.map((item) => (
            <CommandItem
              key={item.name}
              value={item.name}
              onSelect={() => {
                router.push(
                  `/?company=${encodeURIComponent(item.name)}&ticker=${
                    item.ticker
                  }`
                );
                setResults([]);
                setQuery("");
              }}
            >
              <div className="flex items-center space-x-2">{item.name}</div>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
}
