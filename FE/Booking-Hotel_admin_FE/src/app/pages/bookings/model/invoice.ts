import { InvoiceDetail } from "./invoiceDetail";

export interface Invoice {
  id: string;
  net: number;
  date: Date;
  total: number;
  tax: number;
  dueDate: Date;
  discount: number;
  currency: string;
  status: string;
  bookingID: string;
  invoiceDetails?: InvoiceDetail[];
}