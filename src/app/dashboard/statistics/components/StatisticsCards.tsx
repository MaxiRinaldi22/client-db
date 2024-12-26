import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientType } from "@/lib/types";

export default function StatisticsCards({
  clients,
}: {
  clients: ClientType[];
}) {
  const error = clients.length === 0 ? true : false;
  const totalClients = clients.length;
  const totalEarned = clients.length * 1300;
  const activeClients = clients.filter(
    (client) => client.status === "Pagado"
  ).length;

  return (
    <div className="grid h-[122px] gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle
            className={` tracking-0.04  ${
              !error ? "font-[400] text-xl" : "text-2xl"
            }`}
          >
            Clientes totales
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-xl font-[200]">
              No hay datos disponibles en este momento.
            </div>
          ) : (
            <div className="text-3xl font-bold">{totalClients}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle
            className={` tracking-0.04  ${
              !error ? "font-[400] text-xl" : "text-2xl"
            }`}
          >
            Total ganado
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-xl font-[200]">
              No hay datos disponibles en este momento.
            </div>
          ) : (
            <div className="text-3xl font-bold">
              ${totalEarned.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle
            className={` tracking-0.04  ${
              !error ? "font-[400] text-xl" : "text-2xl"
            }`}
          >
            Clientes activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-xl font-[200]">
              No hay datos disponibles en este momento.
            </div>
          ) : (
            <div className="text-3xl font-bold">{activeClients}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
