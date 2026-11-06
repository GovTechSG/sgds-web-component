import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-divider",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Divider</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-divider orientation="horizontal" thickness="thin"></sgds-divider>
      </div>
    </div>
  `,
})
export class DividerPageComponent {}
