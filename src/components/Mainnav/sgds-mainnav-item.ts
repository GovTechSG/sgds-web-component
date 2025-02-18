import { html } from "lit";
import { property } from "lit/decorators.js";
import { watch } from "../../utils/watch";
import SgdsElement from "../../base/sgds-element";
import mainnavItemStyle from "./mainnav-item.css";

/**
 * @slot default - slot for SgdsMainnavItem element.
 *
 *  */
export class SgdsMainnavItem extends SgdsElement {
  static styles = [...SgdsElement.styles, mainnavItemStyle];

  /** when true, sets the active stylings of .nav-link */
  @property({ type: Boolean })
  active = false;

  /** Disables the SgdsMainnavItem */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @watch("disabled")
  _handleDisabled() {
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }

  private _handleSlotChange(e: Event) {
    const anchorItems = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(item => item.tagName.toLowerCase() === "a");

    if (anchorItems.length > 1) {
      return console.error("More than one anchor tag is added to sgds-sidenav-item");
    } else if (anchorItems.length === 1) {
      const anchor = anchorItems[0] as HTMLAnchorElement;
      this.disabled && anchor.setAttribute("tabindex", "-1");
      this.active && anchor.setAttribute("aria-current", "true");
    }
  }

  render() {
    return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
  }
}

export default SgdsMainnavItem;
