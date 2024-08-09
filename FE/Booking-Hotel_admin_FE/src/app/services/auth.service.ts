import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenKey: string = "auth-token";
  private apiUrl: string = "https://localhost:44347/api/Users"; // Replace with your API URL
  private jwtHelper = new JwtHelperService();
  private currentUser: any;

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem("currentUser"));
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
            if (rememberMe) {
              localStorage.setItem(this.tokenKey, response.token);
              localStorage.setItem("rememberMe", "true");
            } else {
              sessionStorage.setItem(this.tokenKey, response.token);
              localStorage.setItem("rememberMe", "false");
            }
            // Tạo đối tượng người dùng
            const user = {
              userName: userName, // Thay thế bằng thông tin người dùng thực tế
              // Thêm các thông tin khác của người dùng nếu cần
            };
            localStorage.setItem("currentUser", JSON.stringify(user));
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

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    localStorage.removeItem("currentUser");
    if (localStorage.getItem("rememberMe") === "true") {
      localStorage.setItem("rememberMe", "false");
    }
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const user = this.jwtHelper.decodeToken(token);
    const userRole =
      user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return userRole === "Admin";
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.tokenKey) ||
      sessionStorage.getItem(this.tokenKey)
    );
  }
}
