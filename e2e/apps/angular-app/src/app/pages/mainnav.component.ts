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
        <sgds-mainnav expand="lg">
        <strong slot="brand">Mainnav</strong>
        <sgds-mainnav-dropdown aria-label="MainnavDropdown">
          MainnavDropdown content
        </sgds-mainnav-dropdown>
        <sgds-mainnav-item>
          MainnavItem content
        </sgds-mainnav-item>
        <sgds-mainnav-profile label="MainnavProfile" aria-label="MainnavProfile" close="default">
          MainnavProfile content
        </sgds-mainnav-profile>
      </sgds-mainnav>
      </div>
    </div>
  `,
})
export class MainnavPageComponent {}
