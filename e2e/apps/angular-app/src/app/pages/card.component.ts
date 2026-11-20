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
        <sgds-card image-position="before" image-adjustment="default" orientation="vertical">
        <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
        <span slot="title">Card</span>
        <span slot="description">Description of the card.</span>
        <span slot="footer">Footer content</span>
        Card
      </sgds-card>
      </div>
    </div>
  `,
})
export class CardPageComponent {}
