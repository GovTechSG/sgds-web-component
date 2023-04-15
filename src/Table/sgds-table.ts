import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./sgds-table.scss";
import SgdsElement from "../base/sgds-element";
import { classMap } from "lit/directives/class-map.js";

@customElement("sgds-table")
export class SgdsTable extends SgdsElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true }) striped = false;
  @property({ type: Boolean, reflect: true }) bordered = false;
  @property({ type: Boolean, reflect: true }) borderless = false;
  @property({ type: Boolean, reflect: true }) hover = false;
  @property({ type: String, reflect: true }) size?: string;
  @property({ type: String, reflect: true }) variant?: string;
  @property({ type: Boolean, reflect: true  }) sort = false;

  @property({ type: String, reflect: true }) responsive?: 'sm' | 'md' | 'lg' | 'xl';


  @property({ type: Array<String> }) tableHeaders = [];
  @property({ type: Array<String> }) tableData = [];

  @state() sortColumn: number | null = null;
  @state() sortDirection: "asc" | "desc" = "asc";

  handleHeaderClick(columnIndex: number) {
    if (this.sort == true) {
      if (this.sortColumn === columnIndex) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = columnIndex;
        this.sortDirection = "asc";
      }

      this.tableData = [...this.tableData].sort((a, b) => {
        const aValue = a[columnIndex];
        const bValue = b[columnIndex];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return this.sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return this.sortDirection === "asc"
            ? (aValue as any) - (bValue as any)
            : (bValue as any) - (aValue as any);
        }
      });
    }
  }

  render() {
    return html`
   <div class=${classMap({
      'table-responsive': !!this.responsive,
      'table-responsive-sm': this.responsive === 'sm',
      'table-responsive-md': this.responsive === 'md',
      'table-responsive-lg': this.responsive === 'lg',
      'table-responsive-xl': this.responsive === 'xl'
    })} tabindex="0">
        <table
          class="table ${classMap({
            [`table-striped`]: this.striped,
            [`table-bordered`]: this.bordered,
            [`table-borderless`]: this.borderless,
            [`table-hover`]: this.hover,
            [`table-${this.size}`]: this.size,
            [`table-${this.variant}`]: this.variant,
          })} sgds"
        >
          <thead>
            <tr>
              ${this.tableHeaders.map(
                (header: string, index: number) =>
                  html`<th @click=${() => this.handleHeaderClick(index)}>
                    ${header}
                  </th>`
              )}
            </tr>
          </thead>
          <tbody>
            ${this.tableData.map(
              (row) => html`
                <tr>
                  ${row.map((cell: string) => html`<td>${cell}</td>`)}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

export default SgdsTable;
