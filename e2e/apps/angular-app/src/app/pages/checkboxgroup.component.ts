import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-checkbox-group",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">CheckboxGroup</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-checkbox-group label="Select options">
        <sgds-checkbox value="a">Option A</sgds-checkbox>
        <sgds-checkbox value="b">Option B</sgds-checkbox>
      </sgds-checkbox-group>
      </div>
    </div>
  `,
})
export class CheckboxGroupPageComponent {}
