import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-combo-box",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">ComboBox</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-combo-box scroll-bottom-offset="0" label="ComboBox" placeholder="Enter text..." autocomplete="on">
        <sgds-combo-box-option>
          ComboBoxOption content
        </sgds-combo-box-option>
      </sgds-combo-box>
      </div>
    </div>
  `,
})
export class ComboBoxPageComponent {}
