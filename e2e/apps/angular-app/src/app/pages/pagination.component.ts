import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-pagination",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Pagination</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-pagination data-length="0" current-page="1" items-per-page="5" variant="default" navigation="icon-button" size="md"></sgds-pagination>
      </div>
    </div>
  `,
})
export class PaginationPageComponent {}
