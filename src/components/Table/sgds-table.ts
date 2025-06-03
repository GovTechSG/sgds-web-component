import { html, TemplateResult } from "lit";

import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import tableStyle from "./table.css";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary The use of a table is to organise a collections of data into readable rows
 */

export interface IGeneric {
  [key: string]: string;
}
export interface IRender {
  id: string;
  type: "link" | "button" | "icon-button" | "badge";
  props: IGeneric;
  click?: unknown;
}
export interface IRowHeader {
  key: string;
  value: string;
  render?: IRender[] | IRender;
}

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
   * Populate data cells using Arrays
   */
  @property({ type: Array }) tableData: unknown[] = [];

  /**
   * Defines the placement of headers in the table (horizontal, vertical, or both)
   */
  @property({ type: String, reflect: true }) headerPosition: HeaderPosition = "horizontal";

  @property() onClick;

  /** @internal */
  @state() originalTableData: unknown[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.originalTableData = [...this.tableData];
  }

  private _handleClick(e: Event, row: IGeneric, render: IRender) {
    const eventName = `sgds-table-click-${render.id ?? render.type}`;
    const customClickEvent = this.emit(eventName, { detail: row, cancelable: true });

    if (customClickEvent.defaultPrevented) return;
    e.preventDefault();
  }

  private _mapElementType(row: IGeneric, key: string, render: IRender) {
    const val = html`${row[key]}`;
    let ele: TemplateResult = val;
    const props: IGeneric = render?.props ?? {};
    const variant = props.variant_key ? row[props.variant_key] : props.variant;

    switch (render?.type) {
      case "link":
        ele = html`
          <sgds-link slot="link" id="${render.id}">
            <a href="${props.url ?? "#"}" @click=${(e: Event) => this._handleClick(e, row, render)}>${val}</a>
          </sgds-link>
        `;
        break;

      case "button":
        ele = html`
          <sgds-button
            id="${render.id}"
            variant=${variant}
            color=${props.color}
            size=${props.size ?? "sm"}
            @click=${(e: Event) => this._handleClick(e, row, render)}
          >
            ${val}
          </sgds-button>
        `;
        break;

      case "icon-button":
        ele = html`
          <sgds-icon-button
            id="${render.id}"
            name=${props.name}
            variant=${variant}
            color=${props.color}
            size=${props.size ?? "sm"}
            @click=${(e: Event) => this._handleClick(e, row, render)}
          >
          </sgds-icon-button>
        `;
        break;

      case "badge":
        ele = html`
        <sgds-badge  
          id="${render.id}"
          variant=${variant}
          outlined=${props.outlined}
        >
          ${val}
        </sgds-button>
      `;
        break;
    }

    return ele;
  }

  private _renderRowData(row) {
    return this.rowHeader.map((header: IRowHeader) => {
      const multipleItems = Array.isArray(header.render);
      const ele = multipleItems
        ? html`
            <div class="row">
              ${(header.render as IRender[]).map(ren => this._mapElementType(row, header.key, ren))}
            </div>
          `
        : this._mapElementType(row, header.key, header.render as IRender);

      return html`<td>${ele}</td>`;
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
              ${this.headerPosition === "both" ? html`<th></th>` : ""} ${this._renderHeader()}
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
