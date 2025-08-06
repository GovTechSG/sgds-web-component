import "./sgds-web-component";
import { expect, fixture, html } from "@open-wc/testing";
import { SgdsTable } from "../src/components";
import { SgdsTableRow } from "../lib/components";

describe("Table", () => {
  it("renders with default properties", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table></sgds-table>`);
    expect(el).to.exist;
    expect(el.headerPosition).to.equal("horizontal");
    expect(el.rowHeader).to.deep.equal([]);
    expect(el.columnHeader).to.deep.equal([]);
    expect(el.tableData).to.deep.equal([]);
  });

  it("renders with row headers", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table .rowHeader=${["Name", "Age", "Country"]}></sgds-table>`);
    expect(el.rowHeader).to.deep.equal(["Name", "Age", "Country"]);
  });

  it("renders table data correctly", async () => {
    const el = await fixture<SgdsTable>(
      html`<sgds-table
        .rowHeader=${["Name", "Age"]}
        .tableData=${[
          ["Alice", 25],
          ["Bob", 30]
        ]}
      ></sgds-table>`
    );

    await el.updateComplete;

    const rows = el.shadowRoot?.querySelectorAll("tbody tr");
    expect(rows?.length).to.equal(2);
    expect(rows?.[0].innerHTML).to.include("Alice");
    expect(rows?.[1].innerHTML).to.include("Bob");
  });

  it("renders with column headers in vertical mode", async () => {
    const el = await fixture<SgdsTable>(
      html`<sgds-table
        headerPosition="vertical"
        .columnHeader=${["Attribute", "Value"]}
        .tableData=${[
          ["Alice", 25],
          ["Bob", 30]
        ]}
      ></sgds-table>`
    );

    await el.updateComplete;

    const thElements = el.shadowRoot?.querySelectorAll("th");
    expect(thElements?.[0].innerText).to.equal("Attribute");
    expect(thElements?.[1].innerText).to.equal("Value");
  });

  it("renders with both row and column headers", async () => {
    const el = await fixture<SgdsTable>(
      html`<sgds-table
        headerPosition="both"
        .rowHeader=${["Name", "Age"]}
        .columnHeader=${["Person 1", "Person 2"]}
        .tableData=${[
          ["Alice", 25],
          ["Bob", 30]
        ]}
      ></sgds-table>`
    );
    await el.updateComplete;

    const table = el.shadowRoot?.querySelector("table");
    expect(table).to.exist;
    expect(table?.innerHTML).to.include("Name");
    expect(table?.innerHTML).to.include("Person 1");
  });

  it("outer wrapper is a table element", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table></sgds-table>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it("Should have responsive wrapper with tabindex", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table responsive="always"></sgds-table>`);

    expect(el.shadowRoot?.querySelector("div")?.classList.contains("table-responsive")).to.be.true;
    expect(el.shadowRoot?.querySelector("div")).to.have.attribute("tabindex", "0");
  });

  it("Should have responsive breakpoints", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table responsive="md"></sgds-table>`);
    expect(el.shadowRoot?.querySelector("div")?.classList.contains("table-responsive-md")).to.be.true;
  });

  it("Should render all content passed in slot, without the provided table data", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table
      responsive="md"
      .rowHeader=${["Name", "Age"]}
      .tableData=${[
        ["Alice", 25],
        ["Bob", 30]
      ]}
    >
      <sgds-table-row>
        <sgds-table-head>#</sgds-table-head>
        <sgds-table-head>First name</sgds-table-head>
        <sgds-table-head>Last name</sgds-table-head>
        <sgds-table-head>Username</sgds-table-head>
        <sgds-table-head>Action</sgds-table-head>
      </sgds-table-row>

      <sgds-table-row>
        <sgds-table-cell>1</sgds-table-cell>
        <sgds-table-cell>John</sgds-table-cell>
        <sgds-table-cell>Doe</sgds-table-cell>
        <sgds-table-cell>
          <sgds-link>
            <a href="#">@johndoe</a>
          </sgds-link>
        </sgds-table-cell>
        <sgds-table-cell> </sgds-table-cell>
      </sgds-table-row>

      <sgds-table-row>
        <sgds-table-cell>2</sgds-table-cell>
        <sgds-table-cell>Jane</sgds-table-cell>
        <sgds-table-cell>Doe</sgds-table-cell>
        <sgds-table-cell>
          <sgds-link>
            <a href="#">@janedoe</a>
          </sgds-link>
        </sgds-table-cell>
        <sgds-table-cell>
          <sgds-icon-button name="three-dots-vertical"></sgds-icon-button>
        </sgds-table-cell>
      </sgds-table-row>

      <sgds-table-row>
        <sgds-table-cell>3</sgds-table-cell>
        <sgds-table-cell>Bob</sgds-table-cell>
        <sgds-table-cell>Smith</sgds-table-cell>
        <sgds-table-cell>
          <sgds-link>
            <a href="#">@bobsmith</a>
          </sgds-link>
        </sgds-table-cell>
        <sgds-table-cell>
          <sgds-badge outlined> active </sgds-badge>
        </sgds-table-cell>
      </sgds-table-row>
    </sgds-table>`);

    expect(el.shadowRoot?.querySelector("div")?.classList.contains("table-responsive-md")).to.be.true;
    expect(el.shadowRoot?.querySelector("#table-slot")).not.to.be.null;

    const rows = el.shadowRoot?.querySelectorAll("tbody tr");
    expect(rows?.length).to.equal(0);

    const columns = el.shadowRoot?.querySelectorAll("tbody td");
    expect(columns?.length).to.equal(0);

    const slot = el.shadowRoot.querySelector("slot");
    const slotContent = slot.assignedElements() as HTMLSlotElement[];
    expect(slotContent?.length).to.equal(4);

    const headerCells = slotContent?.[0].querySelectorAll("sgds-table-head");
    expect(headerCells.length).to.equal(5);
    expect(headerCells?.[0].innerHTML).to.include("#");
    expect(headerCells?.[1].innerHTML).to.include("First name");
    expect(headerCells?.[2].innerHTML).to.include("Last name");
    expect(headerCells?.[3].innerHTML).to.include("Username");
    expect(headerCells?.[4].innerHTML).to.include("Action");

    const secondRowCells = slotContent?.[2].querySelectorAll("sgds-table-cell");
    expect(secondRowCells.length).to.equal(5);
    expect(secondRowCells?.[0].innerHTML).to.include("2");
    expect(secondRowCells?.[1].innerHTML).to.include("Jane");
    expect(secondRowCells?.[2].innerHTML).to.include("Doe");
    expect(secondRowCells?.[3].innerHTML).to.include("janedoe");
    expect(secondRowCells?.[4].innerHTML).to.include("sgds-icon-button");
  });

  it("Should render all content when passed into a sgds-table-row", async () => {
    const el = await fixture<SgdsTableRow>(html`<sgds-table-row>
      <sgds-table-head>#</sgds-table-head>
      <sgds-table-head>First name</sgds-table-head>
      <sgds-table-head>Last name</sgds-table-head>
      <sgds-table-head>Username</sgds-table-head>
      <sgds-table-head>Action</sgds-table-head>
    </sgds-table-row> `);

    expect(el.shadowRoot?.querySelector("slot")?.classList.contains("table-row")).to.be.true;
    const slot = el.shadowRoot.querySelector("slot");
    const slotContent = slot.assignedElements() as HTMLSlotElement[];
    expect(slotContent?.length).to.equal(5);
    expect(slotContent?.[0].innerHTML).to.include("#");
    expect(slotContent?.[1].innerHTML).to.include("First name");
    expect(slotContent?.[2].innerHTML).to.include("Last name");
    expect(slotContent?.[3].innerHTML).to.include("Username");
    expect(slotContent?.[4].innerHTML).to.include("Action");
  });
});

//TODO: Test cases needs to be revised :3
