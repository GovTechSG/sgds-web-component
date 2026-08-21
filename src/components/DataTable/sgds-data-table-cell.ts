import { css, html } from "lit";
import SgdsElement from "../../base/sgds-element";
import { property } from "lit/decorators.js";

/**
 * @summary Data container for a table cell. Rendered as a `<td>` by the parent `sgds-data-table-row`.
 *
 * @slot default - Content to display inside the cell.
 */
export class SgdsDataTableCell extends SgdsElement {
  static styles = [
    ...SgdsElement.styles,
    css`
      :host {
        display: contents;
      }
    `
  ];

  /** @internal Number of columns this cell spans. */
  @property({ type: Number }) colSpan: number | undefined;

  /** @internal Number of rows this cell spans. */
  @property({ type: Number }) rowSpan: number | undefined;

  render() {
    return html`<slot></slot>`;
  }
}

export default SgdsDataTableCell;
