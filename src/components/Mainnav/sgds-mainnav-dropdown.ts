import { html } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
import { SgdsMainnav } from "./sgds-mainnav";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import genId from "../../utils/generateId";
import mainnavDropdownStyle from "./mainnav-dropdown.css";
import SgdsDropdownItem from "../Dropdown/sgds-dropdown-item";
import SgdsIcon from "../Icon/sgds-icon";
import NavMenuElement from "../../base/nav-menu-element";
import type { NavExpandSize } from "../../base/nav-element";

const TAB = "Tab";
const ENTER = "Enter";
const SPACE = " ";

/**
 * @slot default - The menu items. Pass in sgds-dropdown-item as the menu items
 * @slot toggler - The content of the toggler to pass in html content.
 */
export class SgdsMainnavDropdown extends NavMenuElement {
  static styles = [...NavMenuElement.styles, mainnavDropdownStyle];
  /** @internal */
  static dependencies = {
    "sgds-dropdown-item": SgdsDropdownItem,
    "sgds-icon": SgdsIcon
  };

  /** @internal */
  @query(".nav-link") navLink: HTMLElement;

  /** @internal */
  @query(".dropdown-menu") dropdownMenu: HTMLElement;

  /** @internal */
  @query(".mobile-header a") menuHeaderButton: HTMLElement;

  /** @internal */
  @query(".back-text") menuHeaderText: HTMLElement;

  /** @internal */
  private togglerId: string = genId("dropdown", "button");

  /** When true, applies active styles on the dropdown button */
  @property({ type: Boolean })
  active = false;

  /** When true, applies active styles on the dropdown button */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Accessible label for the dropdown's toggle button. Forwarded to the button's aria-label attribute. */
  @property({ type: String })
  ariaLabel: string;

  /** @internal */
  @queryAssignedElements({ slot: "toggler" }) private togglerNodes!: HTMLElement[];

  /** @internal */
  @queryAssignedElements() private defaultNodes!: SgdsDropdownItem[];

  /** @internal */
  get defaultSlotItems(): SgdsDropdownItem[] {
    return [...(this.defaultNodes || [])].filter(
      (node: HTMLElement) => typeof node.tagName !== "undefined"
    ) as SgdsDropdownItem[];
  }

  private _mainnavEl: HTMLElement | null = null;

  // ── NavMenuElement abstract implementation ──

  protected _getExpandValue(): NavExpandSize {
    return (this.closest("sgds-mainnav")?.getAttribute("expand") || "lg") as NavExpandSize;
  }

  protected override _onSwitchToDesktop(): void {
    const navbarBody = this._getNavbarBody();
    if (navbarBody) navbarBody.style.removeProperty("transform");
    this.dropdownMenu?.style.removeProperty("display");
    this.dropdownMenu?.removeAttribute("aria-hidden");
  }

  // ── Lifecycle ──

