"use client";

import { Suspense, useEffect, useState } from "react";
import StatisticsCards from "./components/StatisticsCards";
import ClientChart from "./components/ClientChart";
import RecentClients from "./components/RecentClients";
import {
  StatisticsCardsSkeleton,
  ClientChartSkeleton,
  RecentClientsSkeleton,
} from "./components/Skeletons";
import { ClientType } from "@/lib/types";
import { getClients } from "@/lib/getClients";

export default function StatisticsPage() {
  const [clients, setClients] = useState<ClientType[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await getClients();

        setClients(clientsData);
      } catch {
        console.error("Failed to fetch clients");
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-4 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Estadisticas
      </h1>
      <Suspense fallback={<StatisticsCardsSkeleton />}>
        <StatisticsCards clients={clients} />
      </Suspense>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden mt-6">
        <div className="lg:col-span-2 overflow-hidden">
          <Suspense fallback={<ClientChartSkeleton />}>
            <ClientChart />
          </Suspense>
        </div>
        <div className="overflow-hidden">
          <Suspense fallback={<RecentClientsSkeleton />}>
            <RecentClients clientes={clients}/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
