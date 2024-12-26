import { ClientType } from "./types";

type SortFunctionTypes = {
  filteredClientes: ClientType[];
  setFilteredClientes: React.Dispatch<React.SetStateAction<ClientType[]>>;
};

export const handleSortByName = ({
  filteredClientes,
  setFilteredClientes,
}: SortFunctionTypes) => {
  const sortedClientes = [...filteredClientes].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  setFilteredClientes(sortedClientes);
};

export const handleSortByStatus = ({
  filteredClientes,
  setFilteredClientes,
}: SortFunctionTypes) => {
  const sortedClientes = [...filteredClientes].sort((a, b) =>
    a.status.localeCompare(b.status)
  );

  setFilteredClientes(sortedClientes);
};

export const handleSortByDate = ({
  filteredClientes,
  setFilteredClientes,
}: SortFunctionTypes) => {
  const sortedClientes = [...filteredClientes].sort((a, b) => {
    const dateA = a.date.split("/").reverse().join("-");
    const dateB = b.date.split("/").reverse().join("-");

    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  setFilteredClientes(sortedClientes);
};
