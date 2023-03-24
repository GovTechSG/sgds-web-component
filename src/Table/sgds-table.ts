import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./sgds-table.scss";
import SgdsElement from "../utils/sgds-element";
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
  @property({ type: Boolean, reflect: true }) removableSort = false;

  @property({ type: String, reflect: true }) responsive?: 'sm' | 'md' | 'lg' | 'xl';


  @property({ type: Array<String> }) tableHeaders = [];
  @property({ type: Array<String> }) tableData = [];

  @state() sortColumn: number | null = null;
  @state() sortDirection: "asc" | "desc" = "asc";
  @state() activeColumn: number | null = null;
  @state() sortClickCount = 0;
  @state() clickCount = 0;


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
      })
  
      // update the active column
      if (this.activeColumn === columnIndex) {
        this.clickCount++;
        if (this.clickCount === 3 && this.removableSort == true) {
          this.activeColumn = null;
          this.clickCount = 0;
        }
      } else {
        this.activeColumn = columnIndex;
        this.clickCount = 1;
      }
  
      // add the .active class to the clicked header cell
      const thElements = this.shadowRoot!.querySelectorAll("th");
      thElements.forEach((thElement, index) => {
        if (index === columnIndex) {
          thElement.classList.add("active");
        } else {
          thElement.classList.remove("active");
        }
      });
    }
  }

  
  getIcon(columnIndex: number) {
    if (this.activeColumn !== columnIndex) {
      return html`<sl-icon name="arrow-down-up" class="ms-2 align-self-center"></sl-icon>`;
    } else {
      return this.sortDirection === "asc"
        ? html`<sl-icon name="sort-up-alt" class="ms-2 align-self-center"></sl-icon>`
        : html`<sl-icon name="sort-down" class="ms-2 align-self-center"></sl-icon>`;
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
          (header: string, index: number) => html`
            <th
              class="${classMap({
                "sortable-header": this.sort,
                active: this.activeColumn === index,
              })}"
              @click=${() => this.handleHeaderClick(index)}
            >
              ${header} ${this.sort ? this.getIcon(index) : null}
            </th>
          `
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
