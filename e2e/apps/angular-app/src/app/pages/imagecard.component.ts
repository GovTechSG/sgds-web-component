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
        <sgds-image-card orientation="vertical">
        <img slot="image" alt="placeholder" width="80" height="80" src="https://placehold.co/400x300" />
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative solutions for you</span>
        <span slot="description">Discover how our platform can streamline your workflow.</span>
        <sgds-link slot="footer"><a href="#" aria-label="Register now">Register now <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
      </sgds-image-card>
      </div>
    </div>
  `,
})
export class ImageCardPageComponent {}
