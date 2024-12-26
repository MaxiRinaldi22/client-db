"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getClients } from "@/lib/getClients";
import { ClientType } from "@/lib/types";

export default function ClientChart() {
  const [clients, setClients] = useState<ClientType[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await getClients();
        setClients(clientsData);
      } catch (e) {
        console.error("Failed to fetch clients", e);
      }
    };

    fetchClients();
  }, []);

  const data = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    clients: clients.filter((client) =>
      Object.keys(client.paymentHistory).some(
        (key) =>
          parseInt(key.split("/")[0], 10) - 1 === i &&
          client.paymentHistory[key] === true
      )
    ).length,
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-2lxl">Clientes por mes</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={{
            clients: {
              label: "Clients",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="clients" fill="#646464" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
