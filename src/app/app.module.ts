import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PoModule, PoListViewModule } from "@portinari/portinari-ui";
import { RouterModule } from "@angular/router";
import { MonitorComponent } from "./monitor/monitor.component";
import { ServerDetailsComponent } from "./server-details/server-details.component";
import { MonitorService } from "./services/servers.service";
import { ServersManagementComponent } from "./servers-management/servers-management.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    ServerDetailsComponent,
    ServersManagementComponent,
    ListViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    FormsModule,
    PoListViewModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [MonitorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
