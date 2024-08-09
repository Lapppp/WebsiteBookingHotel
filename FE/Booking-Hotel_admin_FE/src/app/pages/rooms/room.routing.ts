import { Routes } from "@angular/router";
import { AddRoomComponent } from "./add room/addRoom.component";
import { EditRoomComponent } from "./edit room/editRoom.component";
import { RoomComponent } from "./room list/room.component";

export const RoomRoutes: Routes = [
  {
    path: "room",
    component: RoomComponent,
  },
  {
    path: "addRoom",
    component: AddRoomComponent,
  },
  {
    path: "editRoom/:id",
    component: EditRoomComponent,
  },
];
