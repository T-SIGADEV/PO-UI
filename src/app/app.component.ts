import { Component } from "@angular/core";

import { PoMenuItem } from "@portinari/portinari-ui";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    { label: "Monitor", link: "/monitor" },
    { label: "Servers", link: "/servers" },
  ];
}
