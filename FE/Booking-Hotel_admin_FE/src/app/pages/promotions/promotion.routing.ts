import { Routes } from "@angular/router";
import { AddPromotionComponent } from "./add promotion/addPromotion.component";
import { EditPromotionComponent } from "./edit promotion/editPromotion.component";
import { PromotionComponent } from "./promotion list/promotion.component";

export const PromotionRoutes: Routes = [
  {
    path: "promotion",
    component: PromotionComponent,
  },
  {
    path: "addPromotion",
    component: AddPromotionComponent,
  },
  {
    path: "editPromotion/:id",
    component: EditPromotionComponent,
  },
];
