import { html, nothing } from "lit";
import { consume } from "@lit/context";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { offset } from "@floating-ui/dom";
import SgdsElement from "../../base/sgds-element";
import SgdsDropdown from "../Dropdown/sgds-dropdown";
import SgdsDropdownItem from "../Dropdown/sgds-dropdown-item";
import SgdsIcon from "../Icon/sgds-icon";
import { MainnavBreakpointContext } from "./mainnav-context";
import mainnavProfileStyle from "./mainnav-profile.css";
import genId from "../../utils/generateId";

/**
 * @summary A profile component for the mainnav that shows a full dropdown in desktop and handles its own mobile menu.
 * In desktop: renders avatar + label + secondaryText with a dropdown.
 * In mobile: renders the avatar as a toggler that opens a self-contained mobile panel with profile items.
 * When present, it disables the mainnav's default hamburger toggler.
 *
 * @slot avatar - Avatar element displayed in both desktop (before label) and mobile (as toggler)
 * @slot default - Profile menu items (sgds-dropdown-item elements)
 */
export class SgdsMainnavProfile extends SgdsElement {
  static styles = [...SgdsElement.styles, mainnavProfileStyle];
  /** @internal */
  static dependencies = {
    "sgds-dropdown": SgdsDropdown,
    "sgds-dropdown-item": SgdsDropdownItem,
    "sgds-icon": SgdsIcon
  };

  @consume({ context: MainnavBreakpointContext, subscribe: true })
  @state()
  private _breakpointReached = true;

  /** @internal Whether the mobile menu is open */
  @state()
  private _mobileMenuOpen = false;

  /** Primary text displayed next to the avatar in desktop (e.g. user name) */
  @property({ type: String, reflect: true })
  label = "";

  /** Secondary text displayed below the label in desktop (e.g. agency or role) */
  @property({ type: String, reflect: true })
  secondaryText = "";

  /** When true, disables the profile dropdown */
  @property({ type: Boolean })
  disabled = false;

  /** Accessible label for the profile toggle button */
  @property({ type: String })
  ariaLabel = "";

  /** Controls dropdown close behavior. "default" auto-closes on item/outside click, "outside" closes only on outside click, "inside" prevents auto-close. */
  @property({ type: String })
  close: "default" | "outside" | "inside" = "default";

  /** @internal */
  private togglerId: string = genId("profile", "button");

  private _handleMobileToggle = () => {
    this._mobileMenuOpen = !this._mobileMenuOpen;
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleMobileToggle();
    }
  };

  render() {
    if (!this._breakpointReached) {
      // Desktop: dropdown with avatar + label + secondaryText
      return html`
        <sgds-dropdown .floatingOpts=${{ middleware: [offset(0)] }} ?disabled=${this.disabled} close=${this.close}>
          <button
            class="${classMap({
              "nav-link": true,
              disabled: this.disabled
            })}"
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-label=${ifDefined(this.ariaLabel)}
            id=${this.togglerId}
            tabindex=${this.disabled ? "-1" : "0"}
            slot="toggler"
          >
            <slot name="avatar"></slot>
            ${this.label || this.secondaryText
              ? html`<div class="profile-text">
                  ${this.label ? html`<span class="profile-label">${this.label}</span>` : nothing}
                  ${this.secondaryText
                    ? html`<span class="profile-secondary-text">${this.secondaryText}</span>`
                    : nothing}
                </div>`
              : nothing}
            <sgds-icon name="chevron-down" size="md"></sgds-icon>
          </button>
          <slot></slot>
        </sgds-dropdown>
      `;
    }

    // Mobile: avatar toggler + self-contained mobile panel
    return html`
      <div
        class="profile-avatar-mobile"
        role="button"
        tabindex="0"
        aria-label=${this.ariaLabel || "Toggle navigation"}
        aria-expanded=${this._mobileMenuOpen ? "true" : "false"}
        @click=${this._handleMobileToggle}
        @keydown=${this._handleKeydown}
      >
        <slot name="avatar"></slot>
      </div>
      <div class="profile-mobile-panel" ?hidden=${!this._mobileMenuOpen}>
        <div class="profile-mobile-items">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default SgdsMainnavProfile;
