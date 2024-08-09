// dashboard.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private totalBookingsApiUrl = "https://localhost:44347/api/Bookings/total"; // Total bookings API endpoint
  private bookingsByStatusApiUrl =
    "https://localhost:44347/api/Bookings/status"; // Bookings by status API endpoint
  private totalInvoicedApiUrl =
    "https://localhost:44347/api/Invoices/GetTotalInvoiced"; // Total invoiced amount API endpoint
  private totalReviewsApiUrl =
    "https://localhost:44347/api/Reviews/total-reviews"; // Total reviews API endpoint
  private averageRatingApiUrl =
    "https://localhost:44347/api/Reviews/average-rating"; // Average rating API endpoint
  private activeUsersApiUrl = "https://localhost:44347/api/Users/active-users"; // Active users API endpoint

  constructor(private http: HttpClient) {}

  getTotalBookings(): Observable<number> {
    return this.http.get<number>(this.totalBookingsApiUrl);
  }

  getBookingsByStatus(status: string): Observable<number> {
    const url = `${this.bookingsByStatusApiUrl}/${status}`;
    return this.http.get<number>(url);
  }

  getTotalInvoiced(): Observable<{ [key: string]: number }> {
    const url = `${this.totalInvoicedApiUrl}`;
    return this.http.get<{ [key: string]: number }>(url);
  }

  getTotalReviews(): Observable<number> {
    return this.http.get<number>(this.totalReviewsApiUrl);
  }

  getAverageRating(): Observable<{
    averageRating: number;
    ratingsWithTitles: { title: string; rating: number }[];
  }> {
    return this.http.get<{
      averageRating: number;
      ratingsWithTitles: { title: string; rating: number }[];
    }>(this.averageRatingApiUrl);
  }

  getActiveUsers(): Observable<number> {
    return this.http.get<number>(this.activeUsersApiUrl);
  }
}
