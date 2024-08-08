import { html } from "lit";
import SgdsElement from "./sgds-element";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @slot default - Default slot for SgdsMainnavItem anchor element
 */

export default class LinkElement extends SgdsElement {
  // static styles = [...SgdsElement.styles];

  /** when true, sets the active stylings of .nav-link */
  @property({ type: Boolean })
  active = false;

  /** Href attribute for anchor element in SgdsMainnavItem */
  @property({ type: String })
  href: string;
  /** Disables the SgdsMainnavItem */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Where to display the linked URL, as the name for a browsing context. Forwards to the HTMLAnchor target attribute */
  @property({ type: String, reflect: true })
  target: "_blank" | "_parent" | "_self" | "_top" = "_self";

  render() {
    return html`
        <a
          href="${ifDefined(this.href)}"
          class="nav-link ${classMap({
            disabled: this.disabled,
            active: this.active
          })} "
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? "true" : "false"}
          target=${this.target}
          ><slot></slot
        ></a>
    `;
  }
}
