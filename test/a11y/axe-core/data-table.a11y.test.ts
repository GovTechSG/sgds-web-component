import { html } from "lit";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { SgdsDataTable } from "../../../src/components";
import SgdsDataTableHead from "../../../src/components/DataTable/sgds-data-table-head";
import "../../sgds-web-component";

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
          <sgds-data-table-head sortKey="id" sorting>ID</sgds-data-table-head>
          <sgds-data-table-head sortKey="name" sorting>Name</sgds-data-table-head>
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
    const headerCells = headerRow.shadowRoot?.querySelectorAll("th[data-sorting]") || [];

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

  it("sorts rows when Enter is pressed on a sorting header", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="3" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head sortKey="id" sorting>ID</sgds-data-table-head>
          <sgds-data-table-head sortKey="name" sorting>Name</sgds-data-table-head>
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
    const headerCells = headerRow.shadowRoot?.querySelectorAll("th[data-sorting]") || [];

    (headerCells[1] as HTMLElement).dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await elementUpdated(el);

    const sortedByNameAsc = slot
      .assignedElements({ flatten: true })
      .slice(1)
      .map(row => row.querySelectorAll("sgds-data-table-cell")[1]?.textContent?.trim());
    expect(sortedByNameAsc).to.deep.equal(["Alice", "Bob", "Charlie"]);
  });

  it("sorts only currently visible rows in client mode", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="4" itemsPerPage="2" currentPage="1" mode="client">
        <sgds-data-table-row>
          <sgds-data-table-head sortKey="id" sorting>ID</sgds-data-table-head>
          <sgds-data-table-head sortKey="name" sorting>Name</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>2</sgds-data-table-cell>
          <sgds-data-table-cell>Charlie</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>4</sgds-data-table-cell>
          <sgds-data-table-cell>Zed</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>3</sgds-data-table-cell>
          <sgds-data-table-cell>Bob</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const [headerRow] = slot.assignedElements({ flatten: true });
    const headerCells = headerRow.shadowRoot?.querySelectorAll("th[data-sorting]") || [];

    (headerCells[1] as HTMLElement).click();
    await elementUpdated(el);

    const rowIdsAfterSort = slot
      .assignedElements({ flatten: true })
      .slice(1)
      .map(row => row.querySelectorAll("sgds-data-table-cell")[0]?.textContent?.trim());

    expect(rowIdsAfterSort).to.deep.equal(["1", "2", "4", "3"]);
  });

  it("ignores sgds-sort events that do not originate from table headers", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="3" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head sortKey="id" sorting>ID</sgds-data-table-head>
          <sgds-data-table-head sortKey="name" sorting>Name</sgds-data-table-head>
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
    const initialOrder = slot
      .assignedElements({ flatten: true })
      .slice(1)
      .map(row => row.querySelectorAll("sgds-data-table-cell")[0]?.textContent?.trim());

    const firstBodyRow = slot.assignedElements({ flatten: true })[1];
    firstBodyRow.dispatchEvent(
      new CustomEvent("sgds-sort", {
        detail: { key: "id", direction: "ascending" },
        bubbles: true,
        composed: true
      })
    );
    await elementUpdated(el);

    const orderAfterNonHeaderSort = slot
      .assignedElements({ flatten: true })
      .slice(1)
      .map(row => row.querySelectorAll("sgds-data-table-cell")[0]?.textContent?.trim());

    expect(orderAfterNonHeaderSort).to.deep.equal(initialOrder);
  });

  it("keeps an expandable row open when open is true", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="1" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head>ID</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row expand open>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <div slot="content">Details</div>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const row = slot.assignedElements({ flatten: true })[1] as HTMLElement & { open: boolean };
    const expandControl = row.shadowRoot?.querySelector("td.control-cell") as HTMLElement;
    const renderedRow = row.shadowRoot?.querySelector("tr") as HTMLElement;

    expect(row.open).to.be.true;
    expect(renderedRow.classList.contains("active")).to.be.true;

    expandControl.click();
    await elementUpdated(el);

    expect(row.open).to.be.false;
    expect(renderedRow.classList.contains("active")).to.be.false;
  });

  it("toggles expandable row when pressing Enter on expand control", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="1" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head>ID</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row expand>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <div slot="content">Details</div>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const row = slot.assignedElements({ flatten: true })[1] as HTMLElement & { open: boolean };
    const expandControl = row.shadowRoot?.querySelector("td.control-cell") as HTMLElement;

    expect(row.open).to.be.false;

    expandControl.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await elementUpdated(row as Element);

    expect(row.open).to.be.true;
  });

  it("renders header control cells as th", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="2" itemsPerPage="5" currentPage="1" multiSelect>
        <sgds-data-table-row>
          <sgds-data-table-head>ID</sgds-data-table-head>
          <sgds-data-table-head>Name</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row expand>
          <sgds-data-table-cell>1</sgds-data-table-cell>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
          <div slot="content">Details</div>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const headerRow = slot.assignedElements({ flatten: true })[0] as HTMLElement;
    const controlCells = Array.from(headerRow.shadowRoot?.querySelectorAll(".control-cell") ?? []);

    expect(controlCells.length).to.be.greaterThan(0);
    expect(controlCells.every(cell => cell.tagName.toLowerCase() === "th")).to.be.true;
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

  it("shows loading state in client mode when isLoading is true", async () => {
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

    const loadingState = el.shadowRoot?.querySelector(".loading");
    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const bodyRows = slot.assignedElements({ flatten: true }).slice(1) as HTMLElement[];

    expect(loadingState).to.exist;
    expect(bodyRows[0].style.display).to.equal("");
  });

  it("emits sgds-sort in server mode without locally sorting rows", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table mode="server" serverSort dataLength="3" itemsPerPage="5" currentPage="1">
        <sgds-data-table-row>
          <sgds-data-table-head sortKey="name" sorting>Name</sgds-data-table-head>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>Charlie</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>Alice</sgds-data-table-cell>
        </sgds-data-table-row>
        <sgds-data-table-row>
          <sgds-data-table-cell>Bob</sgds-data-table-cell>
        </sgds-data-table-row>
      </sgds-data-table>
    `);
    await elementUpdated(el);

    let receivedDetail: { key: string; direction: string } | null = null;
    el.addEventListener("sgds-sort", (event: Event) => {
      receivedDetail = (event as CustomEvent<{ key: string; direction: string }>).detail;
    });

    const slot = el.shadowRoot?.querySelector("slot") as HTMLSlotElement;
    const [headerRow] = slot.assignedElements({ flatten: true });
    const header = headerRow.querySelector("sgds-data-table-head") as SgdsDataTableHead;

    header.handleSortClick();
    await elementUpdated(el);

    expect(receivedDetail).to.deep.equal({ key: "name", direction: "ascending" });

    const namesAfterSortEvent = slot
      .assignedElements({ flatten: true })
      .slice(1)
      .map(row => row.querySelectorAll("sgds-data-table-cell")[0]?.textContent?.trim());

    expect(namesAfterSortEvent).to.deep.equal(["Charlie", "Alice", "Bob"]);
  });

  it("shows no-data state when there are no body rows", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table dataLength="0" itemsPerPage="5" currentPage="1"></sgds-data-table>
    `);
    await elementUpdated(el);

    const noData = el.shadowRoot?.querySelector(".no-data");
    expect(noData).to.exist;
    expect(noData?.textContent?.trim()).to.equal("No data");
  });

  it("does not show no-data state while loading", async () => {
    const el = await fixture<SgdsDataTable>(html`
      <sgds-data-table
        mode="server"
        ?isLoading=${true}
        dataLength="0"
        itemsPerPage="5"
        currentPage="1"
      ></sgds-data-table>
    `);
    await elementUpdated(el);

    expect(el.shadowRoot?.querySelector(".loading")).to.exist;
    expect(el.shadowRoot?.querySelector(".no-data")).to.not.exist;
  });
});
