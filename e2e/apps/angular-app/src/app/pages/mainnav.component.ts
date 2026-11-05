import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-mainnav",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Mainnav</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-mainnav>
        <strong slot="brand">My App</strong>
        <sgds-mainnav-item><a href="/">Home</a></sgds-mainnav-item>
        <sgds-mainnav-item><a href="/about">About</a></sgds-mainnav-item>
      </sgds-mainnav>
      </div>
    </div>
  `,
})
export class MainnavPageComponent {}
