import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Comment } from "./comment";
import { User } from "../user/user";
import { Hotel } from "../hotel/hotel";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private apiUrl = "https://localhost:44347/api/Comments";
  private hotelApiUrl = "https://localhost:44347/api/Hotels";
  private userApiUrl = "https://localhost:44347/api/Users";

  comments: Comment[] = [];

  constructor(private http: HttpClient) {}

  getComments(hotelID: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.apiUrl}/GetCommentByHotelID/${hotelID}`)
      .pipe(
        mergeMap((comments: Comment[]) => {
          const validComments = comments.filter(
            (comment) => comment.HotelID != null
          );

          const commentRequests = validComments.map((comment) => {
            const hotelRequest = this.getHotelById(comment.HotelID).pipe(
              map((hotel) => {
                comment.hotelName = hotel ? hotel.name : "Unknown Hotel";
                return comment;
              }),
              catchError((error) => {
                console.error(`Error fetching hotel: ${error}`);
                comment.hotelName = "Unknown Hotel";
                return of(comment);
              })
            );

            const userRequest = this.getUserById(comment.UserID).pipe(
              map((user) => {
                comment.userName = user ? user.userName : "Unknown User";
                return comment;
              }),
              catchError((error) => {
                console.error(`Error fetching user: ${error}`);
                comment.userName = "Unknown User";
                return of(comment);
              })
            );

            const childCommentRequests = comment.ChildComments.map(
              (childComment) => {
                childComment.ParentCommentID = comment.Id; // Gắn ID của comment cha vào mỗi `ChildComment`

                return forkJoin([
                  this.getHotelById(childComment.HotelID).pipe(
                    map((hotel) => {
                      childComment.hotelName = hotel
                        ? hotel.name
                        : "Unknown Hotel";
                      return childComment;
                    }),
                    catchError((error) => {
                      console.error(
                        `Error fetching hotel for child comment: ${error}`
                      );
                      childComment.hotelName = "Unknown Hotel";
                      return of(childComment);
                    })
                  ),
                  this.getUserById(childComment.UserID).pipe(
                    map((user) => {
                      childComment.userName = user
                        ? user.userName
                        : "Unknown User";
                      return childComment;
                    }),
                    catchError((error) => {
                      console.error(
                        `Error fetching user for child comment: ${error}`
                      );
                      childComment.userName = "Unknown User";
                      return of(childComment);
                    })
                  ),
                ]).pipe(map(() => childComment));
              }
            );

            return forkJoin([
              hotelRequest,
              userRequest,
              ...childCommentRequests,
            ]).pipe(map(() => comment));
          });

          return forkJoin(commentRequests).pipe(
            map((comments) => {
              this.comments = comments;
              return comments;
            })
          );
        })
      );
  }

  getHotelById(hotelID: number): Observable<Hotel> {
    if (!hotelID) {
      throw new Error("Invalid hotelID");
    }
    return this.http.get<Hotel>(`${this.hotelApiUrl}/${hotelID}`).pipe(
      catchError((error) => {
        console.error(`Error fetching hotel by ID: ${error}`);
        return of(null);
      })
    );
  }

  getUserById(userID: string): Observable<User> {
    if (!userID) {
      throw new Error("Invalid userID");
    }
    return this.http.get<User>(`${this.userApiUrl}/${userID}`).pipe(
      catchError((error) => {
        console.error(`Error fetching user by ID: ${error}`);
        return of(null);
      })
    );
  }

  getCommentById(id: number): Observable<Comment> {
    if (!id) {
      throw new Error("Invalid comment ID");
    }
    return this.http.get<Comment>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching comment by ID: ${error}`);
        return of(null);
      })
    );
  }

  deleteComment(id: number): Observable<any> {
    if (!id) {
      throw new Error("Invalid comment ID");
    }
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting comment by ID: ${error}`);
        return of(null);
      })
    );
  }
}
