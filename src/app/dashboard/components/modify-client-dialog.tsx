"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ClientType } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handleModify } from "@/lib/modify";
import { useNotification } from "@/hooks/useNotification";
import { Notification } from "@/components/Notification";

export function ModifyClientDialog({ client }: { client: ClientType }) {
  const [open, setOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState<ClientType>({
    ...client,
    paymentHistory: client.paymentHistory || {},
  });
  const { isVisible, message, showNotification, hideNotification } =
    useNotification();

  const updateClientInfo = (
    key: keyof ClientType,
    value: ClientType[keyof ClientType]
  ) => {
    setClientInfo((prev) => {
      const updatedClient = { ...prev, [key]: value };
      if (key === "status") {
        const currentMonthYear = new Date().toLocaleString("default", {
          month: "2-digit",
          year: "numeric",
        });
        updatedClient.paymentHistory[currentMonthYear] =
          value === "Pagado" ? true : false;
      }
      return updatedClient;
    });
  };
  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleModify(clientInfo, false);
    setOpen(false);
    showNotification(`
      Cliente ${client.name} modificado correctamente
    `);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto" variant="outline" size="sm">
            Modificar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agrear un nuevo cliente</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleClientSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={clientInfo.name}
                onChange={(e) => updateClientInfo("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cedula">Cedula</Label>
              <Input
                id="cedula"
                type="text"
                value={clientInfo.cedula}
                onChange={(e) => updateClientInfo("cedula", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Fecha de ingreso</Label>
              <Input
                id="date"
                value={clientInfo.date}
                onChange={(e) => updateClientInfo("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <Input
                id="phone"
                value={clientInfo.phone}
                onChange={(e) => updateClientInfo("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Estado de pago</Label>
              <Select
                value={clientInfo.status}
                onValueChange={(value) => updateClientInfo("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pagado">Pagado</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Modify
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Notification
        message={message}
        isVisible={isVisible}
        onClose={hideNotification}
      />
    </>
  );
}
