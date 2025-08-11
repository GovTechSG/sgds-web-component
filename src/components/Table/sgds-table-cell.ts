import { html } from "lit";
import SgdsElement from "../../base/sgds-element";

import tableCellStyle from "./table-cell.css";
export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Defines a table cell for presenting individual data values, interactive elements, or custom content within a table row.
 * Table cells support flexible content, allowing for text, numbers, icons, or other components, and are styled to match the table’s appearance.
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
    return html` <slot class="table-cell"></slot> `;
  }
}

export default SgdsTableCell;
