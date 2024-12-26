"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  handleSortByDate,
  handleSortByName,
  handleSortByStatus,
} from "@/lib/sortFuctions";

import useInputContext from "@/hooks/useInputContext";
import { formDate } from "@/lib/dateFormatter";
import { getClients } from "@/lib/getClients";
import { ClientType } from "@/lib/types";
import { TableButtons } from "./table-buttons";
import { ClientTableSkeleton } from "./client-table-skeleton";
import { handleModify } from "@/lib/modify";

export default function ClientTable() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<ClientType[]>([]);
  const [loading, setLoading] = useState(true);

  const { searchInput } = useInputContext();

  useEffect(() => {
    if (searchInput !== "") {
      const filtered = clients.filter((client) => {
        const normalizeString = (str: string) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        return normalizeString(client.name).includes(
          normalizeString(searchInput)
        );
      });
      setFilteredClientes(filtered);
    } else {
      setFilteredClientes(clients);
    }
  }, [searchInput, clients]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await getClients();

        setClients(clientsData);
        setFilteredClientes(clientsData);
        setLoading(false);
      } catch {
        console.error("Failed to fetch clients");
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const updateClientsMonthly = () => {
      const currentDate = new Date();
      const currentMonthYear = currentDate.toLocaleString("default", {
        month: "2-digit",
        year: "numeric",
      });

      if (currentDate.getDate() === 26) {
        const updatedClients = clients.map((client) => {
          if (!client.paymentHistory[currentMonthYear]) {
            client.paymentHistory[currentMonthYear] = false;
            client.status = "Pendiente";
          }
          return client;
        });

        const updateClientsInDB = async () => {
          try {
            await Promise.all(
              updatedClients.map((client) => handleModify(client, true))
            );
            setClients(updatedClients);
            setFilteredClientes(updatedClients);
          } catch (error) {
            console.error("Failed to update clients in the database", error);
          }
        };

        updateClientsInDB();
      }
    };

    const checkDateChange = () => {
      const now = new Date();
      if (now.getDate() === 26) {
        updateClientsMonthly();
      }
    };

    const intervalId = setInterval(checkDateChange, 24 * 60 * 60 * 1000); 

    return () => clearInterval(intervalId); 
  }, [clients]);

  if (loading) {
    return <ClientTableSkeleton />;
  }

  return (
    <>
      {clients.length === 0 ? (
        <div className="text-start mt-10">
          <h1 className="text-xl font-[200]">
            No hay datos disponibles en este momento.
          </h1>
        </div>
      ) : (
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={() =>
                    handleSortByName({ filteredClientes, setFilteredClientes })
                  }
                  className="cursor-pointer"
                >
                  Nombre
                </TableHead>
                <TableHead>Cedula</TableHead>
                <TableHead
                  onClick={() =>
                    handleSortByDate({ filteredClientes, setFilteredClientes })
                  }
                  className="cursor-pointer"
                >
                  Fecha de ingreso
                </TableHead>
                <TableHead
                  onClick={() =>
                    handleSortByStatus({
                      filteredClientes,
                      setFilteredClientes,
                    })
                  }
                  className="cursor-pointer"
                >
                  Estado de pago
                </TableHead>
                <TableHead>Celular</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((client, i) => (
                <TableRow
                  key={client.id}
                  className={`${i % 2 !== 0 ? "bg-gray-50" : ""}`}
                >
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.cedula}</TableCell>
                  <TableCell>{formDate(client.date)}</TableCell>
                  <TableCell
                    className={`${
                      client.status === "Pagado"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {client.status}
                  </TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <TableButtons client={client} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
