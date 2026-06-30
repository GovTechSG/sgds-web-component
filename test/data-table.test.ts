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

  it("sorts rows when each header is clicked", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="3" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head>ID</sgds-data-table-head>
          <sgds-data-table-head>Name</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>2</sgds-data-table-cell>
          <sgds-data-table-cell>Charlie</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>3</sgds-data-table-cell>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <sgds-data-table-cell>Bob</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const [headerRow] = slot.assignedElements({ flatten: true });
    const headerCells = headerRow.shadowRoot?.querySelectorAll("th") || [];

    // Sort by Name ascending
    (headerCells[1] as HTMLElement).click();
    await elementUpdated(el);

    const sortedByNameAsc = slot
      .assignedElements({ flatten: true })
      .slice(1)
      .map(row => row.querySelectorAll("sgds-data-table-cell")[1]?.textContent?.trim());
    expect(sortedByNameAsc).to.deep.equal(["Alice", "Bob", "Charlie"]);

    // Sort by ID ascending from another header
    (headerCells[0] as HTMLElement).click();
    await elementUpdated(el);

    const sortedByIdAsc = slot
      .assignedElements({ flatten: true })
      .slice(1)
      .map(row => row.querySelectorAll("sgds-data-table-cell")[0]?.textContent?.trim());
    expect(sortedByIdAsc).to.deep.equal(["1", "2", "3"]);
  });

  it("applies right alignment to all cells in a right-aligned column", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="1" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head textAlign="right">Amount</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>100</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const [headerRow] = slot.assignedElements({ flatten: true });
    const [bodyRow] = slot.assignedElements({ flatten: true }).slice(1);
    const headerCellContent = headerRow.shadowRoot?.querySelector(".data-table-head");
    const bodyCellContent = bodyRow.shadowRoot?.querySelector(".data-table-cell");

    expect(headerCellContent).to.exist;
    expect(headerCellContent?.classList.contains("align-right")).to.be.true;
    expect(bodyCellContent).to.exist;
    expect(bodyCellContent?.classList.contains("align-right")).to.be.true;
  });

  it("shows loading state in server mode when isLoading is true", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table mode="server" ?isLoading=${true} dataLength="10" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head>ID</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>1</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const loadingState = el.shadowRoot?.querySelector(".loading");
    const loadingMenu = el.shadowRoot?.querySelector(".loading-menu");
    const loadingSpinner = el.shadowRoot?.querySelector("sgds-spinner");
    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const bodyRows = slot.assignedElements({ flatten: true }).slice(1) as HTMLElement[];

    expect(loadingState).to.exist;
    expect(loadingMenu).to.exist;
    expect(loadingSpinner).to.exist;
    expect(bodyRows[0].style.display).to.equal("none");

    el.isLoading = false;
    await elementUpdated(el);

    expect(el.shadowRoot?.querySelector(".loading")).to.not.exist;
    expect(bodyRows[0].style.display).to.equal("");
  });

  it("does not show loading state in client mode", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table mode="client" ?isLoading=${true} dataLength="1" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head>ID</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>1</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    expect(el.shadowRoot?.querySelector(".loading")).to.not.exist;
  });
});
