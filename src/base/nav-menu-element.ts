import { state } from "lit/decorators.js";
import { autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
import SgdsElement from "./sgds-element";
import { LG_BREAKPOINT, MD_BREAKPOINT, SM_BREAKPOINT, XL_BREAKPOINT, XXL_BREAKPOINT } from "../utils/breakpoints";
import type { NavExpandSize } from "./nav-element";
import type SgdsDropdownItem from "../components/Dropdown/sgds-dropdown-item";

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
 * Base class for nav components that have a floating dropdown menu on desktop
 * and a different interaction pattern on mobile (e.g. slide-in panel, toggle panel).
 *
 * Provides:
 * - matchMedia-based breakpoint detection (SSR-safe via connectedCallback)
 * - Floating UI positioning for desktop menu
 * - Outside-click detection
 * - ArrowDown/ArrowUp keyboard navigation with looping through menu items
 * - Menu open/close state management
 *
 * Subclasses must implement `_getExpandValue()` and can override hooks.
 */
export default abstract class NavMenuElement extends SgdsElement {
  /** @internal Whether the viewport is below the expand breakpoint */
  protected _isMobile = true;

  /** @internal Controls desktop floating menu visibility */
  @state()
  protected _menuOpen = false;

  private _mediaQuery: MediaQueryList | null = null;
  private _autoUpdateCleanup: (() => void) | undefined;
  private _focusedItemIndex = -1;

  // ── Abstract methods ──

  /** Returns the expand value from the parent nav component (e.g. "lg") */
  protected abstract _getExpandValue(): NavExpandSize;

  // ── Overridable hooks ──

  /** Whether outside-click should close the menu. Override to support close="inside". */
  protected _shouldCloseOnOutsideClick(): boolean {
    return true;
  }

  /** Called when the breakpoint switches from desktop to mobile. */
  protected _onSwitchToMobile(): void {
    // Override in subclass
  }

  /** Called when the breakpoint switches from mobile to desktop. */
  protected _onSwitchToDesktop(): void {
    // Override in subclass
  }

  // ── Lifecycle ──

  connectedCallback() {
    super.connectedCallback();
    if (typeof window !== "undefined") {
      const expand = this._getExpandValue();
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

  // ── Media change ──

  private _handleMediaChange = (e: MediaQueryListEvent) => {
    const wasMobile = this._isMobile;
    this._isMobile = e.matches;
    if (this._isMobile === wasMobile) return;

    if (this._isMobile && !wasMobile) {
      if (this._menuOpen) this._hideDesktopMenu();
      this._onSwitchToMobile();
    }
    if (!this._isMobile && wasMobile) {
      this._onSwitchToDesktop();
    }
  };

  // ── Outside click ──

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this._menuOpen) return;
    if (!this._shouldCloseOnOutsideClick()) return;
    if (!e.composedPath().includes(this)) {
      if (this._isMobile) {
        this._menuOpen = false;
      } else {
        this._hideDesktopMenu();
      }
    }
  };

  // ── Desktop floating menu ──

  protected async _showDesktopMenu() {
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

  protected _hideDesktopMenu() {
    if (!this._menuOpen) return;
    this._menuOpen = false;
    this._focusedItemIndex = -1;
    this._autoUpdateCleanup?.();
    this._autoUpdateCleanup = undefined;
  }

  protected _toggleDesktopMenu() {
    if (this._menuOpen) {
      this._hideDesktopMenu();
    } else {
      this._showDesktopMenu();
    }
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

  // ── Keyboard navigation (desktop floating menu) ──

  /** Call from the toggler's keydown handler or a keydown on the menu container. */
  protected _handleMenuKeydown(e: KeyboardEvent) {
    if (this._isMobile || !this._menuOpen) return;

    const items = this._getActiveMenuItems();
    if (!items.length) return;

    switch (e.key) {
      case "ArrowDown":
      case "Tab": {
        if (e.key === "Tab" && e.shiftKey) {
          e.preventDefault();
          this._focusPrevItem(items);
        } else {
          e.preventDefault();
          this._focusNextItem(items);
        }
        break;
      }
      case "ArrowUp":
        e.preventDefault();
        this._focusPrevItem(items);
        break;
      case "Escape":
        e.preventDefault();
        this._hideDesktopMenu();
        (this.shadowRoot?.querySelector(".nav-link") as HTMLElement)?.focus();
        break;
    }
  }

  /** Returns active (non-disabled, non-hidden, non-readonly) dropdown items. */
  protected _getActiveMenuItems(): SgdsDropdownItem[] {
    return ([...this.querySelectorAll("sgds-dropdown-item")] as SgdsDropdownItem[]).filter(
      item => !item.disabled && !item.hidden && !item.readonly
    );
  }

  private _focusNextItem(items: SgdsDropdownItem[]) {
    this._focusedItemIndex = (this._focusedItemIndex + 1) % items.length;
    this._focusItem(items, this._focusedItemIndex);
  }

  private _focusPrevItem(items: SgdsDropdownItem[]) {
    this._focusedItemIndex = (this._focusedItemIndex - 1 + items.length) % items.length;
    this._focusItem(items, this._focusedItemIndex);
  }

  private _focusItem(items: SgdsDropdownItem[], index: number) {
    items.forEach((item, i) => {
      const el = item.shadowRoot?.querySelector(".dropdown-item") as HTMLElement | null;
      if (el) el.setAttribute("tabindex", i === index ? "0" : "-1");
    });
    const target = items[index]?.shadowRoot?.querySelector(".dropdown-item") as HTMLElement | null;
    target?.focus();
  }
}
