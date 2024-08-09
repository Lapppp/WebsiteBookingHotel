import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelComponent } from './hotel/hotel.component';
import { HotelRoutes } from './hotel.routing';
import { RouterModule } from '@angular/router';
import {DetailComponent} from "./detail/detail.component";
import {RoomComponent} from "./room/room.component";
import {SharedModule} from "../shared/shared.module";
import {Comment} from "../comment/comment";
import {CommentComponent} from "../comment/comment.component";
import {CommentModule} from "../comment/comment.module";
import {NgbCarousel} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    HotelComponent,
    DetailComponent,
    RoomComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HotelRoutes,
    RouterModule,
    SharedModule,
    CommentModule,
    NgbCarousel,
    // CommentComponent
  ],
exports: [
  HotelComponent,
  DetailComponent,
  RoomComponent,


]

})
export class HotelModule { }
