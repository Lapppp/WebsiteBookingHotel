import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";

export const DashboardsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
    ],
  },
];
