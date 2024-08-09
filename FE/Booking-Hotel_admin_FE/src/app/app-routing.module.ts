import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { adminGuard } from "./guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: "dashboards",
        loadChildren: () =>
          import("./pages/dashboards/dashboards.module").then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "hotels",
        loadChildren: () =>
          import("./pages/hotel/hotel.module").then((m) => m.HotelModule),
      },
      {
        path: "rooms",
        loadChildren: () =>
          import("./pages/rooms/room.module").then((m) => m.RoomModule),
      },
      {
        path: "promotions",
        loadChildren: () =>
          import("./pages/promotions/promotion.module").then(
            (m) => m.PromotionModule
          ),
      },
      {
        path: "reviews",
        loadChildren: () =>
          import("./pages/review/review.module").then((m) => m.ReviewModule),
      },
      {
        path: "comments",
        loadChildren: () =>
          import("./pages/comments/comment.module").then(
            (m) => m.CommentModule
          ),
      },
      {
        path: "bookings",
        loadChildren: () =>
          import("./pages/bookings/booking.module").then(
            (m) => m.BookingModule
          ),
      },
      {
        path: "slidesShow",
        loadChildren: () =>
          import("./pages/slides show/slideShow.module").then(
            (m) => m.SlideShowModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        loadChildren: () =>
          import("./pages/login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "examples",
        loadChildren: () =>
          import("./layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
