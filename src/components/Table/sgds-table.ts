import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";

import tableStyle from "./table.css";
import { HasSlotController } from "../../utils/slot";
import SgdsTableRow from "./sgds-table-row";
import SgdsTableHead from "./sgds-table-head";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Table is used for displaying collections of data in organized rows and columns.
 * It supports two rendering methods: supply an array of data for automatic table generation, or use the slot to insert custom table elements for full structural control.
 *
 * @slot - Insert custom table elements (such as rows, headers, or cells) to define the table structure manually.
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
  @property({ type: String }) headerPosition: HeaderPosition = "horizontal";

  /**
   * Defines the placement of headers in the table (horizontal, vertical, or both)
   */
  @property({ type: Boolean }) headerBackground = false;

  /**
   * Defines the placement of headers in the table (horizontal, vertical, or both)
   */
  @property({ type: Boolean }) tableBorder = false;

  /** Used only for SSR to indicate the presence of the `default` slot. */
  @property({ type: Boolean }) hasDefaultSlot = false;

  /** @internal */
  private readonly hasSlotController = new HasSlotController(this, "[default]");

  connectedCallback() {
    super.connectedCallback();
  }

  updated() {
    if (!this.hasDefaultSlot) this.hasDefaultSlot = this.hasSlotController.test("[default]");
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

  /**
   * When there is a slot change, we will check if the background boolean is true
   * if true, we will find the grand node of the table structure and set the sgds-table-head background attribute
   *
   */
  private _handleSlotChange(e: Event) {
    if (this.headerBackground) {
      const childNodes = (e.target as HTMLSlotElement)
        .assignedNodes({ flatten: true })
        .filter((item: SgdsTableRow) => item?.tagName?.toLowerCase() === "sgds-table-row") as SgdsTableRow[];

      childNodes.forEach(node => {
        const grandChildNodes = node.shadowRoot
          .querySelector("slot")
          .assignedNodes({ flatten: true })
          .filter((item: SgdsTableRow) => item?.tagName?.toLowerCase() === "sgds-table-head") as SgdsTableHead[];
        grandChildNodes.forEach(grandNode => grandNode.setAttribute("background", "true"));
      });
    }
    return;
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
        <slot
          id="table-slot"
          class=${classMap({ table: true, "no-border": !this.hasDefaultSlot })}
          @slotchange=${this._handleSlotChange}
        ></slot>

        ${!this.hasDefaultSlot
          ? html`<table class="table">
              ${this._renderTable()}
            </table>`
          : ""}
      </div>
    `;
  }
}

export default SgdsTable;
