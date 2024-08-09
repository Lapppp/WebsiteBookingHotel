import { Routes } from "@angular/router";
import { EditBookingComponent } from "./edit booking/editBooking.component";
import { BookingComponent } from "./booking list/booking.component";

export const BookingRoutes: Routes = [
  {
    path: "",
    component: BookingComponent,
  },
  {
    path: "editBooking/:id",
    component: EditBookingComponent,
  },
];
