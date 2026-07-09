import { html, nothing } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
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
  @property({ type: Object }) rowData: Record<string, unknown> = {};

  /** When true, the row has an expandable content area toggled by a chevron. */
  @property({ type: Boolean }) expand = false;

  /** When true, the expandable content area is open. */
  @property({ type: Boolean }) open = false;

  /** @internal — set by `sgds-data-table` to show a checkbox cell on this row. */
  @property({ type: Boolean }) showCheckbox = false;

  /** @internal — set by `sgds-data-table` when at least one sibling row is expandable. */
  @property({ type: Boolean }) showExpandPlaceholder = false;

  /** @internal — per-column alignment injected by `sgds-data-table` from header cells. */
  @property({ attribute: false }) columnAlignments: Array<"left" | "right"> = [];

  /** @internal */
  @query(".expandable-body") private _expandableBody!: HTMLElement;

  /** @internal */
  @query("sgds-checkbox") private _checkboxEl!: SgdsCheckbox;

  @queryAssignedElements({ flatten: true })
  private _assignedCells!: Array<SgdsDataTableCell | SgdsDataTableHead>;

  /** The checkbox rendered inside this row, if `showCheckbox` is true. */
  get checkbox(): SgdsCheckbox | null {
    return this._checkboxEl ?? null;
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

  private _onSlotChange() {
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
    const children = Array.from(el.childNodes).map(n => n.cloneNode(true));

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
          ${children}
          ${el.sorting
            ? html`<div class="sort">
                <sgds-icon
                  class="sort-icon ${el.ariasort === "ascending" ? "active" : ""}"
                  name="chevron-up"
                  size="sm"
                ></sgds-icon>
                <sgds-icon
                  class="sort-icon ${el.ariasort === "descending" ? "active" : ""}"
                  name="chevron-down"
                  size="sm"
                ></sgds-icon>
              </div>`
            : nothing}
        </div>
      </th>`;
    }

    const cellAlignment = this.columnAlignments[columnIndex] ?? "left";
    return html`<td colspan=${ifDefined(el.colspan)} rowspan=${ifDefined(el.rowspan)}>
      <div class="data-table-cell ${cellAlignment === "right" ? "align-right" : "align-left"}">${children}</div>
    </td>`;
  }

  private _renderExpandCell(isHeaderRow: boolean) {
    if (isHeaderRow) {
      return html`<th class="control-cell" scope="col"></th>`;
    }

    return html`<td class="control-cell" @click=${this._toggleExpand} @keydown=${this._onExpandKeyDown} tabindex="0">
      <div class="data-table-cell expand-cell">
        <sgds-icon name=${this.open ? "chevron-up" : "chevron-down"} size="md"></sgds-icon>
      </div>
    </td>`;
  }

  private _renderExpandPlaceholder(isHeaderRow: boolean) {
    return isHeaderRow ? html`<th class="control-cell" scope="col"></th>` : html`<td class="control-cell"></td>`;
  }

  private _renderCheckboxCell(isHeaderRow: boolean) {
    return isHeaderRow
      ? html`<th class="control-cell" scope="col">
          <div class="data-table-cell checkbox-cell">
            <sgds-checkbox @sgds-change=${this._onCheckboxChange}></sgds-checkbox>
          </div>
        </th>`
      : html`<td class="control-cell">
          <div class="data-table-cell checkbox-cell">
            <sgds-checkbox @sgds-change=${this._onCheckboxChange}></sgds-checkbox>
          </div>
        </td>`;
  }

  private _renderHiddenSlotCell(isHeaderRow: boolean) {
    return isHeaderRow
      ? html`<th hidden style="display:none"><slot @slotchange=${this._onSlotChange}></slot></th>`
      : html`<td hidden style="display:none"><slot @slotchange=${this._onSlotChange}></slot></td>`;
  }

  render() {
    const cells = this._assignedCells ?? [];
    const isHeaderRow = cells.some(cell => cell instanceof SgdsDataTableHead);
    const totalCols = cells.length + (this.showCheckbox ? 1 : 0) + (this.expand || this.showExpandPlaceholder ? 1 : 0);

    return html`
      <tr ?data-header-row=${isHeaderRow} class=${this.open ? "active" : ""}>
        ${this._renderHiddenSlotCell(isHeaderRow)}
        ${this.expand
          ? this._renderExpandCell(isHeaderRow)
          : this.showExpandPlaceholder
          ? this._renderExpandPlaceholder(isHeaderRow)
          : nothing}
        ${this.showCheckbox ? this._renderCheckboxCell(isHeaderRow) : nothing}
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
