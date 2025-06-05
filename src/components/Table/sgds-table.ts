import { html, TemplateResult } from "lit";

import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import tableStyle from "./table.css";
import { isEmpty } from "lodash";

export type HeaderPosition = "horizontal" | "vertical" | "both";

export type ICellItem = {
  id: string;
  type: "button" | "link" | "badge" | "icon-button";
  value: string;
  fullWidth?: boolean;
  variant?: string;
  size?: string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  download?: string;
  ariaLabel?: string;
  outlined?: boolean;
};

export type IGeneric = {
  [key: string]: ICellItem | string | number;
};

export type IRowHeader = {
  key: string;
  value: string;
};

/**
 * @summary The use of a table is to organise a collections of data into readable rows
 *
 * @event sgds-table-click - Emitted when a button is clicked in the table cell. Passes a CustomeEvent <code>{target: ICellItem, row: IGeneric}</code>
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
  @property({ type: Array }) rowHeader: IRowHeader[] = [];

  /**
   * Populate column header cells using Arrays only when <code>headerPosition="vertical"</code> or <code>headerPosition="both"</code>
   */
  @property({ type: Array }) columnHeader: string[] = [];

  /**
   * Populate data cells using Arrays. For custom rendering of cell use <code>ICellItem</code>.
   */
  @property({ type: Array }) tableData: IGeneric[] = [];

  /**
   * Defines the placement of headers in the table (horizontal, vertical, or both)
   */
  @property({ type: String, reflect: true }) headerPosition: HeaderPosition = "horizontal";

  /** @internal */
  @state() originalTableData: unknown[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.originalTableData = [...this.tableData];
  }

  private _handleClick(e: Event, cell: ICellItem, row: IGeneric) {
    const eventName = `sgds-table-click`;
    const customClickEvent = this.emit(eventName, {
      detail: {
        target: cell,
        row
      },
      cancelable: true
    });

    if (customClickEvent.defaultPrevented) return;
    e.preventDefault();
  }

  private _mapElementType(cell: ICellItem, row: IGeneric) {
    const val = cell?.value;

    switch (cell?.type) {
      case "link":
        return html`
          <sgds-link slot="link" id="${cell.id}">
            <a href="${cell.href ?? "#"}" @click=${(e: Event) => this._handleClick(e, cell, row)}>${val}</a>
          </sgds-link>
        `;

      case "button":
        return html`
          <sgds-button
            id="${cell.id}"
            .fullWidth=${cell.fullWidth}
            variant=${cell.variant}
            size=${cell.size ?? "sm"}
            .active=${cell.active}
            .disabled=${cell.disabled}
            href=${cell.href}
            target=${cell.target}
            download=${cell.download}
            ariaLabel=${cell.ariaLabel}
            @click=${(e: Event) => this._handleClick(e, cell, row)}
          >
            ${val}
          </sgds-button>
        `;

      case "icon-button":
        return html`
          <sgds-icon-button
            id="${cell.id}"
            name=${cell.value}
            variant=${cell.variant}
            outlined=${cell.outlined}
            @click=${(e: Event) => this._handleClick(e, cell, row)}
          >
          </sgds-icon-button>
        `;

      case "badge":
        return html`
        <sgds-badge  
          id="${cell.id}"
          variant=${cell.variant}
          outlined=${cell.outlined}
        >
          ${val}
        </sgds-button>
      `;

      default:
        return val;
    }
  }

  private _renderRowData(row) {
    return this.rowHeader.map((header: IRowHeader) => {
      const cellValue = row[header.key];
      let ele = cellValue;

      if (typeof cellValue !== "string" && typeof cellValue !== "number") {
        if (Array.isArray(cellValue)) {
          // when there is multiple items
          ele = html`<div class='row'>${cellValue.map(item => this._mapElementType(item, row))}</dive>`;
        } else {
          // If provided is object
          ele = html`${this._mapElementType(cellValue, row)}`;
        }
      }

      return header.key ? html`<td>${isEmpty(ele) ? "-" : ele}</td>` : "";
    });
  }

  private _renderHeader() {
    return this.rowHeader.map(({ value }: IRowHeader) => {
      return html` <th>${value}</th> `;
    });
  }

  private _renderTable() {
    return html`
      ${this.headerPosition != "vertical"
        ? html`<thead>
            <tr>
              ${this._renderHeader()}
            </tr>
          </thead> `
        : ""}
      <tbody>
        ${this.tableData.map(
          (row, index) => html`
            <tr>
              ${this.headerPosition !== "horizontal" ? html`<th>${this.columnHeader[index]}</th>` : ""}
              ${this._renderRowData(row)}
            </tr>
          `
        )}
      </tbody>
    `;
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
        <table class="table">
          ${this._renderTable()}
        </table>
      </div>
    `;
  }
}

export default SgdsTable;
