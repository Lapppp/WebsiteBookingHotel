import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, forkJoin, map, mergeMap } from "rxjs";
import { Booking } from "../model/booking";
import { BookingHistoryService } from "./bookingHistory.service";
import { InvoiceService } from "./invoice.service";
import { InvoiceDetailService } from "./invoiceDetail.service";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private apiUrl = "https://localhost:44347/api/Bookings";
  private userApiUrl = "https://localhost:44347/api/Users";

  Bookings: Booking[] = [];

  constructor(
    private http: HttpClient,
    private bookingHistoryService: BookingHistoryService,
    private invoiceService: InvoiceService,
    private invoiceDetailService: InvoiceDetailService
  ) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl).pipe(
      mergeMap((bookings: Booking[]) => {
        const BookingRequests = bookings.map((booking) => {
          const userRequest = this.getUserById(booking.userID).pipe(
            map((user) => {
              booking.userName = user ? user.userName : "";
              booking.email = user ? user.email : "";
              return booking;
            })
          );

          const bookingHistoryRequest = this.bookingHistoryService
            .getBookingHistoriesByBookingId(booking.id)
            .pipe(map((histories) => (booking.bookingHistories = histories)));

          const invoiceRequest = this.invoiceService
            .getInvoicesByBookingId(booking.id)
            .pipe(
              mergeMap((invoices) => {
                const invoiceDetailRequests = invoices.map((invoice) =>
                  this.invoiceDetailService
                    .getInvoiceDetailsByInvoiceId(invoice.id)
                    .pipe(map((details) => (invoice.invoiceDetails = details)))
                );

                return forkJoin(invoiceDetailRequests).pipe(
                  map(() => {
                    booking.invoices = invoices;
                    return booking;
                  })
                );
              })
            );

          return forkJoin([
            userRequest,
            bookingHistoryRequest,
            invoiceRequest,
          ]).pipe(map(() => booking));
        });

        return forkJoin(BookingRequests).pipe(
          map((Bookings) => {
            this.Bookings = Bookings;
            return Bookings;
          })
        );
      })
    );
  }

  getUserById(userID: string): Observable<any> {
    return this.http.get<any>(`${this.userApiUrl}/${userID}`);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`).pipe(
      mergeMap((booking) => {
        const userRequest = this.getUserById(booking.userID).pipe(
          map((user) => {
            booking.userName = user ? user.userName : "";
            return booking;
          })
        );

        const bookingHistoryRequest = this.bookingHistoryService
          .getBookingHistoriesByBookingId(booking.id)
          .pipe(map((histories) => (booking.bookingHistories = histories)));

        const invoiceRequest = this.invoiceService
          .getInvoicesByBookingId(booking.id)
          .pipe(
            mergeMap((invoices) => {
              const invoiceDetailRequests = invoices.map((invoice) =>
                this.invoiceDetailService
                  .getInvoiceDetailsByInvoiceId(invoice.id)
                  .pipe(map((details) => (invoice.invoiceDetails = details)))
              );

              return forkJoin(invoiceDetailRequests).pipe(
                map(() => {
                  booking.invoices = invoices;
                  return booking;
                })
              );
            })
          );

        return forkJoin([
          userRequest,
          bookingHistoryRequest,
          invoiceRequest,
        ]).pipe(map(() => booking));
      })
    );
  }

  addBooking(booking: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, booking);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    const BookingId = booking.id;
    return this.http.put<Booking>(`${this.apiUrl}/${BookingId}`, booking);
  }

  deleteBooking(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
 