import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import styles from "./data-table.css";

/**
 * @summary Table cell for use inside a data table row.
 *
 * @slot default - Insert any elements to be rendered as the cell's content.
 */
export class SgdsDataTableCell extends SgdsElement {
  static styles = [...SgdsElement.styles, styles];

  render() {
    return html`<div class="data-table-cell"><slot></slot></div>`;
  }
}

export default SgdsDataTableCell;
