import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, mergeMap, of } from "rxjs";
import { SlideShow } from "./slideShow";

@Injectable({
  providedIn: "root",
})
export class SlideShowService {
  private apiUrl = "https://localhost:44347/api/Images";
  private hotelApiUrl = "https://localhost:44347/api/Hotels";
  private userApiUrl = "https://localhost:44347/api/Users";

  slidesShow: SlideShow[] = [];

  constructor(private http: HttpClient) {}

  getSlidesShow(): Observable<SlideShow[]> {
    return this.http.get<SlideShow[]>(this.apiUrl).pipe(
      mergeMap((slidesShow: SlideShow[]) => {
        const slideShowRequests = slidesShow.map((slideShow) => {
          const hotelRequest = slideShow.hotelID
            ? this.getHotelById(slideShow.hotelID).pipe(
                map((hotel) => {
                  slideShow.hotelName = hotel ? hotel.name : null;
                  return slideShow;
                })
              )
            : of(slideShow);

          const userRequest = slideShow.userID
            ? this.getUserById(slideShow.userID).pipe(
                map((user) => {
                  slideShow.userName = user ? user.userName : null;
                  return slideShow;
                })
              )
            : of(slideShow);

          return forkJoin([hotelRequest, userRequest]).pipe(
            map(() => slideShow)
          );
        });

        return forkJoin(slideShowRequests).pipe(
          map((slidesShow) => {
            this.slidesShow = slidesShow;
            return slidesShow;
          })
        );
      })
    );
  }

  getHotelById(hotelID: number): Observable<any> {
    return this.http.get<any>(`${this.hotelApiUrl}/${hotelID}`);
  }

  getUserById(userID: string): Observable<any> {
    return this.http.get<any>(`${this.userApiUrl}/${userID}`);
  }

  addSlideShow(files: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, files);
  }

  deleteSlideShow(publicImageID: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${publicImageID}`);
  }
}
