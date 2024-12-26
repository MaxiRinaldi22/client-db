"use server";

import { readFileSync } from "fs";
import { ClientType } from "./types";

export async function getClients(): Promise<ClientType[]> {
  const db = readFileSync("db/clients.db");

  return JSON.parse(db.toString());
}
