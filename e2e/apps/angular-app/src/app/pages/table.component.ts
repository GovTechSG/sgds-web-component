import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-table",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">Table</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-table header-background table-border>
        <sgds-table-row>
          <sgds-table-head>Name</sgds-table-head>
          <sgds-table-head>Role</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Alice</sgds-table-cell>
          <sgds-table-cell>Engineer</sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Bob</sgds-table-cell>
          <sgds-table-cell>Designer</sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
      </div>
    </div>
  `,
})
export class TablePageComponent {}
