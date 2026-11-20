import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-input",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Input</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-input type="text" placeholder="placeholder" autocomplete="on" label="Input">
        <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
      </sgds-input>
      </div>
    </div>
  `,
})
export class InputPageComponent {}
