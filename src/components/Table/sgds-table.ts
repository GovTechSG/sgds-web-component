import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import tableStyle from "./table.css";
/**
 * @summary The use of a table is to organise a collections of data into readable rows
 *
 * @cssproperty --table-bg - Table's background color
 * @cssproperty --table-accent-bg - Table's accent background color
 * @cssproperty --table-striped-color - Text color for striped table
 * @cssproperty --table-striped-bg - Background color for striped table
 * @cssproperty --table-active-color - Active text color for hovered row
 * @cssproperty --table-active-bg - Active background color for hovered row
 * @cssproperty --table-hover-color - Hovered text color for hover table
 * @cssproperty --table-hover-bg - Hovered background color for hover table
 */

export class SgdsTable extends SgdsElement {
  static styles = [tableStyle];

  /**
   * Adds zebra-striping using striped to table row within the <tbody>
   */
  @property({ type: Boolean, reflect: true }) striped = false;

  /**
   * Add borders to all sides of table and cells
   */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /**
   * Remove all borders to table and cells
   */
  @property({ type: Boolean, reflect: true }) borderless = false;

  /**
   * Add hoverable state on table rows
   */
  @property({ type: Boolean, reflect: true }) hover = false;

  /**
   * Add <code>.table-sm</code> to make table more compact
   */
  @property({ type: String, reflect: true }) size: string;

  /**
   * Use contextual classes to add colors to table
   */
  @property({ type: String, reflect: true }) variant: string;

  /**
   * Sorting on a column is enabled by adding the sort property. The sorting algorithm is based on javascript array.sort() method. In ascending order from bottom, alphabets come first, followed by numbers, and then symbols. Similarly, in descending order from bottom, symbols come first, followed by numbers, and then alphabets.
   */
  @property({ type: Boolean, reflect: true }) sort = false;

  /**
   * When removableSort is present, the third click removes the sorting from the column.
   */
  @property({ type: Boolean, reflect: true }) removableSort = false;

  /**
   * Use responsive="sm", responsive="md" , responsive="lg", or responsive="xl" as needed to create responsive tables up to a particular breakpoint. From that breakpoint and up, the table will behave normally and not scroll horizontally. Use reponsive="always" to let table be always responsive
   */
  @property({ type: String, reflect: true }) responsive: "sm" | "md" | "lg" | "xl" | "always";

  /**
   * Populate header cells using Arrays
   */
  @property({ type: Array }) tableHeaders: string[] = [];

  /**
   * Populate data cells using Arrays
   */
  @property({ type: Array }) tableData: Array<(string | number)[]> = [];

  /** @internal */
  @state() sortColumn: number | null = null;

  /** @internal */
  @state() sortAsc = true;

  //TODO aria-sort

  /** @internal */
  @state() activeColumn: number | null = null;

  /** @internal */
  @state() sortClickCount = 0;

  /** @internal */
  @state() clickCount = 0;

  /** @internal */
  @state() originalTableData: Array<(string | number)[]> = [];

  connectedCallback() {
    super.connectedCallback();
    this.originalTableData = [...this.tableData];
  }

  handleHeaderClick(columnIndex: number) {
    if (this.sort) {
      if (this.sortColumn === columnIndex) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortColumn = columnIndex;
        this.sortAsc = true;
      }

      this.tableData = [...this.tableData].sort((a, b) => {
        const aValue = a[columnIndex];
        const bValue = b[columnIndex];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return this.sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return this.sortAsc ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
        }
      });

      // update the active column
      if (this.activeColumn === columnIndex) {
        this.clickCount++;
        if (this.clickCount === 3 && this.removableSort) {
          this.activeColumn = null;
          this.clickCount = 0;
          this.tableData = [...this.originalTableData];
        }
      } else {
        this.activeColumn = columnIndex;
        this.clickCount = 1;
      }

      // add the .active class to the clicked header cell
      const thElements = this.shadowRoot?.querySelectorAll("th");
      thElements.forEach((thElement, index) => {
        if (index === columnIndex) {
          thElement.classList.add("active");
        } else {
          thElement.classList.remove("active");
        }
      });
    }
  }

  getIcon(columnIndex: number) {
    if (this.activeColumn !== columnIndex) {
      return html`<svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-down-up ms-2 align-self-center"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
        />
      </svg>`;
    } else {
      return this.sortAsc
        ? html`<svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-sort-up-alt ms-2 align-self-center"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 13.5a.5.5 0 0 1-1 0V4.707L1.354 5.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 4.707V13.5zm4-9.5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"
            />
          </svg>`
        : html`<svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-sort-down ms-2 align-self-center"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
            />
          </svg>`;
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          "table-responsive": this.responsive === "always",
          "table-responsive-sm": this.responsive === "sm",
          "table-responsive-md": this.responsive === "md",
          "table-responsive-lg": this.responsive === "lg",
          "table-responsive-xl": this.responsive === "xl"
        })}
        tabindex="0"
      >
        <table
          class="table sgds ${classMap({
            [`table-striped`]: this.striped,
            [`table-bordered`]: this.bordered,
            [`table-borderless`]: this.borderless,
            [`table-hover`]: this.hover,
            [`table-${this.size}`]: this.size,
            [`table-${this.variant}`]: this.variant
          })}"
        >
          <thead>
            <tr>
              ${this.tableHeaders.map(
                (header: string, index: number) => html`
                  <th
                    class="${classMap({
                      "sortable-header": this.sort,
                      active: this.activeColumn === index
                    })}"
                    @click=${() => this.handleHeaderClick(index)}
                    //TODO aria-sort 
                  >
                    ${header} ${this.sort ? this.getIcon(index) : null}
                  </th>
                `
              )}
            </tr>
          </thead>
          <tbody>
            ${this.tableData.map(
              row => html`
                <tr>
                  ${row.map((cell: string) => html`<td>${cell}</td>`)}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

export default SgdsTable;
