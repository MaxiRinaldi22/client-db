import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ClientType } from "@/lib/types";
import { ModifyClientDialog } from "./modify-client-dialog";
import { handleRemove } from "@/lib/remove";
import { useNotification } from "@/hooks/useNotification";
import { Notification } from "@/components/Notification";

export function TableButtons({ client }: { client: ClientType }) {
  const { isVisible, message, showNotification, hideNotification } =
    useNotification();

  const handleAlertRemove = async (client: ClientType) => {
    await handleRemove(client);
    showNotification(`
      Cliente ${client.name} eliminado correctamente
    `);
  };

  function formatMonthYear(monthYear: string) {
    const [month, year] = monthYear.split('/');
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  }

  return (
    <>
      <div className="flex space-x-2 justify-end">
        <ModifyClientDialog client={client} />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Historial de pagos
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Historial de pagos para {client.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <ul>
                {Object.entries(client.paymentHistory).map(
                  ([monthYear, status]) => (
                    <li key={monthYear} className="flex items-center gap-1">
                      {formatMonthYear(monthYear)}:
                      <span className={`${status ? "text-green-500" : "text-red-500"} font-semibold`}>
                        
                        {status ? "Pagado" : "Por pagar"}
                        </span> 
                    </li>
                  )
                )}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleAlertRemove(client)}
        >
          Eliminar
        </Button>
      </div>
      <Notification
        message={message}
        isVisible={isVisible}
        onClose={hideNotification}
      />
    </>
  );
}
