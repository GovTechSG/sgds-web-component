import { html, nothing, PropertyValueMap, TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "./sgds-element";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../utils/animate";
import { getAnimation, setDefaultAnimation } from "../utils/animation-registry";
import { LG_BREAKPOINT, MD_BREAKPOINT, SM_BREAKPOINT, XL_BREAKPOINT, XXL_BREAKPOINT } from "../utils/breakpoints";
import { waitForEvent } from "../utils/event";
import genId from "../utils/generateId";
import { watch } from "../utils/watch";
import SgdsIconButton from "../components/IconButton/sgds-icon-button";

export type NavExpandSize = "sm" | "md" | "lg" | "xl" | "xxl" | "always" | "never";
export type NavTone = "default" | "brand" | "gradient-1" | "gradient-2" | "gradient-3" | "gradient-4";

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
 * Base class for navigation components (sgds-mainnav and sgds-appnav).
 * Provides collapse/expand behavior, breakpoint handling, and animation logic.
 * Subclasses must implement `render()` and provide their own context.
 */
export default abstract class NavElement extends SgdsElement {
  /** @internal */
  static dependencies = {
    "sgds-icon-button": SgdsIconButton
  };

  /** Indicates if mobile menu is open or closed */
  @state()
  protected expanded = false;

  /** Denotes the transition state of mobile mainnav menu opening */
  @state()
  protected expanding = false;

  @query("nav") protected nav!: HTMLElement;
  @query(".navbar") protected navbar!: HTMLElement;
  @query(".navbar-toggler") protected header!: HTMLElement;
  @query(".navbar-body") protected body!: HTMLElement;
  @query(".navbar-nav-scroll") protected navScroll!: HTMLElement;
  @query(".navbar-end") protected navbarEnd!: HTMLElement;

  /** The href link for brand logo */
  @property({ type: String })
  brandHref = "";

  /** @internal */
  protected collapseId = genId("nav", "collapse");

  /** The breakpoint, below which, the Navbar will collapse. When always the Navbar will always be expanded regardless of screen size. When never, the Navbar will always be collapsed */
  @property({ type: String })
  expand: NavExpandSize = "lg";

  @state()
  protected breakpointReached = false;

  /** @internal Whether sgds-*-profile is slotted in the profile slot */
  @state()
  protected _hasProfileComponent = false;

  connectedCallback() {
    super.connectedCallback();
    this._handleResize();
    window.addEventListener("click", this._handleClickOutsideBound);
    window.addEventListener("resize", this._handleResizeBound);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this._handleClickOutsideBound);
    window.removeEventListener("resize", this._handleResizeBound);
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    if (this.breakpointReached && this.body) {
      this.expanded = false;
      this.body.hidden = true;
      this._handleMobileNav();
      this._onBreakpointReached(true);
    }
  }

  private _handleClickOutsideBound = (event: MouseEvent) => this._handleClickOutOfElement(event, this.body);
  private _handleResizeBound = () => this._handleResize();

  private _handleClickOutOfElement(e: MouseEvent, self: HTMLElement) {
    if (!e.composedPath().includes(self) && !(this.header && e.composedPath().includes(this.header))) {
      this.hide();
    }
  }

  protected _handleSummaryClick() {
    if (this.expanded) {
      this.hide();
    } else {
      document.body.style.overflow = "hidden";
      this.show();
    }
  }

  protected _handleResize() {
    const newBreakpointReachedValue = window.innerWidth < SIZES[this.expand];
    if (newBreakpointReachedValue !== this.breakpointReached) {
      this.requestUpdate();
    } else {
      this.body ? (this.body.hidden = true) : null;
      this.expanding = false;
    }

    if (newBreakpointReachedValue) {
      this._handleMobileNav();
      if (!this._isBreakpointReached()) {
        this._onBreakpointReached(true);
        window.addEventListener("scrollend", this._handleMobileNavBound);
      }
    } else {
      this._handleDesktopNav();
      this._onBreakpointReached(false);
      window.removeEventListener("scrollend", this._handleMobileNavBound);
    }
  }

  /** Hook for subclasses to update context providers when breakpoint state changes */
  protected abstract _onBreakpointReached(reached: boolean): void;

  /** Hook for subclasses to check current breakpoint context state */
  protected abstract _isBreakpointReached(): boolean;

  private _handleMobileNavBound = this._handleMobileNav.bind(this);

  protected async _handleMobileNav() {
    if (!this.nav) return;
    this.nav.appendChild(this.body);
    await customElements.whenDefined("sgds-masthead");

    const { bottom } = this.nav.getBoundingClientRect();
    const navBodyPaddingY =
      parseFloat(getComputedStyle(this.body).paddingTop) + parseFloat(getComputedStyle(this.body).paddingBottom);

    this.navScroll.style.maxHeight = `calc(100dvh - ${bottom}px - ${navBodyPaddingY}px)`;
  }

  protected _handleDesktopNav() {
    this.navbar?.insertBefore(this.body, this.navbarEnd);
  }

  private async _animateToShow() {
    const sgdsShow = this.emit("sgds-show", { cancelable: true });
    if (sgdsShow.defaultPrevented) {
      this.expanding = false;
      this.expanded = false;
      return;
    }

    await stopAnimations(this.body);
    this.body.hidden = false;

    const { keyframes, options } = getAnimation(this, "nav.show");
    await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
    this.body.style.height = "auto";

    this._onMenuShown();
    this.emit("sgds-after-show");
  }

  /** Hook for subclasses to perform actions after the mobile menu opens (e.g., focus management) */
  protected _onMenuShown(): void {
    // Default: no-op. Subclasses can override.
  }

  private async _animateToHide() {
    const sgdsHide = this.emit("sgds-hide", { cancelable: true });
    if (sgdsHide.defaultPrevented) {
      this.expanding = false;
      this.expanded = true;
      return;
    }

    await stopAnimations(this.body);

    const { keyframes, options } = getAnimation(this, "nav.hide");
    await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
    this.body.hidden = true;
    this.body.style.height = "auto";
    this.emit("sgds-after-hide");
  }

  /** @internal */
  @watch("expanding", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.expanding) {
      await this._animateToShow();
      this.expanded = true;
    } else {
      this.header?.focus();
      await this._animateToHide();
      this.expanded = false;
    }
  }

  /** Shows the menu. For when nav is in the collapsed form */
  public async show() {
    if (this.expanded) return;
    this.expanding = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the menu. For when nav is in the collapsed form */
  public async hide() {
    if (!this.expanded) return;
    this.expanding = false;
    document.body.style.removeProperty("overflow");
    return waitForEvent(this, "sgds-after-hide");
  }

  /** Helper to get the expand CSS class */
  protected _expandClass() {
    switch (this.expand) {
      case "always":
        return "navbar-expand";
      case "never":
        break;
      default:
        return `navbar-expand-${this.expand}`;
    }
  }

  /** Helper: renders the hamburger toggler icon-button. Subclasses should call this in their render(). */
  protected _renderToggler(tone?: NavTone): TemplateResult | typeof nothing {
    return html`<sgds-icon-button
      name=${this.expanded ? "cross" : "menu"}
      variant="ghost"
      size="sm"
      tone=${ifDefined(tone && tone !== "default" ? "fixed-light" : undefined)}
      class="navbar-toggler"
      @click=${this._handleSummaryClick}
      aria-controls="${this.collapseId}"
      aria-expanded="${this.expanded}"
      .ariaLabel=${"Toggle navigation"}
    ></sgds-icon-button>`;
  }
}

setDefaultAnimation("nav.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

setDefaultAnimation("nav.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});
