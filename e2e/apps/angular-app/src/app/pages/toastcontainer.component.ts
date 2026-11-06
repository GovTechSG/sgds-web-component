import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-toast-container",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">ToastContainer</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-toast-container>
        <sgds-toast show title="Title" delay="5000" variant="info">
          <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
          Toast content
        </sgds-toast>
      </sgds-toast-container>
      </div>
    </div>
  `,
})
export class ToastContainerPageComponent {}
