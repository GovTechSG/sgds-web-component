import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import styles from "./data-table.css";

/**
 * @summary Table header cell for use inside a data table row.
 *
 * @slot default - Place any elements inside to display as the header content.
 */
export class SgdsDataTableHead extends SgdsElement {
  static styles = [...SgdsElement.styles, styles];

  render() {
    return html`<div class="data-table-head"><slot></slot></div>`;
  }
}

export default SgdsDataTableHead;
