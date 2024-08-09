import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import { LoginComponent } from "./login.component";

import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    // RouterModule.forChild(LoginRoutes),
    ModalModule.forRoot(),
    RouterLinkActive,
    RouterLink,
  ],

  exports: [LoginComponent],
})
export class LoginModule { }
