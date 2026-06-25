import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import tableStyle from "./data-table.css";
import SgdsPagination from "../Pagination/sgds-pagination";
import type { ISgdsPaginationPageChangeEventDetail } from "../Pagination/sgds-pagination";
import SgdsDataTableRow from "./sgds-data-table-row";
import SgdsDataTableCell from "./sgds-data-table-cell";
import SgdsDataTableHead from "./sgds-data-table-head";

/**
 * @event sgds-row-select - Emitted when row checkboxes change. Detail: `{ selected: rowData[] }`
 */
export class SgdsDataTable extends SgdsElement {
  static styles = [
    ...SgdsElement.styles,
    tableStyle,
    css`
      :host {
        display: block;
      }
    `
  ];

  /** @internal */
  static dependencies = {
    "sgds-pagination": SgdsPagination,
    "sgds-data-table-cell": SgdsDataTableCell,
    "sgds-data-table-head": SgdsDataTableHead
  };

  /** If true, renders a checkbox column for row selection. */
  @property({ type: Boolean }) multiSelect = false;

  /** Total number of data items (for server-side pagination). */
  @property({ type: Number }) dataLength = 0;

  /** Current page (1-based). */
  @property({ type: Number }) currentPage = 1;

  /** Number of rows per page. */
  @property({ type: Number }) itemsPerPage = 5;

  @state() private tableRows: SgdsDataTableRow[] = [];
  @state() private headerRows: SgdsDataTableRow[] = [];

  private _rowHandlers = new WeakMap<SgdsDataTableRow, EventListener>();

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "table");
  }

  private _updateHeaderCheckbox() {
    const checkedCount = this.tableRows.filter(r => r.checkbox?.checked).length;
    const allChecked = checkedCount === this.tableRows.length && checkedCount > 0;
    this.headerRows.forEach(r => {
      if (r.checkbox) {
        r.checkbox.checked = allChecked;
        r.checkbox.indeterminate = checkedCount > 0 && !allChecked;
      }
    });
  }

  private _emitRowSelect() {
    const selected = this.tableRows.filter(r => r.checkbox?.checked).map(r => r.rowData);
    this.emit("sgds-row-select", { detail: { selected } });
  }

  private _attachRowListener(row: SgdsDataTableRow) {
    const old = this._rowHandlers.get(row);
    if (old) row.removeEventListener("sgds-row-checkbox-change", old);

    const handler: EventListener = (e: Event) => {
      const { checked } = (e as CustomEvent<{ checked: boolean }>).detail;
      if (row.isHeaderRow) {
        this.tableRows.forEach(r => {
          if (r.checkbox) r.checkbox.checked = checked;
        });
      } else {
        this._updateHeaderCheckbox();
      }
      this._emitRowSelect();
    };

    this._rowHandlers.set(row, handler);
    row.addEventListener("sgds-row-checkbox-change", handler);
  }

  private _configureRows() {
    const hasExpandable = this.tableRows.some(r => r.expandable);

    this.headerRows.forEach(row => {
      row.isHeaderRow = true;
      row.showCheckbox = this.multiSelect;
      row.showExpandPlaceholder = hasExpandable;
      if (this.multiSelect) this._attachRowListener(row);
    });

    this.tableRows.forEach(row => {
      row.isHeaderRow = false;
      row.showCheckbox = this.multiSelect;
      row.showExpandPlaceholder = !row.expandable && hasExpandable;
      if (this.multiSelect) this._attachRowListener(row);
    });
  }

  private _handleSlotChange(e: Event) {
    const slotted = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(el => el instanceof SgdsDataTableRow) as SgdsDataTableRow[];

    this.headerRows = slotted.filter(row =>
      Array.from(row.children).some(child => child.tagName.toLowerCase() === "sgds-data-table-head")
    );
    this.tableRows = slotted.filter(row =>
      Array.from(row.children)
        .filter(child => !child.hasAttribute("slot"))
        .every(child => child.tagName.toLowerCase() === "sgds-data-table-cell")
    );

    this._configureRows();
    this._updateVisibleRows();
  }

  private _updateVisibleRows() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const visible = new Set(this.tableRows.slice(start, start + this.itemsPerPage));
    this.tableRows.forEach(row => (row.hidden = !visible.has(row)));
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("currentPage") || changed.has("itemsPerPage")) {
      this._updateVisibleRows();
    }
    if (changed.has("multiSelect")) {
      this._configureRows();
    }
  }

  render() {
    const total = this.dataLength || this.tableRows.length;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, total);

    return html`
      <div class="data-table">
        <div>
          <slot @slotchange=${this._handleSlotChange} class="table"></slot>
        </div>
        <div class="footer">
          <span>Showing ${start + 1} to ${end} of ${total} results</span>
          <sgds-pagination
            .dataLength=${total}
            .currentPage=${this.currentPage}
            .itemsPerPage=${this.itemsPerPage}
            size="sm"
            @sgds-page-change=${(e: CustomEvent<ISgdsPaginationPageChangeEventDetail>) => {
              this.currentPage = e.detail.currentPage;
            }}
          ></sgds-pagination>
        </div>
      </div>
    `;
  }
}

export default SgdsDataTable;
