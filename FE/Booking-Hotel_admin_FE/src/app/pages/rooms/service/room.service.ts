import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Room, Amenity, RoomType } from "../room";

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

  rooms: Room[] = [];

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl).pipe(
      mergeMap((rooms: Room[]) => {
        const roomRequests = rooms.map((room) => this.loadRoomDetails(room));
        return forkJoin(roomRequests).pipe(
          map((rooms) => {
            this.rooms = rooms; // Lưu danh sách phòng vào thuộc tính rooms
            return rooms;
          })
        );
      })
    );
  }

  getRoomById(id: number): Observable<Room> {
    return this.http
      .get<Room>(`${this.apiUrl}/${id}`)
      .pipe(mergeMap((room) => this.loadRoomDetails(room)));
  }

  private loadRoomDetails(room: Room): Observable<Room> {
    const hotelRequest = this.getHotelById(room.hotelID).pipe(
      map((hotel) => {
        room.hotelName = hotel ? hotel.name : "";
        return room;
      })
    );

    const roomAmenityRequest = this.getRoomAmenitiesByRoomId(room.id).pipe(
      mergeMap((roomAmenities) => {
        const amenityRequests = roomAmenities.map((ra) =>
          this.getAmenityById(ra.amenityId).pipe(
            map((amenity) => {
              ra.amenity = amenity;
              return ra;
            })
          )
        );
        return forkJoin(amenityRequests).pipe(
          map((raDetails) => {
            room.amenities = raDetails.map((ra) => ra.amenity);
            return room;
          })
        );
      })
    );

    const roomRoomTypeRequest = this.getRoomRoomTypesByRoomId(room.id).pipe(
      mergeMap((roomRoomTypes) => {
        const roomTypeRequests = roomRoomTypes.map((rrt) =>
          this.getRoomTypeById(rrt.roomTypeId).pipe(
            map((roomType) => {
              rrt.roomType = roomType;
              return rrt;
            })
          )
        );
        return forkJoin(roomTypeRequests).pipe(
          map((rrtDetails) => {
            room.roomTypes = rrtDetails.map((rrt) => rrt.roomType);
            return room;
          })
        );
      })
    );

    return forkJoin([
      hotelRequest,
      roomAmenityRequest,
      roomRoomTypeRequest,
    ]).pipe(map(() => room));
  }

  getHotelById(hotelID: number): Observable<any> {
    return this.http.get<any>(`${this.hotelApiUrl}/${hotelID}`);
  }

  getRoomAmenitiesByRoomId(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.roomAmenityApiUrl}/${roomId}`);
  }

  getRoomRoomTypesByRoomId(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.roomRoomTypeApiUrl}/${roomId}`);
  }

  getAmenityById(amenityID: number): Observable<any> {
    return this.http.get<any>(`${this.amenityApiUrl}/${amenityID}`);
  }

  getRoomTypeById(roomTypeID: number): Observable<any> {
    return this.http.get<any>(`${this.roomTypeApiUrl}/${roomTypeID}`);
  }

  addRoom(room: Room): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, room);
  }

  updateRoom(room: Room): Observable<Room> {
    const roomId = room.id;
    return this.http.put<Room>(`${this.apiUrl}/${roomId}`, room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
