import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-image-card",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">ImageCard</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-image-card>
        <span slot="title">Image Card</span>
        <span slot="description">Description of the image card.</span>
      </sgds-image-card>
      </div>
    </div>
  `,
})
export class ImageCardPageComponent {}
