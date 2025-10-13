import SgdsElement from "../../base/sgds-element";
import { html, PropertyValueMap } from "lit";
import { query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../utils/watch";
import { waitForEvent } from "../../utils/event";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { LG_BREAKPOINT, MD_BREAKPOINT } from "../../utils/breakpoints";
import SgdsIcon from "../Icon/sgds-icon";
import subnavStyle from "./subnav.css";
import gridStyle from "../../css/grid.css";

const VALID_KEYS = ["Enter", " "];

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

  @query("nav")
  private nav: HTMLElement;

  @query(".subnav-nav")
  private mobileNav: HTMLElement;

  @query(".header-container")
  private headerContainer: HTMLElement;

  @query(".subnav-toggler")
  private toggler: HTMLElement;

  @query(".subnav-nav-group")
  private navGroup: HTMLElement;

  @query(".subnav-actions")
  private mobileActions: HTMLElement;

  @state()
  private isCollapsed = false;

  @state()
  private isMenuOpen = false;

  connectedCallback() {
    super.connectedCallback();

    // this._handleResize();
    window.addEventListener("resize", this._handleResize);
    window.addEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this.navGroup));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("resize", this._handleResize);
    window.removeEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this.navGroup));
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);

    this._handleResize();
  }

  private _handleResize = async () => {
    this.isCollapsed = window.innerWidth < LG_BREAKPOINT;

    await this.updateComplete;

    if (!this.isCollapsed) {
      this.isMenuOpen = false;
    }

    this._updateMobileLayout();
  };

  private _updateMobileLayout = () => {
    if (!this.nav || !this.headerContainer || !this.mobileActions || !this.mobileNav) return;

    if (this.isCollapsed) {
      const { top: subnavTop } = this.nav.getBoundingClientRect();
      const headerHeight = this.headerContainer.clientHeight;
      const actionsButtonHeight = this.mobileActions.clientHeight;
      const offset =
        window.innerWidth >= MD_BREAKPOINT && window.innerWidth < LG_BREAKPOINT
          ? subnavTop + headerHeight
          : subnavTop + headerHeight + actionsButtonHeight;

      this.mobileNav.style.maxHeight = `calc(100dvh - ${offset}px)`;
      this.style.minHeight = `${this.nav.clientHeight}px`;
      this.nav.style.position = "absolute";
    } else {
      this.mobileNav.style.maxHeight = "none";
      this.style.minHeight = "auto";
      this.nav.style.position = "relative";
    }
  };

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

  private async _onKeyboardToggle(event: KeyboardEvent) {
    if (!VALID_KEYS.includes(event.key)) return;

    event.preventDefault();
    this._toggleMenu();
  }

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
    if (this.isCollapsed) {
      this.mobileNav.style.display = "flex";
    }

    const { keyframes, options } = getAnimation(this, "subnav.show");
    await animateTo(this.mobileNav, shimKeyframesHeightAuto(keyframes, this.mobileNav.scrollHeight), options);

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
    if (this.isCollapsed) {
      this.mobileNav.style.display = "none";
    }

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

  @watch("isCollapsed", { waitUntilFirstUpdate: true })
  async handleCollapsedChange() {
    await this.updateComplete;
    this.mobileNav.style.display = this.isCollapsed ? "none" : "flex";
  }

  render() {
    return html`
      <nav aria-label="Sub navigation">
        <div
          class=${classMap({
            "sgds-container": true,
            subnav: true,
            collapsed: !this.isMenuOpen
          })}
        >
          <div class="header-container">
            <slot name="header"></slot>
            <sgds-icon
              class="subnav-toggler"
              name="chevron-down"
              tabindex="0"
              @click=${this._toggleMenu}
              @keydown=${this._onKeyboardToggle}
              aria-label="Toggle sub navigation"
              aria-expanded=${this.isMenuOpen}
            ></sgds-icon>
          </div>
          <div class="subnav-nav-group">
            <div class="subnav-nav">
              <slot></slot>
            </div>
            <div class="subnav-actions">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
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
