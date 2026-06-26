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
 * @summary A data table row. Add `expandable` to enable an expandable content area beneath
 * the row — place content in the `expandable-content` slot.
 *
 * @slot default - Insert `sgds-data-table-cell` or `sgds-data-table-head` elements.
 * @slot expandable-content - Content shown in the animated expand area beneath the row.
 *
 * @event sgds-show - Emitted when the expandable row begins to open.
 * @event sgds-after-show - Emitted after the expandable row open animation completes.
 * @event sgds-hide - Emitted when the expandable row begins to close.
 * @event sgds-after-hide - Emitted after the expandable row close animation completes.
 * @event sgds-row-checkbox-change - Emitted when the row checkbox changes. Detail: `{ checked: boolean }`
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

  /** @internal */
  @query(".expandable-body") private _expandableBody!: HTMLElement;

  /** @internal */
  @query("sgds-checkbox") private _checkboxEl!: SgdsCheckbox;

  /** Arbitrary data associated with this row. Returned in event detail on row selection. */
  @property({ type: Object }) rowData: Record<string, unknown> = {};

  /** When true, the row has an expandable content area toggled by a chevron. */
  @property({ type: Boolean, reflect: true }) expandable = false;

  /** @internal — set by `sgds-data-table` to show a checkbox cell on this row. */
  @property({ type: Boolean }) showCheckbox = false;

  /** @internal — set by `sgds-data-table` when at least one sibling row is expandable. */
  @property({ type: Boolean }) showExpandPlaceholder = false;

  /** When true, the expandable content area is open. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  @queryAssignedElements({ flatten: true })
  private _assignedCells!: Array<SgdsDataTableCell | SgdsDataTableHead>;

  /** The checkbox rendered inside this row, if `showCheckbox` is true. */
  get checkbox(): SgdsCheckbox | null {
    return this._checkboxEl ?? null;
  }

  firstUpdated() {
    if (this._expandableBody) {
      this._expandableBody.hidden = true;
    }
  }

  @watch("expanded", { waitUntilFirstUpdate: true })
  async handleExpandedChange() {
    if (this.expanded) {
      const sgdsShow = this.emit("sgds-show", { cancelable: true });
      if (sgdsShow.defaultPrevented) {
        this.expanded = false;
        return;
      }
      await stopAnimations(this._expandableBody);
      this._expandableBody.hidden = false;
      const { keyframes, options } = getAnimation(this, "dataTableRow.expandRow.show");
      await animateTo(
        this._expandableBody,
        shimKeyframesHeightAuto(keyframes, this._expandableBody.scrollHeight),
        options
      );
      this.emit("sgds-after-show");
    } else {
      const sgdsHide = this.emit("sgds-hide", { cancelable: true });
      if (sgdsHide.defaultPrevented) {
        this.expanded = true;
        return;
      }
      await stopAnimations(this._expandableBody);
      const { keyframes, options } = getAnimation(this, "dataTableRow.expandRow.hide");
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
    if (this.expanded) return;
    this.expanded = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Closes the expandable content area. */
  public async hide() {
    if (!this.expanded) return;
    this.expanded = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  private _onSlotChange() {
    this.requestUpdate();
  }

  private _onCheckboxChange(e: CustomEvent) {
    this.emit("sgds-row-checkbox-change", { detail: { checked: (e.target as SgdsCheckbox).checked } });
  }

  private _toggleExpand() {
    this.expanded ? this.hide() : this.show();
  }

  private _renderCell(el: SgdsDataTableCell | SgdsDataTableHead) {
    const children = Array.from(el.childNodes).map(n => n.cloneNode(true));

    if (el instanceof SgdsDataTableHead) {
      return html`<th
        width=${ifDefined(el.width)}
        colspan=${ifDefined(el.colspan)}
        rowspan=${ifDefined(el.rowspan)}
        aria-sort=${ifDefined(el.ariasort)}
        scope="col"
        ?data-sortable=${el.sortable}
        @click=${el.sortable ? () => el.handleSortClick() : nothing}
      >
        <div class="data-table-head">
          ${children}
          ${el.sortable
            ? html`<sgds-icon
                name=${el.ariasort === "ascending"
                  ? "arrow-up"
                  : el.ariasort === "descending"
                  ? "arrow-down"
                  : "chevron-selector-vertical"}
                size="md"
              ></sgds-icon>`
            : nothing}
        </div>
      </th>`;
    }

    return html`<td colspan=${ifDefined(el.colspan)} rowspan=${ifDefined(el.rowspan)}>
      <div class="data-table-cell">${children}</div>
    </td>`;
  }

  private _renderExpandCell() {
    return html`<td class="control-cell" @click=${this._toggleExpand}>
      <div class="data-table-cell expand-cell">
        <sgds-icon name=${this.expanded ? "chevron-up" : "chevron-down"} size="md"></sgds-icon>
      </div>
    </td>`;
  }

  private _renderExpandPlaceholder() {
    return html`<td class="control-cell"></td>`;
  }

  private _renderCheckboxCell() {
    return html`<td class="control-cell">
      <div class="data-table-cell checkbox-cell">
        <sgds-checkbox @sgds-change=${this._onCheckboxChange}></sgds-checkbox>
      </div>
    </td>`;
  }

  render() {
    const cells = this._assignedCells ?? [];
    const totalCols =
      cells.length + (this.showCheckbox ? 1 : 0) + (this.expandable || this.showExpandPlaceholder ? 1 : 0);

    return html`
      <tr>
        <td hidden style="display:none"><slot @slotchange=${this._onSlotChange}></slot></td>
        ${this.showCheckbox ? this._renderCheckboxCell() : nothing}
        ${this.expandable
          ? this._renderExpandCell()
          : this.showExpandPlaceholder
          ? this._renderExpandPlaceholder()
          : nothing}
        ${cells.map(el => this._renderCell(el))}
      </tr>

      ${this.expandable
        ? html`
            <tr class="expandable-row">
              <td colspan=${totalCols} class="expandable-td">
                <div class="expandable-body">
                  <div class="expandable-content">
                    <slot name="expandable-content"></slot>
                  </div>
                </div>
              </td>
            </tr>
          `
        : nothing}
    `;
  }
}

setDefaultAnimation("dataTableRow.expandRow.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 250, easing: "ease-in-out" }
});

setDefaultAnimation("dataTableRow.expandRow.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 250, easing: "ease-in-out" }
});

export default SgdsDataTableRow;
