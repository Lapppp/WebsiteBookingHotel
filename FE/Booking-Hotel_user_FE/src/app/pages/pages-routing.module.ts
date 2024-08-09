import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component

import {BookingComponent} from "./booking/booking.component";
import {ReviewComponent} from "./review/review.component";
import {ModalthanhcongComponent} from "./modalthanhcong/modalthanhcong.component";
import {SuccessPageComponent} from "./success-page/success-page.component";
import {WishlistComponent} from "./wishlist/wishlist.component";

const routes: Routes = [

  {
    path:'booking',
    component:BookingComponent
  },
  {
    path:'review',
    component:ReviewComponent
  },
  {
    path:'lap',
    component:ModalthanhcongComponent
  },
  {
    path:'success',
    component:SuccessPageComponent
  },
  {
    path:'wishlist',
    component:WishlistComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
