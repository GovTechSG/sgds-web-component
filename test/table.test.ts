import "./sgds-web-component";
import { assert, expect, fixture, html } from "@open-wc/testing";
import { SgdsTable } from "../src/components";

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
});

//TODO: Test cases needs to be revised :3
