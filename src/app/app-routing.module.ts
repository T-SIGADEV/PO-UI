import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MonitorComponent } from "./monitor/monitor.component";
import { ServerDetailsComponent } from "./server-details/server-details.component";
import { ServersManagementComponent } from "./servers-management/servers-management.component";
import { ListViewComponent } from "./list-view/list-view.component";

const routes: Routes = [
  { path: "monitor", component: MonitorComponent },
  { path: "", component: ListViewComponent },
  { path: "servers", component: ServerDetailsComponent },
  { path: "management", component: ServersManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
