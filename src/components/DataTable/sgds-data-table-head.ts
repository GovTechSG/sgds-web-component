import { nothing } from "lit";
import SgdsElement from "../../base/sgds-element";
import { property } from "lit/decorators.js";

/**
 * @summary Data container for a table header cell. Rendered as a `<th>` by the parent `sgds-data-table-row`.
 *
 * @slot default - Content to display inside the header cell.
 *
 */
export class SgdsDataTableHead extends SgdsElement {
  /** Sets the column width. */
  @property({ type: String }) width: string | undefined;

  /** Number of columns this cell spans. */
  @property({ type: Number }) colspan: number | undefined;

  /** Number of rows this cell spans. */
  @property({ type: Number }) rowspan: number | undefined;

  /** Text alignment for the header content. */
  @property({ type: String }) textAlign: "left" | "right" = "left";

  /** Current sort direction for this column. */
  @property({ type: String }) ariasort: "ascending" | "descending" | "none" | "other" | undefined;

  /** When true, clicking this header cycles through ascending → descending → none sort. */
  @property({ type: Boolean }) sorting = true;

  /** Column key passed in `i-sgds-sort` event detail, used to identify which column to sort. */
  @property({ type: String }) sortKey = "";

  /** @internal — called by the row when the rendered `<th>` is clicked. */
  handleSortClick() {
    if (!this.sorting) return;
    const next = this.ariasort === "ascending" ? "descending" : this.ariasort === "descending" ? "none" : "ascending";
    this.ariasort = next;
    this.emit("i-sgds-sort", {
      detail: { key: this.sortKey, direction: next },
      bubbles: true,
      composed: true
    });
  }

  render() {
    return nothing;
  }
}

export default SgdsDataTableHead;
