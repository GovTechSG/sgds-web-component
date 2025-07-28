import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import tableStyle from "./table-2.css";

import tableCellStyle from "./table-cell.css";
import tableBodyStyle from "./table-body.css";
import tableHeadStyle from "./table-head.css";
import tableRowStyle from "./table-row.css";

import { classMap } from "lit/directives/class-map.js";
import { property } from "lit/decorators.js";

/**
 * @summary The use of a table is to organise a collections of data into readable rows
 */
export class SgdsTable extends SgdsElement {
  static styles = [...SgdsElement.styles, tableStyle];

  /**
   * Use responsive="sm", responsive="md" , responsive="lg", or responsive="xl" as needed to create responsive tables up to a particular breakpoint. From that breakpoint and up, the table will behave normally and not scroll horizontally. Use reponsive="always" to let table be always responsive
   */
  @property({ type: String, reflect: true }) responsive: "sm" | "md" | "lg" | "xl" | "always";

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <div
        class=${classMap({
          "table-responsive": this.responsive === "always",
          "table-responsive-sm": this.responsive === "sm",
          "table-responsive-md": this.responsive === "md",
          "table-responsive-lg": this.responsive === "lg",
          "table-responsive-xl": this.responsive === "xl"
        })}
        tabindex="0"
      >
        <slot class="table"></slot>
      </div>
    `;
  }
}

export class SgdsTableBody extends SgdsElement {
  static styles = [...SgdsElement.styles, tableBodyStyle];

  render() {
    return html` <slot class="table-body"></slot> `;
  }
}

export class SgdsTableCell extends SgdsElement {
  static styles = [...SgdsElement.styles, tableCellStyle];

  render() {
    return html` <slot class="table-cell"></slot> `;
  }
}

export class SgdsTableHead extends SgdsElement {
  static styles = [...SgdsElement.styles, tableHeadStyle];

  _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true });

    if (assignedElements.length === 0) {
      console.error("Invalid row");
    } else if (assignedElements.length > 1) {
      console.error("Too many rows added into table header");
    } else {
      assignedElements.forEach(element => {
        element.setAttribute("isHeaderRow", "true");
      });
    }

    return;
  }

  render() {
    return html` <slot class="table-head" @slotchange=${this._handleSlotChange}></slot> `;
  }
}

export class SgdsTableRow extends SgdsElement {
  static styles = [...SgdsElement.styles, tableRowStyle];

  @property({ type: Boolean, reflect: true }) isHeaderRow = false;

  render() {
    return html`<slot
      class="table-row ${classMap({
        "header-row": this.isHeaderRow
      })}"
    ></slot>`;
  }
}
