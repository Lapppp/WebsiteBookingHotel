import { PromotionComponent } from "./promotion list/promotion.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AddPromotionComponent } from "./add promotion/addPromotion.component";
import { EditPromotionComponent } from "./edit promotion/editPromotion.component";
import { PromotionRoutes } from "./promotion.routing";

@NgModule({
  declarations: [PromotionComponent, AddPromotionComponent, EditPromotionComponent],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    RouterModule.forChild(PromotionRoutes),
    ModalModule.forRoot(),
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [PromotionComponent, AddPromotionComponent, EditPromotionComponent],
})
export class PromotionModule {}
