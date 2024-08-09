import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from './booking';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = "https://localhost:44347/api/Bookings";
  private userApiUrl = "https://localhost:44347/api/Users";
  private bookingHistoryApiUrl = "https://localhost:44347/api/BookingHistories";
  Bookings: Booking[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }


  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }
  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  addbookingHistory(bookingHistory: any): Observable<any> {
    return this.http.post<any>(`${this.bookingHistoryApiUrl}`, bookingHistory);
  }
  changstatusBooking(bookingid:string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookingid}`);
  }


}
