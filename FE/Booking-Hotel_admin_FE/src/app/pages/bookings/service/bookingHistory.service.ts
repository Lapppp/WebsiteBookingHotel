import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BookingHistory } from "../model/bookingHistories";

@Injectable({
  providedIn: "root",
})
export class BookingHistoryService {
  private apiUrl = "https://localhost:44347/api/BookingHistories";

  constructor(private http: HttpClient) {}

  getBookingHistoriesByBookingId(
    bookingId: string
  ): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(
      `${this.apiUrl}/GetBookingHistories/${bookingId}`
    );
  }
}
