import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@govtechsg/sgds-web-component";

@Component({
  selector: "page-data-table",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sgds-container-sidebar sgds:py-layout-md">
      <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:mb-gap-text-2-xl">DataTable</h1>
      <div class="sgds:mt-gap-text-md">
        <sgds-data-table multi-select data-length="5" current-page="1" items-per-page="5">
        <sgds-data-table-row>
          <sgds-data-table-head sorting sort-key="id">ID</sgds-data-table-head>
          <sgds-data-table-head sorting sort-key="name">Name</sgds-data-table-head>
          <sgds-data-table-head sorting sort-key="role">Role</sgds-data-table-head>
          <sgds-data-table-head text-align="right">Amount</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
          <sgds-data-table-cell>Engineer</sgds-data-table-cell>
          <sgds-data-table-cell>1250.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>2</sgds-data-table-cell>
          <sgds-data-table-cell>Bob</sgds-data-table-cell>
          <sgds-data-table-cell>Designer</sgds-data-table-cell>
          <sgds-data-table-cell>980.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>3</sgds-data-table-cell>
          <sgds-data-table-cell>Charlie</sgds-data-table-cell>
          <sgds-data-table-cell>Analyst</sgds-data-table-cell>
          <sgds-data-table-cell>1100.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>4</sgds-data-table-cell>
          <sgds-data-table-cell>Diana</sgds-data-table-cell>
          <sgds-data-table-cell>Manager</sgds-data-table-cell>
          <sgds-data-table-cell>1500.00</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>5</sgds-data-table-cell>
          <sgds-data-table-cell>Eve</sgds-data-table-cell>
          <sgds-data-table-cell>Engineer</sgds-data-table-cell>
          <sgds-data-table-cell>1300.00</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
      </div>
    </div>
  `,
})
export class DataTablePageComponent {}
