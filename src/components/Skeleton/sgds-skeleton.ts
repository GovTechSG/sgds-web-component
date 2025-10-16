import { html, nothing, PropertyValueMap } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import skeletonStyles from "./skeleton.css";
/**
 * @summary A skeleton is a low-fidelity visual placeholder that represents the loading of interface elements
 * before they have displayed on the page.
 */
export class SgdsSkeleton extends SgdsElement {
  static styles = [skeletonStyles];

  @query(".skeleton") private skeleton: HTMLDivElement;

  /** Sets the width of skeleton. Pass value in string with length units like pixels or percentage. */
  @property({ type: String, reflect: true }) width = "";
  /** Sets the height of skeleton. Pass value in string with length units like pixels or percentage. */
  @property({ type: String, reflect: true }) height = "";
  /** Sets the border radius of skeleton. Pass value in string with length units like pixels and percentage
   * When `row` is defined, the borderRadius is forwarded down to the border radius of each skeleton row */
  @property({ type: String, reflect: true }) borderRadius = "";
  /**Sets the number of rows within the given height of the skeleton.
   * By default, the height of each row is auto-sized by taking the height of the skeleton divided by the number of rows and
   * taking into account that there is a gap set by root css variable `--sgds-gap-xs` between each rows
   */
  @property({ type: Number, reflect: true }) rows: number;
  /** Adds a sheening animated effect to the skeleton  */
  @property({ type: Boolean, reflect: true }) sheen = false;

  protected firstUpdated(changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(changedProperties);

    this.width ? (this.skeleton.style.width = this.width) : null;
    this.height ? (this.skeleton.style.height = this.height) : null;
    this.borderRadius ? (this.skeleton.style.borderRadius = this.borderRadius) : null;

    if (this.rows > 0) {
      const skeletonRows = Array.from(this.skeleton.children) as HTMLElement[];
      skeletonRows.forEach(row => (row.style.borderRadius = this.borderRadius));
    }
  }

  render() {
    return html`
      <div
        class=${classMap({
          skeleton: true,
          "skeleton-paragraph": this.rows > 0,
          "auto-size-rows": this.rows > 0,
          sheen: this.sheen && !this.rows
        })}
      >
        ${this.rows > 0
          ? [...Array(this.rows).keys()].map(n => {
              const classes = { [`skeleton-row-${n}`]: true, sheen: this.sheen };
              return html`<div class=${classMap(classes)}></div>`;
            })
          : nothing}
      </div>
    `;
  }
}

export default SgdsSkeleton;

// Accessibility to add to Documentation:
// When user use a template of sgds-skeletons, add one visually hidden span to indicate Loading...
// Loading labels must be unique thats why its not advisible to handle the aria labelling for users inside sgds-skeleton