  connectedCallback() {
    super.connectedCallback();
    if (typeof window !== "undefined") {
      this._mainnavEl = this.closest("sgds-mainnav");
      this._mainnavEl?.addEventListener("sgds-after-hide", this._handleNavHide);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mainnavEl?.removeEventListener("sgds-after-hide", this._handleNavHide);
  }

  firstUpdated() {
    if (this.togglerNodes?.length && this.menuHeaderText) {
      this.menuHeaderText.textContent = this.togglerNodes[0].textContent;
    }
  }

  // ── Toggler slot handling ──

  private _handleTogglerSlotChange() {
    if (this.togglerNodes?.length && this.menuHeaderText) {
      this.menuHeaderText.textContent = this.togglerNodes[0].textContent;
    }
  }

  // ── Unified slot change handler ──

  private _handleSlotChange(e: Event) {
    const items = (e.target as HTMLSlotElement).assignedElements({ flatten: true }) as SgdsDropdownItem[];
    items.forEach(item => {
      item.addEventListener("keydown", this._handleKeyboardMenuItemsEvent.bind(this));

      const dropdownItem = item.shadowRoot?.querySelector(".dropdown-item") as HTMLElement;
      if (!dropdownItem) return;

      if (this._isMobile) {
        dropdownItem.classList.add("mainnav-dropdown-link");
        const link = item.shadowRoot?.querySelector("a") || item.querySelector("a");
        if (link) {
          link.tabIndex = -1;
          if (dropdownItem.classList.contains("disabled")) {
            link.setAttribute("href", "javascript:void(0)");
            link.setAttribute("tabindex", "-1");
          } else {
            link.addEventListener("click", (e: Event) => {
              const target = e.target as HTMLElement;
              const mainnav = target.closest("sgds-mainnav") as SgdsMainnav;
              mainnav?.hide();
            });
          }
        }
      } else {
        dropdownItem.classList.remove("mainnav-dropdown-link");
        const slotEl = item.shadowRoot?.querySelector(".dropdown-item slot") as HTMLSlotElement;
        if (slotEl) {
          const slottedItems = slotEl.assignedElements({ flatten: true });
          slottedItems.forEach(slottedItem => {
            if (dropdownItem.classList.contains("disabled")) {
              slottedItem.setAttribute("href", "javascript:void(0)");
              slottedItem.setAttribute("tabindex", "-1");
            }
          });
        }
      }
    });
  }

  // ── Toggle dispatcher ──

  private _handleToggle() {
    if (this.disabled) return;
    if (this._isMobile) {
      this._openMobileMenu();
    } else {
      this._toggleDesktopMenu();
    }
  }

  private _handleKeyboardOpen(event: KeyboardEvent) {
    if (this.disabled) return;

    if (event.key === ENTER || event.key === SPACE) {
      event.preventDefault();
      this._handleToggle();
    }
    if (!this._isMobile) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!this._menuOpen) {
          this._showDesktopMenu();
        }
      }
      // Delegate to shared menu keyboard nav when menu is open
      this._handleMenuKeydown(event);
    }
  }

  // ── Reset when mainnav mobile menu closes ──

  private _handleNavHide = () => {
    if (!this._isMobile) return;
    const navbarBody = this._getNavbarBody();
    if (navbarBody) navbarBody.style.removeProperty("transform");
    if (this.dropdownMenu) {
      this.dropdownMenu.style.display = "none";
      this.dropdownMenu.setAttribute("aria-hidden", "true");
    }
  };

  // ── Mobile slide-in behavior ──

  private _getNavbarBody() {
    const mainNav = document.querySelector("sgds-mainnav") as HTMLElement | null;
    if (!mainNav?.shadowRoot) return;
    return mainNav.shadowRoot.querySelector(".navbar-body") as HTMLElement | null;
  }

  private _openMobileMenu() {
    const navbarBody = this._getNavbarBody();
    if (!navbarBody) return;
    navbarBody.style.transform = "translateX(-100%)";
    this.dropdownMenu.style.display = "block";
    this.dropdownMenu.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      this.menuHeaderButton?.focus();
    }, 50);
  }

  private _hideMobileMenu() {
    this.dropdownMenu.style.display = "none";
    this.dropdownMenu.setAttribute("aria-hidden", "true");
  }

  private _resetNavbarBody(): Promise<void> {
    const navbarBody = this._getNavbarBody();
    if (!navbarBody) return Promise.resolve();

    return new Promise(resolve => {
      const onEnd = (event: TransitionEvent) => {
        if (event.propertyName === "transform") {
          navbarBody.removeEventListener("transitionend", onEnd);
          resolve();
        }
      };

      const hasTransition = getComputedStyle(navbarBody).transitionProperty.includes("transform");
      if (hasTransition) {
        navbarBody.addEventListener("transitionend", onEnd);
        navbarBody.style.removeProperty("transform");
      } else {
        navbarBody.style.removeProperty("transform");
        resolve();
      }
    });
  }

  private async _closeMobileMenu() {
    await this._resetNavbarBody();
    this._hideMobileMenu();
    this.navLink.focus();
  }

  // ── Mobile keyboard navigation ──

  private _handleKeyboardMenuItemsEvent(e: KeyboardEvent) {
    if (!this._isMobile) return;

    const slottedItems = this.defaultSlotItems.filter(item => !item.hasAttribute("disabled"));
    const items = [this.menuHeaderButton, ...slottedItems];
    const itemLength = items.length;
    if (itemLength === 0) return;

    const firstItem = items[0];
    const lastItem = items[itemLength - 1].shadowRoot?.querySelector(".dropdown-item") as HTMLElement;
    let activeElement = document.activeElement as HTMLElement;
    if (activeElement === this) {
      activeElement = (this.shadowRoot?.activeElement as HTMLElement) ?? activeElement;
    }

    switch (e.key) {
      case "Tab": {
        if (e.shiftKey) {
          if (activeElement === firstItem) {
            e.preventDefault();
            setTimeout(() => lastItem?.focus(), 0);
          }
        } else {
          const activeShadowElement = activeElement.shadowRoot
            ? activeElement.shadowRoot.querySelector(".dropdown-item")
            : null;
          if (activeShadowElement && activeShadowElement === lastItem) {
            e.preventDefault();
            firstItem?.focus();
          }
        }
        break;
      }
      default:
        break;
    }
  }

  private _handleHeaderKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case TAB: {
        this._handleKeyboardMenuItemsEvent(event);
        break;
      }
      case ENTER:
      case SPACE: {
        event.preventDefault();
        this._closeMobileMenu();
        break;
      }
      default:
        break;
    }
  }

  render() {
    return html`
      <button
        class="${classMap({
          "nav-link": true,
          active: this.active,
          disabled: this.disabled,
          show: this._menuOpen
        })}"
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-expanded=${this._menuOpen ? "true" : "false"}
        aria-label=${ifDefined(this.ariaLabel)}
        id=${this.togglerId}
        ?disabled=${this.disabled}
        @click=${this._handleToggle}
        @keydown=${this._handleKeyboardOpen}
      >
        <span class="toggler-wrapper"><slot name="toggler" @slotchange=${this._handleTogglerSlotChange}></slot></span>
        <sgds-icon class="icon-down" name="chevron-down" size="md"></sgds-icon>
        <sgds-icon class="icon-right" name="chevron-right" size="md"></sgds-icon>
      </button>
      <div
        class="dropdown-menu ${this._menuOpen ? "menu-open" : ""}"
        role="menu"
        aria-hidden="true"
        @keydown=${this._handleMenuKeydown}
      >
        <div class="mobile-header">
          <a tabindex="0" role="button" @click=${this._closeMobileMenu} @keydown=${this._handleHeaderKeyboardEvent}>
            <sgds-icon name="chevron-left" size="md"></sgds-icon>
            <span class="back-text"></span>
          </a>
        </div>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

export default SgdsMainnavDropdown;
