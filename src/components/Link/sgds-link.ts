import { html, PropertyValueMap } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import linkStyles from "./link.css";
import SgdsIcon from "../Icon/sgds-icon";
/**
 * @summary Link allows users to click and navigate their way from page to page
 *
 * @slot default - Pass in a single anchor tag here
 */
export class SgdsLink extends SgdsElement {
  static styles = [...SgdsElement.styles, linkStyles];
  /** Determines the size of the link */
  @property({ type: String, reflect: true })
  size: "xs" | "sm" | "md" | "lg" = "md";
  @property({ type: String, reflect: true })
  variant: "primary" | "danger" | "neutral" | "light" | "dark" = "primary";
  /** When true, sets the active stylings of the link */
  @property({ type: Boolean, reflect: true })
  active = false;
  /** Disables the link */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _processAnchor(anchor: HTMLAnchorElement) {
    if (this.disabled) {
      anchor.setAttribute("disabled", "true");
    }
    if (anchor.hasAttribute("disabled")) {
      anchor.setAttribute("href", "javascript:void(0)");
      anchor.setAttribute("tabindex", "-1");
    } else {
      anchor.setAttribute("tabindex", "0");
    }
  }

  private _processIcon(anchor: HTMLAnchorElement) {
    const linkToIconSizeMapping = {
      xs: "sm",
      sm: "md",
      md: "lg",
      lg: "xl"
    };
    const icons = anchor.querySelectorAll<SgdsIcon>("sgds-icon");

    icons.forEach(icon => {
      // icon.size = linkToIconSizeMapping[this.size]
      icon.setAttribute("size", linkToIconSizeMapping[this.size]);
      icon.classList.remove("icon-left", "icon-right");

      if (!icon.previousElementSibling && !icon.previousSibling) {
        icon.classList.add("icon-left");
      }

      if (!icon.nextElementSibling && !icon.nextSibling) {
        icon.classList.add("icon-right");
      }
    });
  }

  private _handleSlotChange(e: Event) {
    const anchor = (e.target as HTMLSlotElement)
      .assignedElements()
      .find(el => el.tagName.toLowerCase() === "a") as HTMLAnchorElement;

    if (anchor) {
      this._processAnchor(anchor);
      this._processIcon(anchor);
    }
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);

    const anchor = this.querySelector("a");
    if (anchor) {
      this._processAnchor(anchor);
      this._processIcon(anchor);
    }
  }

  render() {
    /** When removing href, link is no longer focusable */
    return html`<slot class="nav-link " @slotchange=${this._handleSlotChange}></slot> `;
  }
}

export default SgdsLink;
