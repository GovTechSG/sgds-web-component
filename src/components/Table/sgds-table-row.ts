import { html } from "lit";
import SgdsElement from "../../base/sgds-element";

import tableRowStyle from "./table-row.css";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Represents a table row that organizes and groups table cells or header cells into a single horizontal line within the table.
 * Table rows define the structure of the table by aligning related data or headers together, supporting both data and header content.
 *
 * @slot - Insert any table cell or header elements to be displayed as part of this row.
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
