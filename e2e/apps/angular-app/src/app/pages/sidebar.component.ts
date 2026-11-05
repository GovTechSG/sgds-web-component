import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-sidebar",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Sidebar</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-sidebar active="dashboard">
        <sgds-sidebar-section title="Main" name="main">
          <sgds-sidebar-item name="dashboard" title="Dashboard">
            <sgds-icon slot="icon" name="grid-fill" size="md"></sgds-icon>
            <a href="#"></a>
          </sgds-sidebar-item>
          <sgds-sidebar-group name="reports" title="Reports">
            <sgds-icon slot="icon" name="file-earmark-text" size="md"></sgds-icon>
            <sgds-sidebar-item name="yearly" title="Yearly">
              <sgds-icon slot="icon" name="calendar" size="md"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-group>
        </sgds-sidebar-section>
      </sgds-sidebar>
      </div>
    </div>
  `,
})
export class SidebarPageComponent {}
