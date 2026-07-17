import { html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsCheckbox } from "../Checkbox/sgds-checkbox";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import { watch } from "../../utils/watch";
import tableRowStyle from "./data-table.css";
import SgdsDataTableCell from "./sgds-data-table-cell";
import SgdsDataTableHead from "./sgds-data-table-head";
import { SgdsIcon } from "../Icon/sgds-icon";

/**
 * @summary A data table row. Set `expand` to enable an expandable content area beneath
 * the row, then place detail content in the `content` slot.
 *
 * @slot default - Insert `sgds-data-table-cell` or `sgds-data-table-head` elements.
 * @slot content - Content shown in the animated expand area beneath the row.
 *
 * @event sgds-show - Emitted when the expandable row begins to open.
 * @event sgds-after-show - Emitted after the expandable row open animation completes.
 * @event sgds-hide - Emitted when the expandable row begins to close.
 * @event sgds-after-hide - Emitted after the expandable row close animation completes.
 */
export class SgdsDataTableRow extends SgdsElement {
  static styles = [...SgdsElement.styles, tableRowStyle];

  /** @internal */
  static dependencies = {
    "sgds-checkbox": SgdsCheckbox,
    "sgds-data-table-cell": SgdsDataTableCell,
    "sgds-data-table-head": SgdsDataTableHead,
    "sgds-icon": SgdsIcon
  };

  /** Arbitrary data associated with this row. Returned in event detail on row selection. */
  @property({ type: Object, reflect: true }) rowData: Record<string, unknown> = {};

  /** When true, the row has an expandable content area toggled by a chevron. */
  @property({ type: Boolean, reflect: true }) expand = false;

  /** When true, the expandable content area is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** When true, the row is checked. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** @internal — set by `sgds-data-table` to show a checkbox cell on this row. */
  @property({ type: Boolean }) showCheckbox = false;

  /** @internal — set by `sgds-data-table` when at least one sibling row is expandable. */
  @property({ type: Boolean }) showExpandPlaceholder = false;

  /** @internal — per-column alignment injected by `sgds-data-table` from header cells. */
  @property({ attribute: false }) columnAlignments: Array<"left" | "right"> = [];
  /** @internal — set by `sgds-data-table` to indicate whether body rows exist. */
  @property({ type: Boolean }) hasDataRows = false;

  /** @internal */
  @query(".expandable-body") private _expandableBody!: HTMLElement;

  /** @internal */
  @query("sgds-checkbox") private _checkboxEl!: SgdsCheckbox;

  @state() private _isHeaderRow = false;
  private _cellSlotNames = new WeakMap<SgdsDataTableCell | SgdsDataTableHead, string>();
  private _lightDomObserver?: MutationObserver;

  /** The checkbox rendered inside this row, if `showCheckbox` is true. */
  get checkbox(): SgdsCheckbox | null {
    return this._checkboxEl ?? null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._lightDomObserver = new MutationObserver(() => this._handleLightDomChange());
    this._lightDomObserver.observe(this, { childList: true });
    this._handleLightDomChange();
  }

  disconnectedCallback() {
    this._lightDomObserver?.disconnect();
    super.disconnectedCallback();
  }

  firstUpdated() {
    if (this._expandableBody) {
      this._expandableBody.hidden = !this.open;
    }
  }

  @watch("open", { waitUntilFirstUpdate: true })
  async handleExpandedChange() {
    if (this.open) {
      const sgdsShow = this.emit("sgds-show", { cancelable: true });
      if (sgdsShow.defaultPrevented) {
        this.open = false;
        return;
      }
      await stopAnimations(this._expandableBody);
      this._expandableBody.hidden = false;
      const { keyframes, options } = getAnimation(this, "row.expand.show");
      await animateTo(
        this._expandableBody,
        shimKeyframesHeightAuto(keyframes, this._expandableBody.scrollHeight),
        options
      );
      this.emit("sgds-after-show");
    } else {
      const sgdsHide = this.emit("sgds-hide", { cancelable: true });
      if (sgdsHide.defaultPrevented) {
        this.open = true;
        return;
      }
      await stopAnimations(this._expandableBody);
      const { keyframes, options } = getAnimation(this, "row.expand.hide");
      await animateTo(
        this._expandableBody,
        shimKeyframesHeightAuto(keyframes, this._expandableBody.scrollHeight),
        options
      );
      this._expandableBody.hidden = true;
      this.emit("sgds-after-hide");
    }
  }

  @watch("checked")
  async handleCheckedChange() {
    if (this.checked) {
      this.emit("i-sgds-change", { detail: { checked: true } });
    }
  }

