import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { HotelComponent } from "./hotel list/hotel.component";
import { HotelRoutes } from "./hotel.routing";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { EditHotelComponent } from "./edit hotel/editHotel.component";
import { AddHotelComponent } from "./add hotel/addHotel.component";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [HotelComponent, EditHotelComponent, AddHotelComponent],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    RouterModule.forChild(HotelRoutes),
    ModalModule.forRoot(),
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [HotelComponent, EditHotelComponent, AddHotelComponent],
})
export class HotelModule {}
