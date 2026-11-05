import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-thumbnail-card",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">ThumbnailCard</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-thumbnail-card orientation="vertical">
        <img slot="thumbnail" alt="placeholder" width="64" height="64" src="https://placehold.co/64" />
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <span slot="subtitle">FEATURES</span>
        <span slot="title">Innovative solutions for you</span>
        <span slot="description">Discover how our platform can streamline your workflow.</span>
        <sgds-link slot="footer"><a href="#" aria-label="Learn more">Learn more <sgds-icon name="arrow-right"></sgds-icon></a></sgds-link>
      </sgds-thumbnail-card>
      </div>
    </div>
  `,
})
export class ThumbnailCardPageComponent {}
