import { BookingHistory } from "./bookingHistories";
import { Invoice } from "./invoice";

export interface Booking {
  id: string;
  checkInDate: Date;
  checkOutDate: Date;
  bookedRooms: number;
  status: string;
  userID: string;
  userName?: string;
  email?: string;
  bookingHistories?: BookingHistory[];
  invoices?: Invoice[];
}
