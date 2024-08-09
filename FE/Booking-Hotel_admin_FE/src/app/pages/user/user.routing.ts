import { Routes } from "@angular/router";

import { UserComponent } from "./user list/user.component";
import { AddUserComponent } from "./add user/addUser.component";
import { EditUserComponent } from "./edit user/editUser.component";

export const UserRoutes: Routes = [
  {
    path: "user",
    component: UserComponent,
  },
  {
    path: "addUser",
    component: AddUserComponent,
  },
  {
    path: "editUser/:id",
    component: EditUserComponent,
  },
];
