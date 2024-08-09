export interface Review {
  id?: number; // Optional if generated on the server-side
  title: string;
  rating: number;
  status?: string; // Optional
  hotelId: number;
  bookingId: string;
  createdAt: string;
  userID: string;
}
