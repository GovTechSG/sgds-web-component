import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import dividerStyles from "./divider.css";

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
