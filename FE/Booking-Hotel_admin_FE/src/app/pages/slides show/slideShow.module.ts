import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { SlideShowRoutes } from "./slideShow.routing";
import { SlideShowComponent } from "./slideShow list/slideShow.component";
import { AddSlideShowComponent } from "./add slideShow/addSlideShow.component";

@NgModule({
  declarations: [SlideShowComponent, AddSlideShowComponent],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    RouterModule.forChild(SlideShowRoutes),
    ModalModule.forRoot(),
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [SlideShowComponent, AddSlideShowComponent],
})
export class SlideShowModule {}
