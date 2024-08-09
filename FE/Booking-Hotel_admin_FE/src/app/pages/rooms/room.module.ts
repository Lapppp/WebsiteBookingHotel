import { RoomComponent } from './room list/room.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AddRoomComponent } from "./add room/addRoom.component";
import { EditRoomComponent } from "./edit room/editRoom.component";
import { RoomRoutes } from "./room.routing";

@NgModule({
  declarations: [RoomComponent, AddRoomComponent, EditRoomComponent],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    RouterModule.forChild(RoomRoutes),
    ModalModule.forRoot(),
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [RoomComponent, AddRoomComponent, EditRoomComponent],
})
export class RoomModule {}
