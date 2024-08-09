import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../components/components.module";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { RouterModule } from "@angular/router";
import { DashboardsRoutes } from "./dashboards.routing";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(DashboardsRoutes),
  ],
})
export class DashboardsModule {}
