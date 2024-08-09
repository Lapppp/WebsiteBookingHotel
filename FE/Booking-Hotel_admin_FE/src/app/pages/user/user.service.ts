import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Image, User } from "./user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "https://localhost:44347/api/Users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register-admin`, user);
  }

  updateUser(user: User): Observable<User> {
    const userId = user.id;
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  uploadPhoto(userId: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post<any>(`${this.apiUrl}/add/photo/${userId}`, formData);
  }

  deleteUserPhoto(userId: string, publicId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/delete-photo/${userId}/${publicId}`
    );
  }

  getUserImages(userId: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/${userId}/images`);
  }
}