  /** Opens the expandable content area. */
  public async show() {
    if (this.open) return;
    this.open = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Closes the expandable content area. */
  public async hide() {
    if (!this.open) return;
    this.open = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  /** @internal — returns visible text content for a body cell by visual column index. */
  public getCellText(columnIndex: number) {
    const cells = this._getCells().filter(cell => cell instanceof SgdsDataTableCell) as SgdsDataTableCell[];
    const cell = cells[columnIndex];
    if (!cell) return "";
    return (cell.textContent ?? "").trim();
  }

  private _getCells() {
    return Array.from(this.children).filter(
      child => child instanceof SgdsDataTableCell || child instanceof SgdsDataTableHead
    ) as Array<SgdsDataTableCell | SgdsDataTableHead>;
  }

  private _syncCellSlots(cells: Array<SgdsDataTableCell | SgdsDataTableHead>) {
    cells.forEach(cell => {
      const index = cells.indexOf(cell);
      const slotName = `cell-${index}`;
      this._cellSlotNames.set(cell, slotName);
      if (cell.getAttribute("slot") !== slotName) {
        cell.setAttribute("slot", slotName);
      }
    });
  }

  private _handleLightDomChange() {
    const cells = this._getCells();
    this._syncCellSlots(cells);
    this._isHeaderRow = cells.some(cell => cell instanceof SgdsDataTableHead);
    this.requestUpdate();
  }

  private _onCheckboxChange(e: CustomEvent) {
    this.emit("i-sgds-change", { detail: { checked: (e.target as SgdsCheckbox).checked } });
  }

  private _toggleExpand() {
    this.open ? this.hide() : this.show();
  }

  private _onExpandKeyDown(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    this._toggleExpand();
  }

  private _onSortKeyDown(e: KeyboardEvent, header: SgdsDataTableHead) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    header.handleSortClick();
  }

  private _renderCell(el: SgdsDataTableCell | SgdsDataTableHead, columnIndex: number) {
    const slotName = this._cellSlotNames.get(el);

    if (el instanceof SgdsDataTableHead) {
      return html`<th
        width=${ifDefined(el.width)}
        colspan=${ifDefined(el.colspan)}
        rowspan=${ifDefined(el.rowspan)}
        aria-sort=${ifDefined(el.ariasort)}
        scope="col"
        tabindex=${ifDefined(el.sorting ? "0" : undefined)}
        ?data-sorting=${el.sorting}
        @click=${el.sorting ? () => el.handleSortClick() : nothing}
        @keydown=${el.sorting ? (e: KeyboardEvent) => this._onSortKeyDown(e, el) : nothing}
      >
        <div class="data-table-head ${el.textAlign === "right" ? "align-right" : "align-left"}">
          ${slotName ? html`<slot name=${slotName}></slot>` : nothing}
          ${el.sorting
            ? html`
                <button
                  type="button"
                  class="sort-button ${el.ariasort === "none" ? "" : "active"}"
                  aria-label=${el.ariasort === "descending" ? "Sort descending" : "Sort ascending"}
                  ?disabled=${!this.hasDataRows}
                >
                  <sgds-icon
                    class="sort-icon"
                    name=${el.ariasort === "descending" ? "sort-descending" : "sort-ascending"}
                    size="sm"
                  ></sgds-icon>
                </button>
              `
            : nothing}
        </div>
      </th>`;
    }

    const cellAlignment = this.columnAlignments[columnIndex] ?? "left";
    return html`<td colspan=${ifDefined(el.colspan)} rowspan=${ifDefined(el.rowspan)}>
      <div class="data-table-cell ${cellAlignment === "right" ? "align-right" : "align-left"}">
        ${slotName ? html`<slot name=${slotName}></slot>` : nothing}
      </div>
    </td>`;
  }

  private _renderExpandCell() {
    if (this._isHeaderRow) {
      return html`<th class="control-cell" scope="col"></th>`;
    }

    return html`<td class="control-cell" @click=${this._toggleExpand} @keydown=${this._onExpandKeyDown} tabindex="0">
      <div class="data-table-cell expand-cell">
        <sgds-icon name=${this.open ? "chevron-up" : "chevron-down"} size="md"></sgds-icon>
      </div>
    </td>`;
  }

  private _renderExpandPlaceholder() {
    return this._isHeaderRow ? html`<th class="control-cell" scope="col"></th>` : html`<td class="control-cell"></td>`;
  }

  private _renderCheckboxCell() {
    return this._isHeaderRow
      ? html`<th class="control-cell" scope="col">
          <div class="data-table-cell checkbox-cell">
            <sgds-checkbox .checked=${this.checked} @sgds-change=${this._onCheckboxChange}></sgds-checkbox>
          </div>
        </th>`
      : html`<td class="control-cell">
          <div class="data-table-cell checkbox-cell">
            <sgds-checkbox .checked=${this.checked} @sgds-change=${this._onCheckboxChange}></sgds-checkbox>
          </div>
        </td>`;
  }

  render() {
    const cells = this._getCells();
    const totalCols = cells.length + (this.showCheckbox ? 1 : 0) + (this.expand || this.showExpandPlaceholder ? 1 : 0);
    const rowPart = this._isHeaderRow ? "row row-header" : "row row-body";

    return html`
      <tr part=${rowPart} ?data-header-row=${this._isHeaderRow} class=${this.open ? "active" : ""}>
        ${this.expand
          ? this._renderExpandCell()
          : this.showExpandPlaceholder
          ? this._renderExpandPlaceholder()
          : nothing}
        ${this.showCheckbox ? this._renderCheckboxCell() : nothing}
        ${(() => {
          let visualColumnIndex = 0;
          return cells.map(el => {
            const renderedCell = this._renderCell(el, visualColumnIndex);
            const span = Number(el.colspan) > 0 ? Number(el.colspan) : 1;
            visualColumnIndex += span;
            return renderedCell;
          });
        })()}
      </tr>

      ${this.expand
        ? html`
            <tr class="expandable-row">
              <td colspan=${totalCols} class="expandable-td">
                <div class="expandable-body">
                  <div class="expandable-content">
                    <slot name="content"></slot>
                  </div>
                </div>
              </td>
            </tr>
          `
        : nothing}
    `;
  }
}

setDefaultAnimation("row.expand.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 250, easing: "ease-in-out" }
});

setDefaultAnimation("row.expand.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 250, easing: "ease-in-out" }
});

export default SgdsDataTableRow;
