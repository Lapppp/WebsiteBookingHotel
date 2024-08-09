import { Routes } from "@angular/router";
import { HotelComponent } from "./hotel list/hotel.component";
import { AddHotelComponent } from "./add hotel/addHotel.component";
import { EditHotelComponent } from "./edit hotel/editHotel.component";

export const HotelRoutes: Routes = [
  {
    path: "hotel",
    component: HotelComponent,
  },
  {
    path: "addHotel",
    component: AddHotelComponent,
  },
  {
    path: "editHotel/:id",
    component: EditHotelComponent,
  },
];
