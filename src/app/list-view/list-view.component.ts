import { Component, OnInit } from "@angular/core";
import { PoTableColumn } from "@portinari/portinari-ui";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
})
export class ListViewComponent implements OnInit {
  public items = new Array();
  public items2 = new Array();
  public items3 = new Array();
  constructor() {}

  ngOnInit() {
    this.items.push({
      code: 32,
      nome: "José Mauro",
      email: "josemaurodl@gmail.com",
    });
    this.items2.push({
      code: 12,
      nome: "José Mauro Dourado Lopes",
      email: "jota_mauro@hotmail.com",
    });
    this.items3.push({
      code: 23,
      nome: "Kati",
      email: "kati@hotmail.com",
    });
  }
  public getColumns(): Array<PoTableColumn> {
    return [
      {
        property: "nome",
        type: "string",
        width: "20%",
        label: "Nome",
      },
      {
        property: "email",
        type: "string",
        width: "20%",
        label: "Email",
      },
    ];
  }
}
