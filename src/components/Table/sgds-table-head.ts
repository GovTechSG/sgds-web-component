import { html } from "lit";
import { property, state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";

import tableHeadStyle from "./table-head.css";
import { watch } from "../../utils/watch";

export type HeaderPosition = "horizontal" | "vertical" | "both";

/**
 * @summary Represents a table header cell that identifies a group of information within the table.
 * The table head is typically styled with bold text and may include an optional darker bottom border for emphasis.
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
    const table = this.closest("sgds-table");

    // Checking if there is border based on header position
    switch (table.headerPosition) {
      case "vertical":
        // When its vertical, we will set border to false
        this.border = false;
        break;
      case "both":
        // For both, we will check if the sgds-table-head is placed beside a cell and hide border accordingly
        this.border = this.nextElementSibling?.tagName?.toLowerCase() === "sgds-table-cell";
        break;
      default:
        // By default, we will check if the next element is a cell, if its not a cell we will add border
        this.border = this.nextElementSibling?.tagName?.toLowerCase() !== "sgds-table-cell";
        break;
    }

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
