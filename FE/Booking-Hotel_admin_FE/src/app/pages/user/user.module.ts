import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModalModule } from "ngx-bootstrap/modal";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { UserRoutes } from "./user.routing";
import { UserComponent } from "./user list/user.component";
import { AddUserComponent } from "./add user/addUser.component";
import { EditUserComponent } from "./edit user/editUser.component";

@NgModule({
  declarations: [UserComponent, AddUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild(UserRoutes),
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
  exports: [UserComponent, AddUserComponent, EditUserComponent],
})
export class UserModule {}
