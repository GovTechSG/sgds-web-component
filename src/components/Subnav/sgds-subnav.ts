import SgdsElement from "../../base/sgds-element";
import { html, nothing } from "lit";
import { query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../utils/watch";
import { waitForEvent } from "../../utils/event";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { LG_BREAKPOINT } from "../../utils/breakpoints";
import SgdsIcon from "../Icon/sgds-icon";
import subnavStyle from "./subnav.css";
import gridStyle from "../../css/grid.css";

/**
 * @summary This component provides secondary navigation within a specific section or page. It typically appears below the main navigation and offers context-specific links or actions to help users explore related content.
 *
 * @event sgds-show - Emitted on show. Only for collapsed menu.
 * @event sgds-after-show - Emitted on show after animation has completed. Only for collapsed menu.
 * @event sgds-hide - Emitted on hide. Only for collapsed menu.
 * @event sgds-after-hide - Emitted on hide after animation has completed. Only for collapsed menu.
 *
 * @slot default - Default slot of SgdsSubnav. Pass in SgdsSubnavItem elements here.
 * @slot header - Slot for rendering the sub-navigation header or section title.
 * @slot actions - Slot for inserting contextual action elements such as buttons, filters, or other controls aligned with the sub-navigation.
 *
 */

export class SgdsSubnav extends SgdsElement {
  static styles = [...SgdsElement.styles, subnavStyle, gridStyle];
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /** @internal */
  @query("nav") nav: HTMLElement;

  /** @internal */
  @query(".subnav") subnav: HTMLElement;

  /** @internal */
  @query(".subnav-nav-mobile") mobileNav: HTMLElement;

  /** @internal */
  @query(".subnav-toggler") toggler: HTMLElement;

  /** @internal */
  @query(".subnav-dropdown") body: HTMLElement;

  /** @internal */
  @query(".subnav-actions-mobile") mobileActions: HTMLElement;

  /** @internal */
  @state()
  private isCollapsed = false;

  /** @internal */
  @state()
  private isMenuOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this._handleResize();
    window.addEventListener("resize", this._handleResize);
    window.addEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this.body));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this._handleResize);
    window.removeEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this.body));
  }

  firstUpdated() {
    this._updateMobileNavMaxHeight();
  }

  private _handleResize = () => {
    this.isCollapsed = window.innerWidth < LG_BREAKPOINT;

    if (!this.isCollapsed) {
      this.isMenuOpen = false;
    }

    this._updateMobileNavMaxHeight();
  };

  private _updateMobileNavMaxHeight = () => {
    if (!this.nav || !this.subnav || !this.mobileActions || !this.mobileNav) return;
    const { top: subnavTop } = this.nav.getBoundingClientRect();
    const headerHeight = this.subnav.clientHeight;
    const actionsButtonHeight = this.mobileActions.clientHeight;
    const offset = subnavTop + headerHeight + actionsButtonHeight;
    this.mobileNav.style.maxHeight = `calc(100dvh - ${offset}px)`;
  };

  private _handleSlotChange(e: Event) {
    const childElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true });

    if (this.isCollapsed) {
      childElements.forEach(element => {
        element.setAttribute("isCollapsed", `${this.isCollapsed}`);
      });
    } else {
      childElements.forEach(element => {
        element.removeAttribute("isCollapsed");
      });
    }
  }

  private _handleClickOutOfElement(e: MouseEvent, self: HTMLElement) {
    if (!e.composedPath().includes(self) && !e.composedPath().includes(this.toggler)) {
      this.hide();
    }
  }

  private _toggleMenu = () => {
    if (this.isMenuOpen) {
      this.hide();
    } else {
      document.querySelector("body").style.overflow = "hidden";
      this.show();
    }

    this.toggler?.focus();
  };

  /** Shows the menu. For when subnav is in the collapsed form */
  public async show() {
    if (this.isMenuOpen) {
      return;
    }

    this.isMenuOpen = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the menu. For when subnav is in the collapsed form */
  public async hide() {
    if (!this.isMenuOpen) {
      return;
    }

    this.isMenuOpen = false;
    document.querySelector("body").style.removeProperty("overflow");

    return waitForEvent(this, "sgds-after-hide");
  }

  private async _animateToShow() {
    const sgdsShow = this.emit("sgds-show", { cancelable: true });
    if (sgdsShow.defaultPrevented) {
      this.isMenuOpen = false;
      return;
    }

    await stopAnimations(this.mobileNav);
    this.mobileNav.classList.remove("hidden");

    const { keyframes, options } = getAnimation(this, "subnav.show");
    await animateTo(this.mobileNav, shimKeyframesHeightAuto(keyframes, this.mobileNav.scrollHeight), options);
    // this.mobileNav.style.height = "auto";

    this.emit("sgds-after-show");
  }

  private async _animateToHide() {
    const slHide = this.emit("sgds-hide", { cancelable: true });
    if (slHide.defaultPrevented) {
      this.isMenuOpen = true;
      return;
    }

    await stopAnimations(this.mobileNav);

    const { keyframes, options } = getAnimation(this, "subnav.hide");
    await animateTo(this.mobileNav, shimKeyframesHeightAuto(keyframes, this.mobileNav.scrollHeight), options);
    this.mobileNav.classList.add("hidden");
    // this.mobileNav.style.height = "auto";

    this.emit("sgds-after-hide");
  }

  @watch("isMenuOpen", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.isMenuOpen) {
      // Show
      this._animateToShow();
    } else {
      // Hide
      this._animateToHide();
    }
  }

  render() {
    const isHydrated = this.hasUpdated;

    return html`
      <nav
        class=${classMap({
          mobile: this.isCollapsed
        })}
        aria-label="Sub navigation"
      >
        <div
          class=${classMap({
            "sgds-container": !this.isCollapsed,
            subnav: true,
            mobile: this.isCollapsed,
            collapsed: !this.isMenuOpen
          })}
        >
          <slot name="header"></slot>
          ${this.isCollapsed
            ? html`
                <sgds-icon
                  class="subnav-toggler"
                  name="chevron-down"
                  @click=${this._toggleMenu}
                  aria-label="Toggle sub navigation"
                ></sgds-icon>
              `
            : html`
                <div class="subnav-nav-group">
                  <div class="subnav-nav">
                    <slot @slotchange="${this._handleSlotChange}"></slot>
                  </div>
                  <div class="subnav-actions">
                    <slot name="actions"></slot>
                  </div>
                </div>
              `}
        </div>
        ${this.isCollapsed
          ? html`
              <div class="subnav-dropdown">
                <div
                  class=${classMap({
                    "subnav-nav-mobile": true,
                    hidden: !this.isMenuOpen && !isHydrated
                  })}
                >
                  <slot @slotchange="${this._handleSlotChange}"></slot>
                </div>
                <div class="subnav-actions-mobile">
                  <slot name="actions"></slot>
                </div>
              </div>
            `
          : nothing}
      </nav>
    `;
  }
}

setDefaultAnimation("subnav.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

setDefaultAnimation("subnav.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

export default SgdsSubnav;
