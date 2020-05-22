import { Component } from "@angular/core";

import { PoMenuItem } from "@portinari/portinari-ui";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    {
      label: "Monitor",
      link: "/monitor",
      icon: "po-icon-users",
      shortLabel: "Monitor",
    },
    {
      label: "Servers",
      link: "/servers",
      icon: "po-icon-server",
      shortLabel: "Servers",
    },
    {
      label: "Settings",
      link: "/management",
      icon: "po-icon-settings",
      shortLabel: "Settings",
    },
  ];
}
