import {User} from "../../user/user";

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  bookedRooms: number;
  phoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  createdAt : string;
  totalPrice: number;
  note  : string;
  userID: string;
  numberPeople: number;
  userName: string;
  hotelId: number;
  couponCode: string;
  statusPayment: string;
  commission: number;
  moneyReceived: number;
  paymentId: number;
  roomId: number;
  discount : number;

}

export interface HistoryBooking {
  id?: number;
  status: string;
  bookingID: string;
}
export interface Promotion {
  id: number;
  title: string;
  discount: number;
  couponCode: string;
  startDate: Date;
  endDate: Date;
  Description: string;
  status: string;
  HotelID: number;
  HotelName?: string;

}
