import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SidebarLayoutComponent } from "./sidebar-layout.component";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SidebarLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<app-sidebar-layout></app-sidebar-layout>`,
})
export class AppComponent {
  constructor(private router: Router) {
    // Update sidebar active state on navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const sidebar = document.querySelector("sgds-sidebar") as any;
        if (sidebar) {
          sidebar.active = event.urlAfterRedirects.replace("/", "") || "accordion";
        }
      }
    });
  }
}
