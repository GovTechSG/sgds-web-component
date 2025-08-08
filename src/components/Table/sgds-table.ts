import { html } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";

import tableStyle from "./table.css";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary The use of a table is to organise a collections of data into readable rows.
 * There are two ways to utilise the table, by structured element via slot or by array of data.
 * @slot - Accepts any elements passed in, used for structured element method
 */

export class SgdsTable extends SgdsElement {
  static styles = [...SgdsElement.styles, tableStyle];

  /**
   * Use responsive="sm", responsive="md" , responsive="lg", or responsive="xl" as needed to create responsive tables up to a particular breakpoint. From that breakpoint and up, the table will behave normally and not scroll horizontally. Use reponsive="always" to let table be always responsive
   */
  @property({ type: String, reflect: true }) responsive: "sm" | "md" | "lg" | "xl" | "always";

  /**
   * Populate row header cells using Arrays
   */
  @property({ type: Array }) rowHeader: string[] = [];

  /**
   * Populate column header cells using Arrays only when <code>headerPosition="vertical"</code> or <code>headerPosition="both"</code>
   */
  @property({ type: Array }) columnHeader: string[] = [];

  /**
   * Populate data cells using Arrays
   */
  @property({ type: Array }) tableData: Array<(string | number)[]> = [];

  /**
   * Defines the placement of headers in the table (horizontal, vertical, or both)
   */
  @property({ type: String, reflect: true }) headerPosition: HeaderPosition = "horizontal";

  @queryAssignedElements({ flatten: true, selector: "#table-slot" })
  private tableContents!: Node[];

  @state() private originalTableData: Array<(string | number)[]> = [];

  connectedCallback() {
    super.connectedCallback();
    this.originalTableData = [...this.tableData];
  }

  private _renderTable() {
    if (this.headerPosition === "horizontal") {
      return html`
        <thead>
          <tr>
            ${this.rowHeader.map((header: string) => html` <th>${header}</th> `)}
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
      `;
    }

    if (this.headerPosition === "both") {
      return html`
        <thead>
          <tr>
            <th></th>
            ${this.rowHeader.map((header: string) => html` <th>${header}</th> `)}
          </tr>
        </thead>
        <tbody>
          ${this.tableData.map(
            (row, index) => html`
              <tr>
                <th>${this.columnHeader[index]}</th>
                ${row.map((cell: string) => html`<td>${cell}</td>`)}
              </tr>
            `
          )}
        </tbody>
      `;
    }

    if (this.headerPosition === "vertical") {
      const flippedTableData = this.tableData[0].map((_, colIndex) => this.tableData.map(row => row[colIndex]));

      return html`
        ${flippedTableData.map(
          (row, index) => html`
            <tr>
              <th>${this.columnHeader[index]}</th>
              ${row.map((cell: string) => html`<td>${cell}</td>`)}
            </tr>
          `
        )}
      `;
    }
  }

  private _handleSlotChange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedElements();
    this.tableContents = childNodes;
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
        <slot id="table-slot" class="table" @slotchange=${this._handleSlotChange}> </slot>

        ${this.tableContents.length === 0
          ? html`<table class="table">
              ${this._renderTable()}
            </table>`
          : ""}
      </div>
    `;
  }
}

export default SgdsTable;
