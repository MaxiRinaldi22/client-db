"use client";

import { createContext, useState } from "react";

type InputContextType = {
  searchInput: string;
  setSearchInput: (value: string) => void;
};

const SearchInputContext = createContext<InputContextType | null>(null);

function SearchInputProvider({ children }: { children: React.ReactNode }) {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchInputContext.Provider>
  );
}

export { SearchInputProvider, SearchInputContext };
