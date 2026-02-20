import { html } from "lit";

import SgdsElement from "../../base/sgds-element";
import tableHeadStyle from "./table-head.css";

import { consume } from "@lit/context";
import { TableHeaderBackgroundContext } from "./table-context";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../utils/watch";

/**
 * @summary Table head represents a table header cell that identifies a group of information within the table.
 *
 * @slot - Place any elements inside to display as the header content.
 */

export class SgdsTableHead extends SgdsElement {
  static styles = [...SgdsElement.styles, tableHeadStyle];

  @consume({ context: TableHeaderBackgroundContext, subscribe: true })
  @state()
  private _headerBackground = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "columnheader");
  }

  @watch("_headerBackground")
  _handleHeaderBackground() {
    if (this._headerBackground) this.setAttribute("headerBackground", "true");
    else this.removeAttribute("headerBackground");
  }

  render() {
    return html`<div
      class=${classMap({
        "table-head": true,
        "header-background": this._headerBackground
      })}
    >
      <slot></slot>
    </div>`;
  }
}

export default SgdsTableHead;
