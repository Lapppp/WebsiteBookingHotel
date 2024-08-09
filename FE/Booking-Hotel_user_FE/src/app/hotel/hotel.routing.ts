import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { DetailComponent } from './detail/detail.component';
import {RoomComponent} from "./room/room.component";

const routes: Routes = [
  { path: '', component: HotelComponent },
  { path: 'room/:id', component: RoomComponent },
  {path: 'detail', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutes {}

