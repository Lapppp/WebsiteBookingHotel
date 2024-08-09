import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, forkJoin, of} from "rxjs";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = "https://localhost:44347/api/Comments";
  comments: Comment[] = [];

  constructor(private http: HttpClient) {
  }
  getComment(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }
  addcomment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}`, comment);
  }

  getCommentlById(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${id}`);
  }
  getCommentlBytHotelId(hotelid: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetCommentsByHotelID/${hotelid}`);
  }


}
