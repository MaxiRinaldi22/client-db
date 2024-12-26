"use server";

import { modifyClient } from "@/api";
import { ClientType } from "./types";

export const handleModify = async (
  clientInfo: ClientType,
  isFirst: boolean
) => {
  try {
    if (isFirst) {
      await modifyClient(clientInfo);
    } else {
      await modifyClient({ ...clientInfo, updateAt: new Date().toISOString() });
    }
  } catch (error) {
    console.error(
      "Error al modificar el cliente:",
      error instanceof Error ? error.message : String(error)
    );
  }
};
