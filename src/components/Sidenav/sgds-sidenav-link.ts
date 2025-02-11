import { html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import sidenavLinkStyle from "./sidenav-link.css";

/**
 * @slot default - slot for label of anchor tag.
 */
export class SgdsSidenavLink extends SgdsElement {
  static styles = [...SgdsElement.styles, sidenavLinkStyle];
  /** when true, sets the active stylings of .nav-link */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Disables the SgdsMainnavItem */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @queryAssignedElements({ flatten: true })
  private _anchor: Array<HTMLAnchorElement>;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabled() {
    this.setAttribute("aria-disabled", `${this.disabled}`);
    this._anchor[0].setAttribute("aria-disabled", `${this.disabled}`);

    if (!this.disabled) {
      this._anchor[0].removeAttribute("tabindex");
    }
  }

  _handleSlotChange() {
    this._anchor[0].setAttribute("aria-disabled", `${this.disabled}`);

    /** If link is disabled, set tabindex of anchor to -1 */
    if (this.disabled) {
      this._anchor[0].setAttribute("tabindex", "-1");
      this._anchor[0].removeAttribute("href");
      this._anchor[0].setAttribute("role", "link");
    }
  }
  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }
}

export default SgdsSidenavLink;
