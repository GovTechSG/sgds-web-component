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
        <sgds-toast-container position="bottom-end">
        <sgds-toast show title="Notification" variant="info">
          <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
          Your changes have been saved.
        </sgds-toast>
      </sgds-toast-container>
      </div>
    </div>
  `,
})
export class ToastContainerPageComponent {}
