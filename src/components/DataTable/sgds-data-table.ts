import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import tableStyle from "./data-table.css";
import SgdsPagination from "../Pagination/sgds-pagination";
import type { ISgdsPaginationPageChangeEventDetail } from "../Pagination/sgds-pagination";
import SgdsDataTableRow from "./sgds-data-table-row";
import SgdsDataTableCell from "./sgds-data-table-cell";
import SgdsDataTableHead from "./sgds-data-table-head";
import SgdsSpinner from "../Spinner/sgds-spinner";

/**
 * @event sgds-row-select - Emitted when row checkboxes change. Detail: `{ selected: rowData[] }`
 * @event sgds-sort - Re-emitted from `sgds-data-table-head` when a sortable column header is clicked. Detail: `{ key: string; direction: "ascending" | "descending" | "none" }`
 * @event sgds-page-change - Emitted when pagination changes page.
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
    "sgds-data-table-head": SgdsDataTableHead,
    "sgds-spinner": SgdsSpinner
  };

  /** If true, renders a checkbox column for row selection. */
  @property({ type: Boolean }) multiSelect = false;

  /** Total number of data items (for server-side pagination). */
  @property({ type: Number }) dataLength = 0;

  /** Current page (1-based). */
  @property({ type: Number }) currentPage = 1;

  /** Number of rows per page. */
  @property({ type: Number }) itemsPerPage = 5;

  /** Custom text shown on the footer's left side. */
  @property({ type: String }) footerText = "";

  /** If true, hides the footer (summary text and pagination controls). */
  @property({ type: Boolean }) hideFooter = false;

  /** When true in server mode, shows a loading state and hides body rows. */
  @property({ type: Boolean }) isLoading = false;

  /**
   * Pagination mode. `client` (default) slices rows and renders pagination controls.
   * `server` renders all slotted rows as-is — the caller is responsible for passing
   * the correct page of data and handling `sgds-page-change` externally.
   */
  @property({ type: String }) mode: "client" | "server" = "client";

  @state() private tableRows: SgdsDataTableRow[] = [];
  @state() private headerRows: SgdsDataTableRow[] = [];

  private _headerCells: SgdsDataTableHead[] = [];
  private _unsortedRows: SgdsDataTableRow[] = [];

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
    if (old) row.removeEventListener("i-sgds-change", old);

    const handler: EventListener = (e: Event) => {
      const { checked } = (e as CustomEvent<{ checked: boolean }>).detail;
      if (this.headerRows.includes(row)) {
        this.tableRows.forEach(r => {
          if (r.checkbox) r.checkbox.checked = checked;
        });
      } else {
        this._updateHeaderCheckbox();
      }
      this._emitRowSelect();
    };

    this._rowHandlers.set(row, handler);
    row.addEventListener("i-sgds-change", handler);
  }

  private _configureRows() {
    const hasExpandable = this.tableRows.some(r => r.expandable);

    this.headerRows.forEach(row => {
      row.showCheckbox = this.multiSelect;
      row.showExpandPlaceholder = hasExpandable;
      if (this.multiSelect) this._attachRowListener(row);
    });

    this.tableRows.forEach(row => {
      row.showCheckbox = this.multiSelect;
      row.showExpandPlaceholder = !row.expandable && hasExpandable;
      if (this.multiSelect) this._attachRowListener(row);
    });

    this._applyColumnAlignment();
  }

  private _applyColumnAlignment() {
    const headerAlignments = this._headerCells.map(header => header.textAlign ?? "left");

    this.headerRows.forEach(row => {
      row.columnAlignments = [...headerAlignments];
    });

    this.tableRows.forEach(row => {
      row.columnAlignments = [...headerAlignments];
    });
  }

  private _extractCellText(row: SgdsDataTableRow, columnIndex: number) {
    const cells = Array.from(row.children).filter(child => child.tagName.toLowerCase() === "sgds-data-table-cell");
    const cell = cells[columnIndex];
    return (cell?.textContent || "").trim();
  }

  private _toComparableValue(row: SgdsDataTableRow, key: string, columnIndex: number) {
    if (key && row.rowData && key in row.rowData) {
      return row.rowData[key];
    }

    return this._extractCellText(row, columnIndex);
  }

  private _compareValues(left: unknown, right: unknown, direction: "ascending" | "descending") {
    if (left === right) return 0;

    const leftNumber = Number(left);
    const rightNumber = Number(right);
    const bothNumeric = Number.isFinite(leftNumber) && Number.isFinite(rightNumber);

    if (bothNumeric) {
      return direction === "ascending" ? leftNumber - rightNumber : rightNumber - leftNumber;
    }

    const cmp = String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: "base" });
    return direction === "ascending" ? cmp : -cmp;
  }

  private _resetOtherHeaderSortStates(activeHeader: SgdsDataTableHead | null) {
    this._headerCells.forEach(header => {
      if (header !== activeHeader && header.sortable) {
        header.ariasort = "none";
      }
    });
  }

  private _handleSort(e: Event) {
    const { key, direction } = (e as CustomEvent<{ key: string; direction: "ascending" | "descending" | "none" }>)
      .detail;
    const activeHeader = e.target instanceof SgdsDataTableHead ? e.target : null;
    const columnIndex = activeHeader ? this._headerCells.indexOf(activeHeader) : -1;

    this._resetOtherHeaderSortStates(activeHeader);

    if (direction === "none") {
      this.tableRows = [...this._unsortedRows];
      this._syncDomRowOrder();
      this._updateVisibleRows();
      return;
    }

    if (columnIndex < 0) return;

    this.tableRows = [...this.tableRows].sort((left, right) => {
      const leftValue = this._toComparableValue(left, key, columnIndex);
      const rightValue = this._toComparableValue(right, key, columnIndex);
      return this._compareValues(leftValue, rightValue, direction);
    });

    this._syncDomRowOrder();
    this._updateVisibleRows();
  }

  private _syncDomRowOrder() {
    const parent = this.tableRows[0]?.parentElement;
    if (!parent) return;
    this.tableRows.forEach(row => parent.appendChild(row));
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

    this._headerCells = this.headerRows.reduce<SgdsDataTableHead[]>((acc, row) => {
      const headers = Array.from(row.children).filter(
        child => child instanceof SgdsDataTableHead
      ) as SgdsDataTableHead[];
      acc.push(...headers);
      return acc;
    }, []);
    this._unsortedRows = [...this.tableRows];

    this._headerCells.forEach(header => {
      if (header.sortable && !header.ariasort) {
        header.ariasort = "none";
      }
    });

    this._configureRows();
    this._updateVisibleRows();
  }

  private _updateVisibleRows() {
    if (this.mode === "server") {
      this.tableRows.forEach(row => (row.style.display = this.isLoading ? "none" : ""));
      return;
    }

    const total = this.dataLength || this.tableRows.length;
    const lastPage = Math.max(1, Math.ceil(total / this.itemsPerPage));
    if (this.currentPage > lastPage) {
      this.currentPage = lastPage;
      return;
    }
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const visible = new Set(this.tableRows.slice(start, start + this.itemsPerPage));
    this.tableRows.forEach(row => (row.style.display = visible.has(row) ? "" : "none"));
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("currentPage") || changed.has("itemsPerPage") || changed.has("mode") || changed.has("isLoading")) {
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
          <slot @slotchange=${this._handleSlotChange} @sgds-sort=${this._handleSort} class="table"></slot>
          ${this.isLoading
            ? html`<div class="loading" role="status" aria-live="polite">
                <div class="loading-menu"><sgds-spinner size="xs" tone="brand"></sgds-spinner>Loading...</div>
              </div>`
            : nothing}
        </div>

        ${this.hideFooter
          ? nothing
          : html`<div class="footer">
              ${this.footerText || html`<span>Showing ${start + 1} to ${end} of ${total} results</span>`}
              <sgds-pagination
                .dataLength=${total}
                .currentPage=${this.currentPage}
                .itemsPerPage=${this.itemsPerPage}
                size="sm"
                @sgds-page-change=${(e: CustomEvent<ISgdsPaginationPageChangeEventDetail>) => {
                  this.currentPage = e.detail.currentPage;
                  this.emit("sgds-page-change");
                }}
              ></sgds-pagination>
            </div>`}
      </div>
    `;
  }
}

export default SgdsDataTable;
