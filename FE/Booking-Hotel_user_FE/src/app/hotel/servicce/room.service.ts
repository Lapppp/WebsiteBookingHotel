import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, forkJoin} from "rxjs";
import {Room, RoomType, Amenity, Review} from '../room';
import {Hotel, Image} from "../../hotel/hotel";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  private apiUrl = "https://localhost:44347/api/Rooms";
  private hotelApiUrl = "https://localhost:44347/api/Hotels";
  private roomAmenityApiUrl = "https://localhost:44347/api/RoomAmenities";
  private roomRoomTypeApiUrl = "https://localhost:44347/api/RoomRoomTypes";
  private amenityApiUrl = "https://localhost:44347/api/Amenities";
  private roomTypeApiUrl = "https://localhost:44347/api/RoomTypes";
  private reviewApiUrl = "https://localhost:44347/api/Reviews";
  private roomByHotelID = "https://localhost:44347/api/Rooms/GetRoomsByHotelID";

  rooms: Room[] = [];

  constructor(private http: HttpClient) {
  }

  getRoomByHotelId(id: number): Observable<any> {
    return this.http.get<any>(`${this.roomByHotelID}/ ${id}`);
  }

  getRoomDetails(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/ ${id}`);
  }

  getRoomsByHotelId(hotelId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/GetRoomsByHotelID/${hotelId}`);
  }

  getRoomTypesByIds(roomTypeIds: number[]): Observable<RoomType[]> {
    const observables = roomTypeIds.map(id => this.http.get<RoomType>(`${this.roomTypeApiUrl}/${id}`));
    return forkJoin(observables);
  }

  getAmenityById(amenityId: number): Observable<Amenity> {
    return this.http.get<Amenity>(`${this.amenityApiUrl}/${amenityId}`);
  }

  getAmenitiesByIds(amenityIds: number[]): Observable<Amenity[]> {
    const observables = amenityIds.map(id => this.getAmenityById(id));
    return forkJoin(observables);
  }

  getAmenitiesByRoomId(roomId: number): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.roomAmenityApiUrl}/byRoom/${roomId}`);
  }

  getRoomAmenitiesByRoomId(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.roomAmenityApiUrl}/${roomId}`);
  }

  getRoomTypeById(roomTypeID: number): Observable<any> {
    return this.http.get<any>(`${this.roomTypeApiUrl}/${roomTypeID}`);
  }

  getRoomRoomTypesByRoomId(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.roomRoomTypeApiUrl}/${roomId}`);
  }

  getHotelImages(hotelId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.hotelApiUrl}/${hotelId}/images`);
  }


  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }
getRoomTypeByRoomId(roomId: number): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(`${this.roomRoomTypeApiUrl}/room/${roomId}`);

}

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }
}
