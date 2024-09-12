import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import LinkElement from "../../base/link-element";
import linkStyles from "./link.css";
/**
 * @summary Link allows users to click and navigate their way from page to page
 *
 * @slot default - The text content depicting the link
 * @slot leftIcon - Insert an icon to the left of the link text
 * @slot rightIcon - Insert an icon to the right of the link text
 */
export class SgdsLink extends LinkElement {
  static styles = [...LinkElement.styles, linkStyles];
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
        <slot name="rightIcon">
          ${this.target === "_blank"
            ? html` <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icon-right">
                  <g id="Vector">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.9655 6.9375C11.9655 6.78832 11.9062 6.64524 11.8007 6.53975C11.6953 6.43426 11.5522 6.375 11.403 6.375H5.4375C4.98995 6.375 4.56072 6.55279 4.24426 6.86926C3.92779 7.18573 3.75 7.61495 3.75 8.0625V18.5625C3.75 19.0101 3.92779 19.4393 4.24426 19.7557C4.56072 20.0722 4.98995 20.25 5.4375 20.25H15.9375C16.3851 20.25 16.8143 20.0722 17.1307 19.7557C17.4472 19.4393 17.625 19.0101 17.625 18.5625V12.597C17.625 12.4478 17.5657 12.3047 17.4602 12.1993C17.3548 12.0938 17.2117 12.0345 17.0625 12.0345C16.9133 12.0345 16.7702 12.0938 16.6648 12.1993C16.5593 12.3047 16.5 12.4478 16.5 12.597V18.5625C16.5 18.7117 16.4407 18.8548 16.3352 18.9602C16.2298 19.0657 16.0867 19.125 15.9375 19.125H5.4375C5.28832 19.125 5.14524 19.0657 5.03975 18.9602C4.93426 18.8548 4.875 18.7117 4.875 18.5625V8.0625C4.875 7.91332 4.93426 7.77024 5.03975 7.66475C5.14524 7.55926 5.28832 7.5 5.4375 7.5H11.403C11.5522 7.5 11.6953 7.44074 11.8007 7.33525C11.9062 7.22976 11.9655 7.08668 11.9655 6.9375Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.25 4.3125C20.25 4.16332 20.1907 4.02024 20.0852 3.91475C19.9798 3.80926 19.8367 3.75 19.6875 3.75H14.0625C13.9133 3.75 13.7702 3.80926 13.6647 3.91475C13.5593 4.02024 13.5 4.16332 13.5 4.3125C13.5 4.46168 13.5593 4.60476 13.6647 4.71025C13.7702 4.81574 13.9133 4.875 14.0625 4.875H18.3296L9.16425 14.0392C9.11195 14.0915 9.07046 14.1536 9.04216 14.222C9.01385 14.2903 8.99929 14.3635 8.99929 14.4375C8.99929 14.5115 9.01385 14.5847 9.04216 14.653C9.07046 14.7214 9.11195 14.7835 9.16425 14.8358C9.21655 14.888 9.27863 14.9295 9.34697 14.9578C9.4153 14.9861 9.48854 15.0007 9.5625 15.0007C9.63646 15.0007 9.7097 14.9861 9.77803 14.9578C9.84636 14.9295 9.90845 14.888 9.96075 14.8358L19.125 5.67038V9.9375C19.125 10.0867 19.1843 10.2298 19.2897 10.3352C19.3952 10.4407 19.5383 10.5 19.6875 10.5C19.8367 10.5 19.9798 10.4407 20.0852 10.3352C20.1907 10.2298 20.25 10.0867 20.25 9.9375V4.3125Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </svg>`
            : nothing}
        </slot>
      </a>
    `;
  }
}

export default SgdsLink;
