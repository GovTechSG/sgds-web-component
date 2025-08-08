import { html } from "lit";
import SgdsElement from "../../base/sgds-element";

import tableRowStyle from "./table-row.css";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Table row to group table cell or table head together as a single row
 * @slot - Accepts any elements passed in
 */
export class SgdsTableRow extends SgdsElement {
  static styles = [...SgdsElement.styles, tableRowStyle];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "row");
  }

  render() {
    return html`<slot class="table-row"></slot>`;
  }
}

export default SgdsTableRow;
