import { html } from "lit";
import SgdsElement from "./sgds-element";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { watch } from "../utils/watch";

/**
 * @slot default - Default slot for SgdsMainnavItem anchor element
 * @slot default - Default slot for SgdsMainnavItem anchor element
 */

export default class LinkElement extends SgdsElement {
  /** when true, sets the active stylings of .nav-link */
  @property({ type: Boolean })
  active = false;

  /** Href attribute for anchor element in SgdsMainnavItem */
  @property({ type: String })
  href: string;
  /** Disables the SgdsMainnavItem */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @watch("disabled")
  _handleDisabled(){
    this.setAttribute("aria-disabled", `${this.disabled}`)
  }

  render() {
    return html`
      <a
        href=${this.disabled ? "javascript:void(0)" : ifDefined(this.href)}
        class="nav-link ${classMap({
          disabled: this.disabled,
          active: this.active
        })} "
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
      >
        <slot></slot>
      </a>
    `;
  }
}
