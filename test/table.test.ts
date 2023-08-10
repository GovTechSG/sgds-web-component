import { assert, expect, fixture, html } from "@open-wc/testing";
import { SgdsTable } from "../src/components/Table";
import "../src/components/Table";
customElements.define("sgds-table", SgdsTable);
describe("Table", () => {
  it("should be able to sort the table data when a header is clicked", async () => {
    // Set up the table data and headers
    const tableHeaders = ["Name", "Age", "City"];
    const tableData = [
      ["John", "30", "New York"],
      ["Alice", "25", "San Francisco"],
      ["Bob", "40", "Chicago"]
    ];

    // Create the table element
    const table = await fixture<SgdsTable>(
      html`<sgds-table .tableHeaders=${tableHeaders} .tableData=${tableData} .sort=${true}></sgds-table>`
    );

    // Click the header for the first column to sort by name
    const nameHeader = table.shadowRoot?.querySelector("thead th:first-child");
    (nameHeader as HTMLElement).click();

    // Check that the table data is sorted by name in ascending order
    assert.deepEqual(table.tableData, [
      ["Alice", "25", "San Francisco"],
      ["Bob", "40", "Chicago"],
      ["John", "30", "New York"]
    ]);

    // Click the header for the first column again to sort by name in descending order
    (nameHeader as HTMLElement).click();

    // Check that the table data is sorted by name in descending order
    assert.deepEqual(table.tableData, [
      ["John", "30", "New York"],
      ["Bob", "40", "Chicago"],
      ["Alice", "25", "San Francisco"]
    ]);

    // Click the header for the second column to sort by age
    const ageHeader = table.shadowRoot?.querySelector("thead th:nth-child(2)");
    (ageHeader as HTMLElement).click();

    // Check that the table data is sorted by age in ascending order
    assert.deepEqual(table.tableData, [
      ["Alice", "25", "San Francisco"],
      ["John", "30", "New York"],
      ["Bob", "40", "Chicago"]
    ]);

    // Click the header for the second column again to sort by age in descending order
    (ageHeader as HTMLElement).click();

    // Check that the table data is sorted by age in descending order
    assert.deepEqual(table.tableData, [
      ["Bob", "40", "Chicago"],
      ["John", "30", "New York"],
      ["Alice", "25", "San Francisco"]
    ]);
  });

  it("should be able to sort the table data when a header is clicked and return to default sort on third click when removableSort is set to true", async () => {
    // Set up the table data and headers
    const tableHeaders = ["Name", "Age", "City"];
    const tableData = [
      ["John", "30", "New York"],
      ["Alice", "25", "San Francisco"],
      ["Bob", "40", "Chicago"]
    ];

    // Create the table element
    const table = await fixture<SgdsTable>(
      html`<sgds-table
        .tableHeaders=${tableHeaders}
        .tableData=${tableData}
        .sort=${true}
        .removableSort=${true}
      ></sgds-table>`
    );

    // Click the header for the first column to sort by name
    const nameHeader = table.shadowRoot?.querySelector("thead th:first-child");
    (nameHeader as HTMLElement).click();

    // Check that the table data is sorted by name in ascending order
    assert.deepEqual(table.tableData, [
      ["Alice", "25", "San Francisco"],
      ["Bob", "40", "Chicago"],
      ["John", "30", "New York"]
    ]);

    // Click the header for the first column again to sort by name in descending order
    (nameHeader as HTMLElement).click();

    // Check that the table data is sorted by name in descending order
    assert.deepEqual(table.tableData, [
      ["John", "30", "New York"],
      ["Bob", "40", "Chicago"],
      ["Alice", "25", "San Francisco"]
    ]);

    // Click the header for the first column a third time to return to default sort
    (nameHeader as HTMLElement).click();

    // Check that the table data is sorted by the original order
    assert.deepEqual(table.tableData, [
      ["John", "30", "New York"],
      ["Alice", "25", "San Francisco"],
      ["Bob", "40", "Chicago"]
    ]);
  });

  it("outer wrapper is a table element", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table></sgds-table>`);
    expect(el).shadowDom.to.equalSnapshot();
  });

  it("Should have correct class when striped", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table striped></sgds-table>`);
    expect(el.shadowRoot?.querySelector("table")).to.have.class("table-striped");
  });

  it("Should have correct class when hover", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table hover></sgds-table>`);
    expect(el.shadowRoot?.querySelector("table")).to.have.class("table-hover");
  });

  it("Should have correct class when bordered", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table bordered></sgds-table>`);
    expect(el.shadowRoot?.querySelector("table")).to.have.class("table-bordered");
  });

  it("Should have correct class when borderless", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table borderless></sgds-table>`);
    expect(el.shadowRoot?.querySelector("table")).to.have.class("table-borderless");
  });

  it("Should have correct class when small", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table size="sm"></sgds-table>`);
    expect(el.shadowRoot?.querySelector("table")).to.have.class("table-sm");
  });

  it("Should have correct class when dark", async () => {
    const el = await fixture<SgdsTable>(html`<sgds-table variant="dark"></sgds-table>`);
    expect(el.shadowRoot?.querySelector("table")).to.have.class("table-dark");
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
