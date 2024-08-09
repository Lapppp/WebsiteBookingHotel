export interface InvoiceDetail {
    id: number;
    unitPrice: number;
    serviceDate: Date;
    description: string;
    amount: number;
    quantity: number;
    discount: number;
    invoiceID: string;
}