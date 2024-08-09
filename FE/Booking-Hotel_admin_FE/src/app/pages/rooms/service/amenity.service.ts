import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Amenity } from "../room";

@Injectable({
  providedIn: "root",
})
export class AmenityService {
  private apiUrl = "https://localhost:44347/api/Amenities";

  constructor(private http: HttpClient) {}

  getAmenities(): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(this.apiUrl);
  }

  getAmenityById(id: number): Observable<Amenity> {
    return this.http.get<Amenity>(`${this.apiUrl}/${id}`);
  }

  addAmenity(Amenity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, Amenity);
  }

  updateAmenity(Amenity: Amenity): Observable<Amenity> {
    const AmenityId = Amenity.id;
    return this.http.put<Amenity>(`${this.apiUrl}/${AmenityId}`, Amenity);
  }
}
