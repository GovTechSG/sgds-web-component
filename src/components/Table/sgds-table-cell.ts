import { html } from "lit";
import SgdsElement from "../../base/sgds-element";

import tableCellStyle from "./table-cell.css";
export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Table cell that contains data or elements
 * @slot - Accepts any elements passed in
 */
export class SgdsTableCell extends SgdsElement {
  static styles = [...SgdsElement.styles, tableCellStyle];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "cell");
  }

  render() {
    return html` <slot class="table-cell"></slot> `;
  }
}

export default SgdsTableCell;
