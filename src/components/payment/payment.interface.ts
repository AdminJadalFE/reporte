export interface Product {
  productName: string;
  quantity: number;
  costo?: number;
}
export interface Pusharse {
  id: string;
  typeDocument: string;
  numberDocument: string;
  dateOfIssue: string;
  userName: string;
  expireDate: string;
  perception: string;
  totalAmount: number;
  fise: string;
  subTotal: number;
  igv: number;
  details: Product[];
  currency: string;
  supplier: string;
  rucSupplier: string;
  state: number;
}