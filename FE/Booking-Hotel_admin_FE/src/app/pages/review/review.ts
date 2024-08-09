export interface Review {
  id: number;
  title: string;
  rating: number;
  status: string;
  hotelID: number;
  hotelName?: string;
  userID: string;
  userName?: string;
}
