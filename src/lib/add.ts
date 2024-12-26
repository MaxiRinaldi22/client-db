"use server";

import { addClient } from "@/api";
import { ClientType } from "./types";

export const handleSubmit = async (clientInfo: ClientType) => {
  try {
    await addClient({
      id: crypto.randomUUID(),
      ...clientInfo,
      updateAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "Error al agregar el cliente:",
      error instanceof Error ? error.message : String(error)
    );
    alert("Hubo un error al agregar el cliente, por favor intenta de nuevo.");
  }
};
