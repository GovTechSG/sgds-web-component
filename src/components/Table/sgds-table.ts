import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";

import tableStyle from "./table.css";
import { HasSlotController } from "../../utils/slot";
import { provide } from "@lit/context";
import { TableHeaderBackgroundContext } from "./table-context";

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
   * Specifies the responsive breakpoint for the table.
   * Use "sm", "md", "lg", or "xl" to create responsive tables up to a particular breakpoint.
   * From that breakpoint and up, the table will behave normally and not scroll horizontally.
   * Use "always" to make the table always responsive.
   *
   * (@deprecated) Deprecated since 3.9.0 legacy from v2
   * @type {"sm" | "md" | "lg" | "xl" | "always"}
   */
  @property({ type: String, reflect: true }) responsive: "sm" | "md" | "lg" | "xl" | "always";

  /**
   * Array of strings to populate row header cells.
   * @type {string[]}
   */
  @property({ type: Array }) rowHeader: string[] = [];

  /**
   * Array of strings to populate column header cells.
   * Only used when `headerPosition` is set to "vertical" or "both".
   * @type {string[]}
   */
  @property({ type: Array }) columnHeader: string[] = [];

  /**
   * Two-dimensional array of strings or numbers to populate table data cells.
   * @type {Array<(string | number)[]>}
   */
  @property({ type: Array }) tableData: Array<(string | number)[]> = [];

  /**
   * Defines the placement of headers in the table.
   * Use "horizontal" for top headers only, "vertical" for left headers only,
   * or "both" for both row and column headers.
   * @type {"horizontal" | "vertical" | "both"}
   * @default "horizontal"
   */
  @property({ type: String }) headerPosition: HeaderPosition = "horizontal";

  /**
   * Enables background styling on horizontal header rows.
   * When true, applies background color to header cells for better visual distinction.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) headerBackground = false;

  /**
   * Enables borders around table cells.
   * When true, displays visible borders between all table cells.
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) tableBorder = false;

  /**
   * Indicates the presence of the default slot.
   * Used for server-side rendering to determine table structure.
   * @type {boolean}
   * @internal
   * @default false
   */
  @property({ type: Boolean }) hasDefaultSlot = false;

  @provide({ context: TableHeaderBackgroundContext })
  @state()
  private _headerBackground = false;

  /** @internal */
  private readonly hasSlotController = new HasSlotController(this, "[default]");

  connectedCallback() {
    super.connectedCallback();
  }

  updated() {
    if (!this.hasDefaultSlot) this.hasDefaultSlot = this.hasSlotController.test("[default]");
    this._headerBackground = this.headerBackground;
  }

  private _renderTable() {
    if (this.headerPosition === "horizontal") {
      return html`
        <thead>
          <tr>
            ${this.rowHeader.map((header: string) => html` <th><div>${header}</div></th> `)}
          </tr>
        </thead>
        <tbody>
          ${this.tableData.map(
            row => html`
              <tr>
                ${row.map((cell: string) => html`<td><div>${cell}</div></td>`)}
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
            <th><div></div></th>
            ${this.rowHeader.map((header: string) => html` <th><div>${header}</div></th> `)}
          </tr>
        </thead>
        <tbody>
          ${this.tableData.map(
            (row, index) => html`
              <tr>
                <th><div>${this.columnHeader[index]}</div></th>
                ${row.map((cell: string) => html`<td><div>${cell}</div></td>`)}
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
              <th><div>${this.columnHeader[index]}</div></th>
              ${row.map((cell: string) => html`<td><div>${cell}</div></td>`)}
            </tr>
          `
        )}
      `;
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
        <slot id="table-slot" class=${classMap({ table: true, "no-border": !this.hasDefaultSlot })}></slot>

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
