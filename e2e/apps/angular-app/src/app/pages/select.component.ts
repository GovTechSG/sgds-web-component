import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-select",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Select</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-select label="Select country" placeholder="Choose...">
        <sgds-select-option value="sg">Singapore</sgds-select-option>
        <sgds-select-option value="us">United States</sgds-select-option>
        <sgds-select-option value="uk">United Kingdom</sgds-select-option>
      </sgds-select>
      </div>
    </div>
  `,
})
export class SelectPageComponent {}
