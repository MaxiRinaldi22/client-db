"use client";
import { Input } from "@/components/ui/input";
import AddClientDialog from "./add-client-dialog";
import useInputContext from "@/hooks/useInputContext";

export default function DashboardHeader() {
  const { searchInput, setSearchInput } = useInputContext();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
      <div className="w-full sm:w-auto sm:flex-1 sm:mr-4">
        <Input
          type="text"
          placeholder="Buscar..."
          className="w-full max-w-md"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <AddClientDialog />
    </div>
  );
}
