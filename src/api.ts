import { readFileSync, writeFileSync } from "fs";
import { ClientType } from "./lib/types";

async function addClient(newClient: ClientType): Promise<void> {
  const db = JSON.parse(readFileSync("db/clients.db", "utf-8"));

  if (db.some((_client: ClientType) => _client.id === newClient.id)) {
    throw new Error("Client already added");
  }

  const draft = db.concat(newClient);
  writeFileSync("db/clients.db", JSON.stringify(draft, null, 2));
}

async function removeClient(clientId: string): Promise<void> {
  const db = JSON.parse(readFileSync("db/clients.db", "utf-8"));

  const updatedDb = db.filter((_client: ClientType) => _client.cedula !== clientId);

  if (updatedDb.length === db.length) {
    throw new Error("Client not found");
  }

  writeFileSync("db/clients.db", JSON.stringify(updatedDb, null, 2));
}

async function modifyClient(updatedClient: ClientType): Promise<void> {
  const db = JSON.parse(readFileSync("db/clients.db", "utf-8"));

  const clientIndex = db.findIndex(
    (_client: ClientType) => _client.cedula === updatedClient.cedula
  );
  if (clientIndex === -1) {
    throw new Error("Client not found");
  }

  db[clientIndex] = updatedClient;
  writeFileSync("db/clients.db", JSON.stringify(db, null, 2));
}

export { addClient, removeClient, modifyClient };
