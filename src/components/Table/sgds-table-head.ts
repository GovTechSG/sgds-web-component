import { html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";

import tableHeadStyle from "./table-head.css";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Table head defines a cell as a header of a group of information
 * @slot - Accepts any elements passed in
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
