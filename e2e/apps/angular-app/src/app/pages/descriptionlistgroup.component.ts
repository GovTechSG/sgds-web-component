import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-description-list-group",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">DescriptionListGroup</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-description-list-group>
        <span slot="title">Personal Information</span>
        <sgds-description-list>
          Name
          <span slot="data">John Doe</span>
        </sgds-description-list>
        <sgds-description-list>
          Email
          <span slot="data">john@example.com</span>
        </sgds-description-list>
        <sgds-description-list>
          Phone
          <span slot="data">+65 1234 5678</span>
        </sgds-description-list>
      </sgds-description-list-group>
      </div>
    </div>
  `,
})
export class DescriptionListGroupPageComponent {}
