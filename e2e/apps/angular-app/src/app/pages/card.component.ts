import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-card",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Card</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-card>
        <span slot="title">Card Title</span>
        <span slot="description">This is a description of the card content.</span>
        <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
      </sgds-card>
      </div>
    </div>
  `,
})
export class CardPageComponent {}
