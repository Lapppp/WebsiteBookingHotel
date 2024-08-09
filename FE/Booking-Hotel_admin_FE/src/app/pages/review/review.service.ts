import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, mergeMap } from "rxjs";
import { Review } from "./review";
import { User } from "../user/user";

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  private apiUrl = "https://localhost:44347/api/Reviews";
  private hotelApiUrl = "https://localhost:44347/api/Hotels";
  private userApiUrl = "https://localhost:44347/api/Users";

  reviews: Review[] = [];

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      mergeMap((reviews: Review[]) => {
        const reviewRequests = reviews.map((review) => {
          const hotelRequest = this.getHotelById(review.hotelID).pipe(
            map((hotel) => {
              review.hotelName = hotel ? hotel.name : "";
              return review;
            })
          );
          const userRequest = this.getUserById(review.userID).pipe(
            map((user) => {
              review.userName = user ? user.userName : "";
              return review;
            })
          );

          return forkJoin([hotelRequest, userRequest]).pipe(map(() => review));
        });

        return forkJoin(reviewRequests).pipe(
          map((reviews) => {
            this.reviews = reviews;
            return reviews;
          })
        );
      })
    );
  }

  getHotelById(hotelID: number): Observable<any> {
    return this.http.get<any>(`${this.hotelApiUrl}/${hotelID}`);
  }

  getUserById(userID: string): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/${userID}`);
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
