import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hotel, Image } from "./hotel";

@Injectable({
  providedIn: "root",
})
export class HotelService {
  private apiUrl = "https://localhost:44347/api/Hotels";

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  getHotelByName(name: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/byname/${name}`);
  }

  addHotel(hotel: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, hotel);
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    const hotelId = hotel.id;
    return this.http.put<Hotel>(`${this.apiUrl}/${hotelId}`, hotel);
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  uploadPhoto(hotelId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post<any>(`${this.apiUrl}/add/photo/${hotelId}`, formData);
  }

  deleteHotelPhoto(hotelId: number, publicId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/delete-photo/${hotelId}/${publicId}`
    );
  }

  getHotelImages(hotelId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/${hotelId}/images`);
  }
}
