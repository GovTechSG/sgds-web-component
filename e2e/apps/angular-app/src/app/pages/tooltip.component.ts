import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-tooltip",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Tooltip</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-tooltip content="This is a tooltip" placement="top" trigger="hover focus">
        <sgds-icon name="info-circle" aria-label="Information" tabindex="0"></sgds-icon>
      </sgds-tooltip>
      </div>
    </div>
  `,
})
export class TooltipPageComponent {}
