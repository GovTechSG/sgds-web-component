import { html } from "lit";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { SgdsDataTable } from "../src/components";
import "./sgds-web-component";

describe("<sgds-data-table>", () => {
  it("renders data rows and header row from slotted content", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="2" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head>Name</sgds-data-table-head>
          <sgds-data-table-head>Role</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
          <sgds-data-table-cell>Admin</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>Bob</sgds-data-table-cell>
          <sgds-data-table-cell>User</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const rows = slot.assignedElements({ flatten: true });
    expect(rows).to.have.lengthOf(3);
  });
});
