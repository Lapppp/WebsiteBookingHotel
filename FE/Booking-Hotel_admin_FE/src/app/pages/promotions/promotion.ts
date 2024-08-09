export interface Promotion {
  id: number;
  title: string;
  discount: number;
  couponCode: string;
  startDate: Date;
  endDate: Date;
  description: string;
  status: string;
  hotelID: number;
  hotelName?: string;
}
