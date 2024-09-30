import { html, nothing } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import skeletonStyles from "./skeleton.css";

export class SgdsSkeleton extends SgdsElement {
  static styles = [skeletonStyles];
  @queryAssignedElements()
  private childElement: Array<HTMLElement>;

  @query(".skeleton") skeleton: HTMLDivElement;

  /** Sets the width of skeleton. Pass value in pixels */
  @property({ type: String, reflect: true }) width = "";
  /** Sets the height of skeleton. Pass value in pixels */
  @property({ type: String, reflect: true }) height = "";
  /** Sets the border radius of skeleton. Pass value in as percentage or pixels */
  @property({ type: String, reflect: true }) borderRadius = "";
  /** Sets the border radius of skeleton. Pass value in as percentage or pixels */
  @property({ type: Number, reflect: true }) rows: number;
  /** Sets the border radius of skeleton. Pass value in as percentage or pixels */
  @property({ type: Boolean, reflect: true }) autoSizeRows = false;
  /** Sets the border radius of skeleton. Pass value in as percentage or pixels */
  @property({ type: String, reflect: true }) variant: "body" | "heading" = "body";

  protected firstUpdated(): void {
    this.width ? (this.skeleton.style.width = this.width) : null;
    this.height ? (this.skeleton.style.height = this.height) : null;
    this.borderRadius ? (this.skeleton.style.borderRadius = this.borderRadius) : null;

    if (this.rows > 0) {
      const skeletonRows = Array.from(this.skeleton.children) as HTMLElement[];
      skeletonRows.forEach(row => (row.style.borderRadius = this.borderRadius));

      // if (this.autoSizeRows) {
      //     const calculatedHeight = this.height - (8 * (this.rows -1))
      //     skeletonRows.forEach(row => row.style.height = )
      // }
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          skeleton: true,
          "skeleton-paragraph": this.rows > 0,
          "skeleton-paragraph-heading": this.variant === "heading" && this.rows > 0,
          "auto-size-rows": this.rows > 0 && this.autoSizeRows
        })}
      >
        ${this.rows > 0 ? [...Array(this.rows).keys()].map(n => html`<div class="skeleton-row-${n}"></div>`) : nothing}
      </div>
    `;
  }
}

export default SgdsSkeleton;
