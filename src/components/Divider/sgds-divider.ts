import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import dividerStyles from "./divider.css";
/**
 * @summary A divider is a thin line that groups content in lists and layouts. They bring clarity to a layout by grouping and dividing content in close proximity.
 */
export class SgdsDivider extends SgdsElement {
  static styles = [dividerStyles];
  /** Sets the orientation of divider to vertical. Defaults to horizontal */
  @property({ type: String, reflect: true }) orientation: "horizontal" | "vertical" = "horizontal";
  /** Sets the orientation of divider to vertical. Defaults to false */
  @property({ type: String, reflect: true }) thickness: "thin" | "thick" | "thicker" = "thin";

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
    this.setAttribute("aria-orientation", this.orientation);
  }
}

export default SgdsDivider;
