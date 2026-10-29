import { html, nothing } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
import SgdsElement from "./sgds-element";
import SgdsIcon from "../components/Icon/sgds-icon";
import navProfileStyle from "./nav-profile.css";
import genId from "../utils/generateId";
import { LG_BREAKPOINT, MD_BREAKPOINT, SM_BREAKPOINT, XL_BREAKPOINT, XXL_BREAKPOINT } from "../utils/breakpoints";
import type { NavExpandSize } from "./nav-element";

const SIZES: Record<NavExpandSize, number> = {
  sm: SM_BREAKPOINT,
  md: MD_BREAKPOINT,
  lg: LG_BREAKPOINT,
  xl: XL_BREAKPOINT,
  xxl: XXL_BREAKPOINT,
  never: Infinity,
  always: -1
};

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
export default abstract class NavProfileElement extends SgdsElement {
  static styles = [...SgdsElement.styles, navProfileStyle];
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /** @internal Whether the menu is open */
  @state()
  private _menuOpen = false;

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

  /** @internal */
  private _isMobile = true;
  private _mediaQuery: MediaQueryList | null = null;
  private _autoUpdateCleanup: (() => void) | undefined;

  connectedCallback() {
    super.connectedCallback();
    if (typeof window !== "undefined") {
      const expand = (this.closest("sgds-mainnav")?.getAttribute("expand") ||
        this.closest("sgds-appnav")?.getAttribute("expand") ||
        "lg") as NavExpandSize;
      this._mediaQuery = window.matchMedia(`(max-width: ${SIZES[expand] - 1}px)`);
      this._isMobile = this._mediaQuery.matches;
      this._mediaQuery.addEventListener("change", this._handleMediaChange);
      document.addEventListener("click", this._handleOutsideClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mediaQuery?.removeEventListener("change", this._handleMediaChange);
    document.removeEventListener("click", this._handleOutsideClick);
    this._autoUpdateCleanup?.();
  }

  private _handleMediaChange = (e: MediaQueryListEvent) => {
    const wasMobile = this._isMobile;
    this._isMobile = e.matches;
    if (this._isMobile === wasMobile) return;
    if (this._menuOpen) {
      if (this._isMobile && !wasMobile) {
        this._hideDesktopMenu();
      }
      if (!this._isMobile && wasMobile) {
        this._menuOpen = false;
      }
    }
  };

  private _handleSlotChange = () => {
    this._hasDropdownItems = this._defaultSlotElements.length > 0;
  };

  // ── Toggle dispatcher ──

  private _handleToggle = () => {
    if (!this._hasDropdownItems || this.disabled) return;
    if (this._isMobile) {
      this._menuOpen = !this._menuOpen;
    } else {
      if (this._menuOpen) {
        this._hideDesktopMenu();
      } else {
        this._showDesktopMenu();
      }
    }
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleToggle();
    }
    if (e.key === "Escape" && this._menuOpen) {
      if (this._isMobile) {
        this._menuOpen = false;
      } else {
        this._hideDesktopMenu();
      }
    }
  };

  // ── Desktop floating menu ──

  private async _showDesktopMenu() {
    if (this._menuOpen) return;
    this._menuOpen = true;
    await this.updateComplete;
    await this._updateFloatingPosition();
    const toggler = this.shadowRoot?.querySelector(".nav-link") as HTMLElement;
    const menu = this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    if (toggler && menu) {
      this._autoUpdateCleanup = autoUpdate(toggler, menu, () => this._updateFloatingPosition());
    }
  }

  private _hideDesktopMenu() {
    if (!this._menuOpen) return;
    this._menuOpen = false;
    this._autoUpdateCleanup?.();
    this._autoUpdateCleanup = undefined;
  }

  private async _updateFloatingPosition() {
    const toggler = this.shadowRoot?.querySelector(".nav-link") as HTMLElement;
    const menu = this.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement;
    if (!toggler || !menu) return;
    const { x, y } = await computePosition(toggler, menu, {
      placement: "bottom-start",
      strategy: "fixed",
      middleware: [offset(0), flip(), shift()]
    });
    Object.assign(menu.style, { left: `${x}px`, top: `${y}px` });
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this._menuOpen) return;
    if (this.close === "inside") return;
    if (!e.composedPath().includes(this)) {
      if (this._isMobile) {
        this._menuOpen = false;
      } else {
        this._hideDesktopMenu();
      }
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
      <div class="dropdown-menu ${this._menuOpen ? "menu-open" : ""}">
        <div class="menu-items">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
