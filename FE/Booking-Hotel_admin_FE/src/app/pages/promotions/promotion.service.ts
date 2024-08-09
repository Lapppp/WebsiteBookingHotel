import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, mergeMap } from "rxjs";
import { Promotion } from "./promotion";

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  private apiUrl = "https://localhost:44347/api/Promotions";
  private hotelApiUrl = "https://localhost:44347/api/Hotels";

  promotions: Promotion[] = [];

  constructor(private http: HttpClient) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.apiUrl).pipe(
      mergeMap((promotions: Promotion[]) => {
        const promotionRequests = promotions.map((promotion) => {
          const hotelRequest = this.getHotelById(promotion.hotelID).pipe(
            map((hotel) => {
              promotion.hotelName = hotel ? hotel.name : "";
              return promotion;
            })
          );

          return forkJoin([hotelRequest]).pipe(map(() => promotion));
        });

        return forkJoin(promotionRequests).pipe(
          map((promotions) => {
            this.promotions = promotions;
            return promotions;
          })
        );
      })
    );
  }

  getHotelById(hotelID: number): Observable<any> {
    return this.http.get<any>(`${this.hotelApiUrl}/${hotelID}`);
  }

  getPromotionById(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.apiUrl}/${id}`);
  }

  addPromotion(Promotion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, Promotion);
  }

  updatePromotion(Promotion: Promotion): Observable<Promotion> {
    const PromotionId = Promotion.id;
    return this.http.put<Promotion>(`${this.apiUrl}/${PromotionId}`, Promotion);
  }

  deletePromotion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
