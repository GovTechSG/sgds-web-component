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
 * @summary A data table container with pagination, row selection, loading, and sorting support.
 *
 * @slot default - Insert one or more `sgds-data-table-row` elements.
 * @slot no-data - Custom content rendered when no body rows are available and `isLoading` is false.
 *
 * @event sgds-row-select - Emitted when row checkboxes change. Detail: `{ selected: rowData[] }`.
 * @event sgds-sort - Emitted when `serverSort` is true and a sorting column header is clicked.
 * Detail: `{ key: string; direction: "ascending" | "descending" | "none" }`.
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

  /** When true, shows a loading state and hides body rows. */
  @property({ type: Boolean }) isLoading = false;

  /** When true, emits sort events for external handling instead of local sorting. */
  @property({ type: Boolean }) serverSort = false;

  /**
   * Controls the CSS `table-layout` algorithm.
   * Use "auto" to let the browser size columns based on content, or "fixed" to distribute column widths evenly regardless of content.
   * @type {"auto" | "fixed"}
   * @default "auto"
   */
  @property({ type: String, reflect: true }) layout: "auto" | "fixed" = "auto";

  /**
   * Pagination mode. `client` (default) slices rows and renders pagination controls.
   * `server` renders all slotted rows as-is — the caller is responsible for passing
   * the correct page of data and handling `sgds-page-change` externally.
   */
  @property({ type: String }) mode: "client" | "server" = "client";

  @state() private tableRows: SgdsDataTableRow[] = [];
  @state() private headerRows: SgdsDataTableRow[] = [];

  private _headerCells: SgdsDataTableHead[] = [];
  private _initialRowPositions = new WeakMap<SgdsDataTableRow, number>();
  private _hasCapturedInitialRowPositions = false;

  private _rowHandlers = new WeakMap<SgdsDataTableRow, EventListener>();

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "table");
  }

  private _isRowChecked(row: SgdsDataTableRow) {
    return row.checked || row.checkbox?.checked === true;
  }

  private _updateHeaderCheckbox() {
    const checkedCount = this.tableRows.filter(r => this._isRowChecked(r)).length;

    const allChecked = checkedCount === this.tableRows.length && checkedCount > 0;

    this.headerRows.forEach(r => {
      r.checked = allChecked;
      if (r.checkbox) {
        r.checkbox.checked = allChecked;
        r.checkbox.indeterminate = checkedCount > 0 && !allChecked;
      }
    });
  }

  private async _syncHeaderCheckboxAfterRender() {
    if (!this.multiSelect || this.headerRows.length === 0) return;

    const rows = [...this.headerRows, ...this.tableRows];
    await Promise.all(rows.map(row => row.updateComplete));
    this._updateHeaderCheckbox();
  }

  private _emitRowSelect() {
    const selected = this.tableRows.filter(r => this._isRowChecked(r)).map(r => r.rowData);
    this.emit("sgds-row-select", { detail: { selected } });
  }

  private _attachRowListener(row: SgdsDataTableRow) {
    const old = this._rowHandlers.get(row);
    if (old) row.removeEventListener("i-sgds-change", old);

    const handler: EventListener = (e: Event) => {
      const { checked } = (e as CustomEvent<{ checked: boolean }>).detail;

      if (this.headerRows.includes(row)) {
        this.tableRows.forEach(r => {
          r.checked = checked;
          if (r.checkbox) r.checkbox.checked = checked;
        });
      } else {
        row.checked = checked;
        this._updateHeaderCheckbox();
      }
      this._emitRowSelect();
    };

    this._rowHandlers.set(row, handler);
    row.addEventListener("i-sgds-change", handler);
  }

  private _configureRows() {
    const hasExpand = this.tableRows.some(r => r.expand);
    const hasDataRows = this.tableRows.length > 0;

    this.headerRows.forEach(row => {
      row.showCheckbox = this.multiSelect;
      row.showExpandPlaceholder = hasExpand;
      row.hasDataRows = hasDataRows;
      if (this.multiSelect) this._attachRowListener(row);
    });

    this.tableRows.forEach(row => {
      row.showCheckbox = this.multiSelect;
      row.showExpandPlaceholder = !row.expand && hasExpand;
      if (this.multiSelect) this._attachRowListener(row);
    });

    if (this.multiSelect) {
      this._syncHeaderCheckboxAfterRender();
    }

    this._applyColumnAlignment();
  }

  private _applyColumnAlignment() {
    const headerAlignments = this._headerCells.reduce<Array<"left" | "right">>((acc, header) => {
      const span = Number(header.colspan) > 0 ? Number(header.colspan) : 1;
      const alignment = header.textAlign ?? "left";
      for (let i = 0; i < span; i++) {
        acc.push(alignment);
      }
      return acc;
    }, []);

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
      if (header !== activeHeader && header.sorting) {
        header.ariasort = "none";
      }
    });
  }

  private _getRowsInInitialPositionOrder(rows: SgdsDataTableRow[]) {
    return [...rows].sort((left, right) => {
      const leftPosition = this._initialRowPositions.get(left);
      const rightPosition = this._initialRowPositions.get(right);

      if (leftPosition === undefined && rightPosition === undefined) return 0;
      if (leftPosition === undefined) return 1;
      if (rightPosition === undefined) return -1;
      return leftPosition - rightPosition;
    });
  }

  private _captureInitialRowPositions(rows: SgdsDataTableRow[]) {
    if (this._hasCapturedInitialRowPositions) return;

    rows.forEach((row, index) => {
      this._initialRowPositions.set(row, index);
    });

    this._hasCapturedInitialRowPositions = true;
  }

  private _handleSort(e: Event) {
    if (!(e.target instanceof SgdsDataTableHead) || !e.target.sorting) return;

    const { key, direction } = (e as CustomEvent<{ key: string; direction: "ascending" | "descending" | "none" }>)
      .detail;
    const activeHeader = e.target;
    const columnIndex = activeHeader ? this._headerCells.indexOf(activeHeader) : -1;

    this._resetOtherHeaderSortStates(activeHeader);

    if (this.serverSort) {
      e.stopPropagation();
      this.emit("sgds-sort", { detail: { key, direction } });
      return;
    }

    if (columnIndex < 0) return;

    if (direction === "none") {
      this.tableRows = this._getRowsInInitialPositionOrder(this.tableRows);
      this._syncDomRowOrder();
      this._updateVisibleRows();
      return;
    }

    if (this.mode === "client") {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const nextRows = [...this.tableRows];

      const sortedVisibleRows = nextRows.slice(start, end).sort((left, right) => {
        const leftValue = this._toComparableValue(left, key, columnIndex);
        const rightValue = this._toComparableValue(right, key, columnIndex);
        return this._compareValues(leftValue, rightValue, direction);
      });
      nextRows.splice(start, sortedVisibleRows.length, ...sortedVisibleRows);

      this.tableRows = nextRows;
      this._syncDomRowOrder();
      this._updateVisibleRows();
      return;
    }

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

    this._captureInitialRowPositions(this.tableRows);

    this._headerCells.forEach(header => {
      if (header.sorting && !header.ariasort) {
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

    if (this.multiSelect && (changed.has("tableRows") || changed.has("headerRows"))) {
      this._syncHeaderCheckboxAfterRender();
    }
  }

  render() {
    const total = this.dataLength || this.tableRows.length;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, total);
    const displayStart = total === 0 ? 0 : start + 1;
    const showNoData = !this.isLoading && this.tableRows.length === 0;

    return html`
      <div class="data-table">
        <div>
          <slot @slotchange=${this._handleSlotChange} @i-sgds-sort=${this._handleSort} class="table"></slot>
          ${this.isLoading
            ? html`<div class="loading" role="status" aria-live="polite">
                <div class="loading-menu"><sgds-spinner size="xs" tone="brand"></sgds-spinner>Loading...</div>
              </div>`
            : showNoData
            ? html`<slot name="no-data" class="no-data" role="status" aria-live="polite">No data</slot>`
            : nothing}
        </div>

        ${this.hideFooter
          ? nothing
          : html`<div class="footer">
              ${this.footerText || html`<span>Showing ${displayStart} to ${end} of ${total} results</span>`}
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
