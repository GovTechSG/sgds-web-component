import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-icon",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Icon</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-icon name="placeholder" size="lg" aria-label="Icon"></sgds-icon>
      </div>
    </div>
  `,
})
export class IconPageComponent {}
