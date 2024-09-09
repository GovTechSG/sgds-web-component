import { property } from "lit/decorators.js";
import LinkElement from "../../base/link-element";
import linkStyles from "./link.css";
import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import anchorStyles from "../../styles/anchor.css";
/**
 * @summary Link allows users to click and navigate their way from page to page
 *
 * @slot default - The text content depicting the link
 * @slot leftIcon - Insert an icon to the left of the link text
 * @slot rightIcon - Insert an icon to the right of the link text
 */
export class SgdsLink extends LinkElement {
  static styles = [...LinkElement.styles, anchorStyles, linkStyles];
  /** when true, sets the active stylings of .nav-link */
  @property({ type: String, reflect: true })
  size: "sm" | "md" | "lg" = "md";
  /** when true, sets the active stylings of .nav-link */
  @property({ type: String, reflect: true })
  variant: "primary" | "danger" = "primary";

  private _handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
    }
  }

  override render() {
    /** When removing href, link is no longer focusable */
    return html`
      <a
        href=${ifDefined(this.href && !this.disabled ? this.href : undefined)}
        class="nav-link ${classMap({
          disabled: this.disabled,
          active: this.active
        })} "
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
        target=${this.target}
        @click=${this._handleClick}
      >
        <slot name="leftIcon"></slot>
        <slot></slot>
        <slot name="rightIcon"></slot>
      </a>
    `;
  }
}

export default SgdsLink;
