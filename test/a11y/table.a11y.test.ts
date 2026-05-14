import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Table a11y", () => {
  it("sgds-table should be accessible", async () => {
    const el = await fixture(html`
      <sgds-table>
        <sgds-table-row>
          <sgds-table-head>Name</sgds-table-head>
          <sgds-table-head>Age</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Alice</sgds-table-cell>
          <sgds-table-cell>25</sgds-table-cell>
        </sgds-table-row>
        <sgds-table-row>
          <sgds-table-cell>Bob</sgds-table-cell>
          <sgds-table-cell>30</sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    `);
    await expect(el).to.be.accessible();
  });
});
