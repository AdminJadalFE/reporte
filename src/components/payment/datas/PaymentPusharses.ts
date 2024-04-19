import { Pusharse } from "../payment.interface";
import { getYears } from "../utils";

export const filterOptionsTablePusharse = [
  { value: "number", label: "Número documento" },
  { value: "name_supplier", label: "Nombre proveedor" },
  { value: "broadcast_date", label: "Fecha de emisión" },
];
export const filterOptionsPaymentMethod: {
  value: string;
  label: string;
}[] = [
  { value: "Efectivo", label: "Efectivo" },
  { value: "Tarjeta de crédito", label: "Tarjeta de crédito" },
  { value: "Tarjeta de débito", label: "Tarjeta de débito" },
  { value: "Transferencia", label: "Transferencia" },
  { value: "Factura a 30 días", label: "Factura a 30 días" },
  { value: "Tarjeta de crédito visa", label: "Tarjeta de crédito visa" },
  { value: "Yape", label: "Yape" },
  { value: "Plin", label: "Plin" },
];
export const years = getYears();
export const mounths: {
  value: string;
  label: string;
}[] = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];
