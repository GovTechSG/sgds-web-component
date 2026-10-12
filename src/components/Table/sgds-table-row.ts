import { html } from "lit";
import { property } from "lit/decorators.js";
import { consume } from "@lit/context";
import SgdsElement from "../../base/sgds-element";
import tableRowStyle from "./table-row.css";
import { TableBorderContext } from "./table-context";

/**
 * @summary Table row organizes and groups table cells or header cells into a single horizontal line within the table.
 *
 * @slot default - Insert any table cell or header elements to be displayed as part of this row.
 */
export class SgdsTableRow extends SgdsElement {
  static styles = [...SgdsElement.styles, tableRowStyle];

  @consume({ context: TableBorderContext, subscribe: true })
  @property({ type: Boolean, reflect: true })
  tableBorder = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "row");
  }

  render() {
    return html`<slot class="table-row"></slot>`;
  }
}

export default SgdsTableRow;
