import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-dropdown",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Dropdown</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-dropdown>
        <sgds-button slot="toggler" aria-label="Options menu">Options</sgds-button>
        <sgds-dropdown-item aria-label="View"><a href="#">View</a></sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Edit"><a href="#">Edit</a></sgds-dropdown-item>
        <sgds-dropdown-item aria-label="Delete"><a href="#">Delete</a></sgds-dropdown-item>
      </sgds-dropdown>
      </div>
    </div>
  `,
})
export class DropdownPageComponent {}
