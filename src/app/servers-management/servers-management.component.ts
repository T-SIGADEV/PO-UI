import { Component, OnInit } from "@angular/core";
import { MonitorService } from "../services/servers.service";
import { PoTableColumn } from "@portinari/portinari-ui";
import { IdsServers } from "../interfaces/servers";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-servers-management",
  templateUrl: "./servers-management.component.html",
  styleUrls: ["./servers-management.component.scss"],
})
export class ServersManagementComponent implements OnInit {
  public formulario: FormGroup;
  public servers = new Array<any>();
  public showTable = false;
  public showLoading = true;
  public serversIds = new Array();
  constructor(
    private monitorService: MonitorService,
    private formBuilder: FormBuilder,
    private rotas: Router
  ) {}

  ngOnInit() {
    this.getAsyncData();

    this.formulario = this.formBuilder.group({
      ip: [null, [Validators.required, Validators.min(3), Validators.max(50)]],
      porta: [
        null,
        [Validators.required, Validators.min(3), Validators.max(10)],
      ],
      environment: [
        null,
        [Validators.required, Validators.min(3), Validators.max(50)],
      ],
      obs: [null, [Validators.min(3), Validators.max(50)]],
      listUsers: [null],
    });
  }

  async getAsyncData() {
    this.monitorService.listServers("ZZZ").subscribe((response) => {
      response.items.forEach((element) => {
        this.servers.push(element);
      });
      this.showTable = true;
      this.showLoading = !this.showTable;
    });
  }
  onSubmit() {
    this.monitorService.createServers(this.formulario.value).subscribe();
  }
  public getColumns(): Array<PoTableColumn> {
    return [
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
        property: "environment",
        type: "string",
        width: "20%",
        label: "Ambiente",
      },
      {
        property: "delete",
        label: "Ações",
        type: "icon",
        width: "10%",
        icons: [
          {
            action: this.delete.bind(this),
            color: "color-01",
            icon: "po-icon-delete",
            tooltip: "Deletar",
            value: "delete",
          },
        ],
      },
    ];
  }
  public getItems() {
    return this.servers;
  }
  public delete(row: any): void {
    this.serversIds.push(row.id);

    const payload: IdsServers = { idsServers: this.serversIds };

    this.monitorService.deleteServer(payload).subscribe((response) => {});
  }
  refresh(): void {
    this.rotas.navigate(["/management"]);
  }
}
