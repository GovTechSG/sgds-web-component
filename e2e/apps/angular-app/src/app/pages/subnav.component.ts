import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-subnav",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Subnav</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-subnav>
        <sgds-subnav-item active><a href="/">Home</a></sgds-subnav-item>
        <sgds-subnav-item><a href="/about">About</a></sgds-subnav-item>
      </sgds-subnav>
      </div>
    </div>
  `,
})
export class SubnavPageComponent {}
