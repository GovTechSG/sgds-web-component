import { html } from "lit";

import SgdsElement from "../../base/sgds-element";
import tableCellStyle from "./table-cell.css";

/**
 * @summary Table cell is used for presenting individual data values, interactive elements, or custom content within a table row.
 *
 *  @slot - Insert any elements to be rendered as the cell’s content.
 */
export class SgdsTableCell extends SgdsElement {
  static styles = [...SgdsElement.styles, tableCellStyle];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "cell");
  }

  render() {
   return html`<div class="table-cell"><slot></slot></div>`;
  }
}

export default SgdsTableCell;
