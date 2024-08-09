import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Invoice } from "../model/invoice";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private apiUrl = "https://localhost:44347/api/Invoices";

  constructor(private http: HttpClient) {}

  getInvoicesByBookingId(bookingId: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/GetInvoices/${bookingId}`);
  }
}
