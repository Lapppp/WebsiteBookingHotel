import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = "https://localhost:44347/api/Reviews";

  constructor(private http: HttpClient) { }
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}`, review);
  }
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }
  getReviewbyHotelid(hotelid: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/ByHotel/${hotelid}`);
  }
}
