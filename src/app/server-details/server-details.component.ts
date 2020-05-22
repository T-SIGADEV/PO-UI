import { Component, OnInit } from "@angular/core";
import { MonitorService } from "../services/servers.service";
import { PoProgressStatus } from "@portinari/portinari-ui";

@Component({
  selector: "app-server-details",
  templateUrl: "./server-details.component.html",
  styleUrls: ["./server-details.component.scss"],
})
export class ServerDetailsComponent implements OnInit {
  public servers = new Array<any>();
  public showTable = false;
  public showLoading = true;
  public statusProgress = PoProgressStatus.Default;
  constructor(private monitorService: MonitorService) {}

  ngOnInit() {
    this.getAsyncData();
  }

  async getAsyncData() {
    this.monitorService.getServers("ZZZ").subscribe((response) => {
      response.items.forEach((element) => {
        this.servers.push(element);
      });
      this.showTable = true;
      this.showLoading = false;
    });
  }
  public returnColor(memory: string): string {
    return "red";
  }
}
