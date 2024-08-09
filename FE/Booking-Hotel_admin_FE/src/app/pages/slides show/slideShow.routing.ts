import { Routes } from "@angular/router";
import { SlideShowComponent } from "./slideShow list/slideShow.component";
import { AddSlideShowComponent } from "./add slideShow/addSlideShow.component";

export const SlideShowRoutes: Routes = [
  {
    path: "slideShow",
    component: SlideShowComponent,
  },
  {
    path: "addSlideShow",
    component: AddSlideShowComponent,
  },
];
