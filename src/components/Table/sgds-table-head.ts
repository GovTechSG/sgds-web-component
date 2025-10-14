import { html } from "lit";
import { state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import tableHeadStyle from "./table-head.css";

/**
 * @summary Table head represents a table header cell that identifies a group of information within the table.
 *
 * @slot - Place any elements inside to display as the header content.
 */
export class SgdsTableHead extends SgdsElement {
  static styles = [...SgdsElement.styles, tableHeadStyle];
  /**
   * To indicate if the header will have a darker bottom border style
   */
  @state() private border = false;

  @watch("border")
  _handleBorderChange() {
    this.border = this.nextElementSibling?.tagName?.toLowerCase() !== "sgds-table-cell";
    this.border ? this.setAttribute("border", "true") : this.removeAttribute("border");
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "columnheader");
  }

  render() {
    return html`<slot></slot>`;
  }
}

export default SgdsTableHead;
