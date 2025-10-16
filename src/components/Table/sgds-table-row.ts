import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import tableRowStyle from "./table-row.css";

/**
 * @summary Table row organizes and groups table cells or header cells into a single horizontal line within the table.
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
