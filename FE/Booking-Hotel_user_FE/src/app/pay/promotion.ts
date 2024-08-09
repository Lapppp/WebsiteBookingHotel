import {User} from "../user/user";

export interface Promotion {
  Id: number;
  Title: string;
  Discount: number;
  CouponCode: string;
  StartDate: Date;
  EndDate: Date;
  Description: string;
  Status: string;
  HotelID: number;
  HotelName?: string;
  couponCode : string;
  discount : number;
  title: string;
  endDate: Date;
  startDate: Date;
  hotelID: number;
}

export interface Payment {
  id: number;
  userId: string;
  description: string;
  status: string;
  name: string;
  user: User;
}
