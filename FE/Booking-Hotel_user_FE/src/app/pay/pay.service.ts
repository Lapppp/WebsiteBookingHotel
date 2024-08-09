import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from "./promotion";

@Injectable({
  providedIn: 'root'
})
export class PayService {
  private apiUrl = 'https://localhost:44347/api/Payment';
  private PromotionsapiUrl = 'https://localhost:44347/api/Promotions';
  private PaymentapiUrl = 'https://localhost:44347/api/Payment';
  private BookingapiUrl = 'https://localhost:44347/api/Bookings';


  constructor(private http: HttpClient) {
  }

  getPromotionByHotelId(hotelId: number): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.PromotionsapiUrl}/GetPromotionsByHotelID/${hotelId}`);
  }
  getPayment(): Observable<any> {
    return this.http.get<any>(`${this.PaymentapiUrl}`);
  }
  addBooking(booking: any): Observable<any> {
    return this.http.post<any>(`${this.BookingapiUrl}`, booking);
  }
  getPromotionById(promotionId: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.PromotionsapiUrl}/${promotionId}`);
  }
  payVnpay(payment: any): Observable<any> {
    return this.http.post<any>(`${this.BookingapiUrl}/vnpay-payment`, payment);
  }

}
