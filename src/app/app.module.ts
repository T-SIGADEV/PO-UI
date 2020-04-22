import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PoModule } from "@portinari/portinari-ui";
import { RouterModule } from "@angular/router";
import { MonitorComponent } from "./monitor/monitor.component";
import { ServerDetailsComponent } from "./server-details/server-details.component";
import { MonitorService } from "./services/servers.service";

@NgModule({
  declarations: [AppComponent, MonitorComponent, ServerDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    RouterModule.forRoot([]),
  ],
  providers: [MonitorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
