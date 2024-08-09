import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RoomType } from "../room";

@Injectable({
  providedIn: "root",
})
export class RoomTypeService {
  private apiUrl = "https://localhost:44347/api/RoomTypes";

  constructor(private http: HttpClient) {}

  getRoomTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(this.apiUrl);
  }

  getRoomTypeById(id: number): Observable<RoomType> {
    return this.http.get<RoomType>(`${this.apiUrl}/${id}`);
  }

  addRoomType(roomType: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, roomType);
  }

  updateRoomType(roomType: RoomType): Observable<RoomType> {
    const roomTypeId = roomType.id;
    return this.http.put<RoomType>(`${this.apiUrl}/${roomTypeId}`, roomType);
  }

  deleteRoomType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
