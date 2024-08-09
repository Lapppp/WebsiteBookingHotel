import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InvoiceDetail } from "../model/invoiceDetail";

@Injectable({
  providedIn: "root",
})
export class InvoiceDetailService {
  private apiUrl = "https://localhost:44347/api/InvoiceDetail";

  constructor(private http: HttpClient) {}

  getInvoiceDetailsByInvoiceId(invoiceId: string): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(
      `${this.apiUrl}/GetInvoiceDetails/${invoiceId}`
    );
  }
}
