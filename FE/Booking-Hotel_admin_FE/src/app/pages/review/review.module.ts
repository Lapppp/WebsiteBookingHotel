import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ReviewComponent } from "./review list/review.component";
import { ReviewRoutes } from "./review.routing";

@NgModule({
  declarations: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    RouterModule.forChild(ReviewRoutes),
    ModalModule.forRoot(),
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [ReviewComponent],
})
export class ReviewModule {}
