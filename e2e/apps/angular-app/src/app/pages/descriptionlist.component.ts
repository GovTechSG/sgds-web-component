import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-description-list",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">DescriptionList</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-description-list-group bordered>
        <sgds-description-list>Name<span slot="data">John Doe</span></sgds-description-list>
        <sgds-description-list>Email<span slot="data">john@example.com</span></sgds-description-list>
      </sgds-description-list-group>
      </div>
    </div>
  `,
})
export class DescriptionListPageComponent {}
