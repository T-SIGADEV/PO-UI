import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MonitorComponent } from "./monitor/monitor.component";
import { ServerDetailsComponent } from "./server-details/server-details.component";

const routes: Routes = [
  { path: "monitor", component: MonitorComponent },
  { path: "servers", component: ServerDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
