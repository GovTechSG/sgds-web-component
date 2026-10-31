import { html, nothing } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsIcon from "../components/Icon/sgds-icon";
import navProfileStyle from "./nav-profile.css";
import genId from "../utils/generateId";
import NavMenuElement from "./nav-menu-element";
import type { NavExpandSize } from "./nav-element";

/**
 * Base class for navigation profile components (sgds-mainnav-profile and sgds-appnav-profile).
 * Renders a single unified template that CSS reshapes for mobile/desktop.
 * On desktop: shows avatar + label + secondaryText with a floating dropdown.
 * On mobile: shows the avatar as a toggler that opens a panel below.
 * When no dropdown items are slotted, renders as a non-interactive read-only element.
 *
 * @slot avatar - Avatar element displayed in both desktop (before label) and mobile (as toggler)
 * @slot default - Profile menu items (sgds-dropdown-item elements). When empty, the component becomes read-only.
 */
export default abstract class NavProfileElement extends NavMenuElement {
  static styles = [...NavMenuElement.styles, navProfileStyle];
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /** @internal Whether dropdown items are slotted */
  @state()
  private _hasDropdownItems = false;

  @queryAssignedElements({ flatten: true })
  private _defaultSlotElements: HTMLElement[];

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

  // ── NavMenuElement abstract implementation ──

  protected _getExpandValue(): NavExpandSize {
    return (this.closest("sgds-mainnav")?.getAttribute("expand") ||
      this.closest("sgds-appnav")?.getAttribute("expand") ||
      "lg") as NavExpandSize;
  }

  protected override _shouldCloseOnOutsideClick(): boolean {
    return this.close !== "inside";
  }

  // ── Slot handling ──

  private _handleSlotChange = () => {
    this._hasDropdownItems = this._defaultSlotElements.length > 0;
  };

  // ── Toggle dispatcher ──

  private _handleToggle = () => {
    if (!this._hasDropdownItems || this.disabled) return;
    if (this._isMobile) {
      this._menuOpen = !this._menuOpen;
    } else {
      this._toggleDesktopMenu();
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleToggle();
    }
    if (!this._isMobile) {
      // Delegate to shared menu keyboard nav
      this._handleMenuKeydown(e);
    }
  };

  render() {
    const isReadOnly = !this._hasDropdownItems;
    const isInteractive = this._hasDropdownItems && !this.disabled;

    return html`
      <button
        class="${classMap({
          "nav-link": true,
          "read-only": isReadOnly,
          disabled: this.disabled
        })}"
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-expanded=${this._menuOpen ? "true" : "false"}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
        id=${this.togglerId}
        tabindex=${isInteractive ? "0" : "-1"}
        ?disabled=${!isInteractive}
        @click=${this._handleToggle}
        @keydown=${this._handleKeydown}
      >
        <slot name="avatar"></slot>
        ${this.label || this.secondaryText
          ? html`<div class="profile-text">
              ${this.label ? html`<span class="profile-label">${this.label}</span>` : nothing}
              ${this.secondaryText ? html`<span class="profile-secondary-text">${this.secondaryText}</span>` : nothing}
            </div>`
          : nothing}
        <sgds-icon class="chevron" name="chevron-down" size="md"></sgds-icon>
      </button>
      <div class="dropdown-menu ${this._menuOpen ? "menu-open" : ""}" @keydown=${this._handleMenuKeydown}>
        <div class="menu-items">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
