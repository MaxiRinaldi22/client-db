import { SearchInputContext } from "@/context/SearchInputProvider";
import { useContext } from "react";

export default function useInputContext() {
  const context = useContext(SearchInputContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
}
