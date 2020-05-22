import { Component, OnInit } from "@angular/core";
import { PoTableColumn, PoTableDetail } from "@portinari/portinari-ui";
import { MonitorService } from "../services/servers.service";

@Component({
  selector: "app-monitor",
  templateUrl: "./monitor.component.html",
  styleUrls: ["./monitor.component.scss"],
})
export class MonitorComponent implements OnInit {
  public servers = new Array<any>();
  public showTable = false;
  public showLoading = true;
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
  public getColumns(): Array<PoTableColumn> {
    var detailServer: PoTableDetail = {
      columns: [
        { property: "login", label: "Login" },
        { property: "computerName", label: "Estação" },
        { property: "function", label: "Programa" },
        { property: "time", label: "Tempo Conectado" },
      ],
      typeHeader: "top",
    };
    return [
      {
        property: "inactive",
        type: "label",
        width: "10%",
        label: "Status",
        labels: [
          {
            value: "false",
            color: "success",
            label: "Online",
          },
          {
            value: "true",
            color: "primary",
            label: "Offline",
          },
        ],
      },
      {
        property: "ip",
        type: "string",
        width: "20%",
        label: "IP",
      },
      {
        property: "port",
        type: "string",
        width: "20%",
        label: "Porta",
      },
      {
        property: "numberOfUsers",
        type: "string",
        width: "20%",
        label: "Usuários",
      },
      {
        property: "environment",
        type: "string",
        width: "20%",
        label: "Ambiente",
      },
      {
        property: "listOfUsers",
        label: "Usuários",
        type: "detail",
        detail: detailServer,
      },
    ];
  }
  public getItems() {
    return this.servers;
  }
}
