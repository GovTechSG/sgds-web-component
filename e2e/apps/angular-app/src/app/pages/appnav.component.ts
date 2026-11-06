import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-appnav",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Appnav</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-appnav tone="gradient-3">
        <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm" aria-label="Open side menu"></sgds-icon-button>
        <a slot="brand" href="/"><strong style="color: white">My App</strong></a>
        <sgds-icon-button name="bell" variant="ghost" tone="fixed-light" size="sm" aria-label="Notifications"></sgds-icon-button>
        <sgds-appnav-profile slot="profile" label="User Name" secondary-text="Agency" aria-label="Profile menu">
          <sgds-dropdown-item aria-label="My profile"><span>My profile</span></sgds-dropdown-item>
          <sgds-dropdown-item aria-label="Log out"><span>Log out</span></sgds-dropdown-item>
        </sgds-appnav-profile>
      </sgds-appnav>
      </div>
    </div>
  `,
})
export class AppnavPageComponent {}
