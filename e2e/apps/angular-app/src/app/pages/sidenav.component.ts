import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-sidenav",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Sidenav</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-sidenav>
        <sgds-sidenav-item active aria-label="Getting Started">
          <span slot="title">Getting Started</span>
          <sgds-sidenav-link active><a href="/">Overview</a></sgds-sidenav-link>
          <sgds-sidenav-link><a href="/install">Installation</a></sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav>
      </div>
    </div>
  `,
})
export class SidenavPageComponent {}
