import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { LoginRoutes } from "./login.routing";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    RouterModule.forChild(LoginRoutes),
    ModalModule.forRoot(),
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
