import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";
@Injectable({
  providedIn: 'root'
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
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user)
  }
}
