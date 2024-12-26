"use server";

import { removeClient } from "@/api";
import { ClientType } from "./types";

export const handleRemove = async (clientInfo: ClientType) => {
  try {
    await removeClient(clientInfo.cedula);
  } catch (error) {
    console.error(
      "Error al eliminar el cliente:",
      error instanceof Error ? error.message : String(error)
    );
  }
};
