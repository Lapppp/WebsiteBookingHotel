import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../user/user';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenKey: string = "auth-token";
  private apiUrl: string = "https://localhost:44347/api/Users";
  private jwtHelper = new JwtHelperService();
  private currentUser: any;
  private userKey: string = "current-user";
  private previousUrl: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}
  savePreviousUrl(url: string): void {
    this.previousUrl = url;
    localStorage.setItem('previousUrl', url);
  }
  getPreviousUrl(): string | null {
    return localStorage.getItem('previousUrl');
  }

  login(
    userName: string,
    password: string,
    rememberMe: boolean
  ): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { userName, password })
      .pipe(
        map((response) => {
          if (response.token) {
            const user: User = response.userDto;
            if (rememberMe) {
              localStorage.setItem(this.tokenKey, response.token);
              localStorage.setItem("rememberMe", "true");
              localStorage.setItem(this.userKey, JSON.stringify(user));
            } else {
              sessionStorage.setItem(this.tokenKey, response.token);
              localStorage.setItem("rememberMe", "false");
              sessionStorage.setItem(this.userKey, JSON.stringify(user));
            }
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.error("Login error", error);
          return of(false);
        })
      );
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getUserId(): string | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    localStorage.removeItem("currentUser");
    if (localStorage.getItem("rememberMe") === "true") {
      localStorage.setItem("rememberMe", "false");
    }
    this.router.navigate([""]);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  addUsers(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email?email=${email}`);
  }

  checkUserNameExists(userName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-username?userName=${userName}`);
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.tokenKey) ||
      sessionStorage.getItem(this.tokenKey)
    );
  }
}
