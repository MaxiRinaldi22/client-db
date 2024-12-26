import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formDate } from "@/lib/dateFormatter";

import { ClientType } from "@/lib/types";

export default function RecentClients({
  clientes,
}: {
  clientes: ClientType[];
}) {
  const recentClients = clientes
    .sort(
      (a, b) => new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime()
    )
    .slice(0, 10);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl">Ultimos clientes</CardTitle>
      </CardHeader>
      <CardContent>
        {clientes.length === 0 ? (
          <div className="text-2xl font-[200]">
            No hay datos disponibles en este momento.
          </div>
        ) : (
          <ul className="space-y-3">
            {recentClients.map((client) => (
              <li key={client.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">
                    {formDate(client.date)}
                  </p>
                </div>
                <span
                  className={`${
                    client.status === "Pagado"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-semibold`}
                >
                  {client.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
