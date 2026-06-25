import { html } from "lit";
import { property, query } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { SgdsCheckbox } from "../Checkbox/sgds-checkbox";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import tableRowStyle from "./data-table.css";

/**
 * @summary A data table row. Add `expandable` to enable an expandable content area beneath
 * the row — place content in the `expandable-content` slot.
 *
 * @slot default - Insert `sgds-data-table-cell` or `sgds-data-table-head` elements.
 * @slot expandable-content - Content shown in the animated expand area beneath the row.
 *
 * @event sgds-row-checkbox-change - Emitted when the row checkbox changes. Detail: `{ checked: boolean }`
 */
export class SgdsDataTableRow extends SgdsElement {
  static styles = [...SgdsElement.styles, tableRowStyle];

  /** @internal */
  static dependencies = { "sgds-checkbox": SgdsCheckbox };

  /** @internal */
  @query(".expandable-body") expandableBody!: HTMLElement;

  /** Arbitrary data associated with this row. Returned in the `sgds-row-select` event detail. */
  @property({ type: Object }) rowData: Record<string, unknown> = {};

  /** When true, this row has an expandable content area toggled by a chevron button. */
  @property({ type: Boolean, reflect: true }) expandable = false;

  /** @internal — set by sgds-data-table to render a checkbox cell. */
  @property({ type: Boolean }) showCheckbox = false;

  /** @internal — when true, the injected checkbox acts as a "select all" header checkbox. */
  @property({ type: Boolean }) isHeaderRow = false;

  /** @internal — set by sgds-data-table when at least one sibling row is expandable. */
  @property({ type: Boolean }) showExpandPlaceholder = false;

  /** @internal — reflected so CSS custom property can propagate to cell children. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  private _checkbox: SgdsCheckbox | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseenter", () => this.toggleAttribute("hovered", true));
    this.addEventListener("mouseleave", () => this.toggleAttribute("hovered", false));
  }

  updated(changed: Map<string, unknown>) {
    const relevant = ["showCheckbox", "isHeaderRow", "expandable", "showExpandPlaceholder"];
    if (relevant.some(k => changed.has(k))) {
      this._injectControls();
    }
  }

  private _injectControls() {
    const cellTag = this.isHeaderRow ? "sgds-data-table-head" : "sgds-data-table-cell";

    this.querySelector("[data-checkbox]")?.remove();
    this.querySelector("[data-expand]")?.remove();
    this.querySelector("[data-expand-placeholder]")?.remove();
    this._checkbox = null;

    const firstCell = this.querySelector(cellTag);

    // Expand toggle / placeholder
    if (this.isHeaderRow) {
      if (this.showExpandPlaceholder) {
        const ph = document.createElement("sgds-data-table-head");
        ph.setAttribute("data-expand-placeholder", "");
        ph.classList.add("control-cell");
        this.insertBefore(ph, firstCell);
      }
    } else if (this.expandable) {
      const cell = document.createElement("sgds-data-table-cell");
      cell.setAttribute("data-expand", "");
      cell.classList.add("control-cell", "expand-cell");

      const icon = document.createElement("sgds-icon");
      icon.setAttribute("name", "chevron-down");
      cell.setAttribute("aria-label", "Expand row");
      cell.addEventListener("click", () => {
        this.expanded = !this.expanded;
        icon.setAttribute("name", this.expanded ? "chevron-up" : "chevron-down");
        this._animateExpandBody(this.expanded);
      });

      cell.appendChild(icon);
      this.insertBefore(cell, firstCell);
    } else if (this.showExpandPlaceholder) {
      const ph = document.createElement("sgds-data-table-cell");
      ph.setAttribute("data-expand-placeholder", "");
      ph.classList.add("control-cell");
      this.insertBefore(ph, firstCell);
    }

    // Checkbox
    if (this.showCheckbox) {
      const cell = document.createElement(cellTag);
      cell.setAttribute("data-checkbox", "");
      cell.classList.add("control-cell", "checkbox-cell");

      const checkbox = document.createElement("sgds-checkbox") as SgdsCheckbox;
      checkbox.setAttribute("aria-label", this.isHeaderRow ? "Select all rows" : "Select row");
      checkbox.addEventListener("sgds-change", () => {
        this.emit("sgds-row-checkbox-change", { detail: { checked: checkbox.checked }, bubbles: true, composed: true });
      });

      this._checkbox = checkbox;
      cell.appendChild(checkbox);
      this.insertBefore(cell, firstCell);
    }
  }

  private async _animateExpandBody(open: boolean) {
    await this.updateComplete;
    const body = this.expandableBody;
    if (!body) return;

    if (open) {
      await stopAnimations(body);
      body.hidden = false;
      await this.updateComplete;
      const { keyframes, options } = getAnimation(this, "dataTableRow.expandRow.show");
      await animateTo(body, shimKeyframesHeightAuto(keyframes, body.scrollHeight), options);
    } else {
      await stopAnimations(body);
      const { keyframes, options } = getAnimation(this, "dataTableRow.expandRow.hide");
      const duration = (options?.duration ?? 250) as number;
      setTimeout(() => (body.hidden = true), duration - 20);
      await animateTo(body, shimKeyframesHeightAuto(keyframes, body.scrollHeight), options);
    }
  }

  /** @internal */
  get checkbox(): SgdsCheckbox | null {
    return this._checkbox;
  }

  render() {
    return html`
      <tr>
        <slot></slot>
      </tr>
      ${this.expandable
        ? html`
            <tr ?hidden=${this.hidden === true} class="expandable-row">
              <td colspan="9999" class="expandable-td">
                <div class="expandable-body" hidden>
                  <div class="expandable-content">
                    <slot name="expandable-content"></slot>
                  </div>
                </div>
              </td>
            </tr>
          `
        : ""}
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
