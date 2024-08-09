import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


// Swiper
import {SlickCarouselModule} from 'ngx-slick-carousel';

// Page Route
import {PagesRoutingModule} from './pages-routing.module';
import {SharedModule} from '../shared/shared.module';
import {BookingComponent} from "./booking/booking.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReviewComponent} from "./review/review.component";

import {SuccessPageComponent} from './success-page/success-page.component';

import {WishlistComponent} from "./wishlist/wishlist.component";

@NgModule({
  declarations: [
    BookingComponent,
    ReviewComponent,
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    SuccessPageComponent,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class PagesModule {
}
