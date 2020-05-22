import { Component, OnInit, ViewChild } from "@angular/core";
import { MonitorService } from "../services/servers.service";
import {
  PoTableColumn,
  PoNotificationService,
  PoModalComponent,
} from "@portinari/portinari-ui";
import { IdsServers } from "../interfaces/servers";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-servers-management",
  templateUrl: "./servers-management.component.html",
  styleUrls: ["./servers-management.component.scss"],
})
export class ServersManagementComponent implements OnInit {
  public formulario: FormGroup;
  public servers = new Array<any>();
  public serversIds = new Array();
  public showTable = false;
  public showLoading = true;
  public message = "";

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(
    private monitorService: MonitorService,
    private formBuilder: FormBuilder,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.getAsyncData();
    this.createForm();
  }

  async getAsyncData() {
    this.servers = [];

    this.monitorService.listServers("ZZZ").subscribe((response) => {
      response.items.forEach((element) => {
        this.servers.push(element);
      });
    });
    this.changeValues();
  }

  onSubmit() {
    if (this.validForm()) {
      this.monitorService.createServers(this.formulario.value).subscribe();
      this.showMessage("Servidor cadastrado com sucesso", 1);
      this.formulario.reset();
    }
    this.refresh();
  }

  showMessage(message: string, type: number) {
    if (type === 1) {
      this.poNotification.success(message);
    } else {
      this.poNotification.error(message);
    }
  }

  validForm(): boolean {
    var isFormValid = true;
    if (this.formulario.controls.ip.value == null) {
      this.showMessage("Campo 'IP' é obrigatório", 2);
      isFormValid = false;
    } else if (this.formulario.controls.port.value == null) {
      this.showMessage("Campo 'Porta' é obrigatório", 2);
      isFormValid = false;
    } else if (this.formulario.controls.environment.value == null) {
      this.showMessage("Campo 'Ambiente' é obrigatório", 2);
      isFormValid = false;
    }

    return isFormValid;
  }

  changeValues() {
    this.showTable = true;
    this.showLoading = !this.showTable;
  }

  public getItems() {
    return this.servers;
  }

  public delete(row: any): void {
    this.serversIds.push(row.id);

    const payload: IdsServers = { idsServers: this.serversIds };

    this.monitorService.deleteServer(payload).subscribe((response) => {
      if (response.retorno == "Sucesso") {
        this.showMessage("Servidor excluído com sucesso", 1);
      }
    });

    this.refresh();
  }

  async refresh(): Promise<void> {
    await this.getAsyncData();
  }

  createForm() {
    this.formulario = this.formBuilder.group({
      ip: [null, [Validators.required, Validators.min(3), Validators.max(50)]],
      port: [
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
}
