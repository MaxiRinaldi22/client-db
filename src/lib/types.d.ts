export type ClientType = {
  id?: string;
  name: string;
  cedula: string;
  date: string;
  status: "Pagado" | "Pendiente";
  phone: string;
  updateAt: string;
  paymentHistory: { [key: string]: boolean };
};
