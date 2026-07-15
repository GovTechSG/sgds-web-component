import { nothing } from "lit";
import SgdsElement from "../../base/sgds-element";
import { property } from "lit/decorators.js";

/**
 * @summary Data container for a table cell. Rendered as a `<td>` by the parent `sgds-data-table-row`.
 *
 * @slot default - Content to display inside the cell.
 */
export class SgdsDataTableCell extends SgdsElement {
  /** Number of columns this cell spans. */
  @property({ type: Number, reflect: true }) colspan: number | undefined;

  /** Number of rows this cell spans. */
  @property({ type: Number, reflect: true }) rowspan: number | undefined;

  render() {
    return nothing;
  }
}

export default SgdsDataTableCell;
