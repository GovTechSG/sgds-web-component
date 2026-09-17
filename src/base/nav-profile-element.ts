import { html, nothing } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { offset } from "@floating-ui/dom";
import SgdsElement from "./sgds-element";
import SgdsDropdown from "../components/Dropdown/sgds-dropdown";
import SgdsIcon from "../components/Icon/sgds-icon";
import navProfileStyle from "./nav-profile.css";
import genId from "../utils/generateId";

/**
 * Base class for navigation profile components (sgds-mainnav-profile and sgds-appnav-profile).
 * Provides the full profile dropdown (desktop) and mobile panel behavior.
 * When no dropdown items are slotted into the default slot, renders as a non-interactive
 * read-only element (no dropdown menu, no caret icon, cursor default, not focusable by keyboard or mouse).
 * Subclasses must consume the appropriate breakpoint context and set `_breakpointReached`.
 *
 * @slot avatar - Avatar element displayed in both desktop (before label) and mobile (as toggler)
 * @slot default - Profile menu items (sgds-dropdown-item elements). When empty, the component becomes read-only.
 */
export default abstract class NavProfileElement extends SgdsElement {
  static styles = [...SgdsElement.styles, navProfileStyle];
  /** @internal */
  static dependencies = {
    "sgds-dropdown": SgdsDropdown,
    "sgds-icon": SgdsIcon
  };

  /** @internal Whether the breakpoint is reached (mobile mode). Subclasses set this via context consumption. */
  @state()
  protected _breakpointReached = true;

  /** @internal Whether the mobile menu is open */
  @state()
  private _mobileMenuOpen = false;

  /** @internal Whether dropdown items are slotted */
  @state()
  private _hasDropdownItems = false;

  @queryAssignedElements({ flatten: true })
  private _defaultSlotElements!: HTMLElement[];

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

  private _handleClickOutside = (e: MouseEvent) => {
    if (!this._mobileMenuOpen) return;
    if (this.close === "inside") return;
    if (!e.composedPath().includes(this)) {
      this._mobileMenuOpen = false;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this._handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this._handleClickOutside);
  }

  private _handleSlotChange = () => {
    this._hasDropdownItems = this._defaultSlotElements.length > 0;
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleMobileToggle();
    }
  };

  render() {
    if (!this._breakpointReached) {
      // Desktop: read-only (no dropdown items)
      if (!this._hasDropdownItems) {
        return html`
          <div
            class="${classMap({
              "nav-link": true,
              "read-only": true
            })}"
            aria-label=${ifDefined(this.ariaLabel)}
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
          </div>
          <slot @slotchange=${this._handleSlotChange}></slot>
        `;
      }

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
          <slot @slotchange=${this._handleSlotChange}></slot>
        </sgds-dropdown>
      `;
    }

    // Mobile: read-only (no dropdown items)
    if (!this._hasDropdownItems) {
      return html`
        <div class="profile-avatar-mobile read-only">
          <slot name="avatar"></slot>
        </div>
        <slot @slotchange=${this._handleSlotChange}></slot>
      `;
    }

    // Mobile: avatar toggler + self-contained mobile panel
    return html`
      <button
        class="profile-avatar-mobile"
        aria-label=${this.ariaLabel || "Toggle navigation"}
        aria-expanded=${this._mobileMenuOpen ? "true" : "false"}
        @click=${this._handleMobileToggle}
        @keydown=${this._handleKeydown}
      >
        <slot name="avatar"></slot>
      </button>
      <div class="profile-mobile-panel" ?hidden=${!this._mobileMenuOpen}>
        <div class="profile-mobile-items">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
