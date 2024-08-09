import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Hotel, Image} from "../hotel";

@Injectable({
  providedIn: "root",
})
export class HotelService {
  private apiUrl = "https://localhost:44347/api/Hotels";
  private wishlistApiUrl = "https://localhost:44347/api/Wishlists";

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }
  getHotelImages(hotelId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/${hotelId}/images`);
  }
  getHotelWishlist(hotelId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.wishlistApiUrl}/${hotelId}`);
  }
  addToWishlist(wishlist:any): Observable<any> {
    return this.http.post<any>(`${this.wishlistApiUrl}`, wishlist);
  }
  getWishlistByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.wishlistApiUrl}/user/${userId}`)
  }
  deleteFromWishlist(wishlistId: number): Observable<any> {
    return this.http.delete<any>(`${this.wishlistApiUrl}/${wishlistId}`);
  }
}
