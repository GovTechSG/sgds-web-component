import { html } from "lit";

import SgdsElement from "../../base/sgds-element";
import tableHeadStyle from "./table-head.css";

/**
 * @summary Table head represents a table header cell that identifies a group of information within the table.
 *
 * @slot - Place any elements inside to display as the header content.
 */
export class SgdsTableHead extends SgdsElement {
  static styles = [...SgdsElement.styles, tableHeadStyle];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "columnheader");
  }

  render() {
    return html`<div class="table-head"><slot></slot></div>`;
  }
}

export default SgdsTableHead;
