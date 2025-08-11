import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";

import tableHeadStyle from "./table-head.css";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Represents a table header cell that identifies a group of information within the table.
 * The table head is typically styled with bold text and may include an optional darker bottom border for emphasis.
 *
 * @slot - Place any elements inside to display as the header content.
 */
export class SgdsTableHead extends SgdsElement {
  static styles = [...SgdsElement.styles, tableHeadStyle];
  /**
   * To indicate if the header will have a darker bottom border style
   */
  @property({ type: Boolean, reflect: true }) noBorder = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "columnheader");

    if (this.noBorder) {
      this.style.borderColor = "var(--sgds-border-color-muted)";
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default SgdsTableHead;
