import { provide } from "@lit/context";
import { html } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { LG_BREAKPOINT, MD_BREAKPOINT, SM_BREAKPOINT, XL_BREAKPOINT, XXL_BREAKPOINT } from "../../utils/breakpoints";
import { waitForEvent } from "../../utils/event";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import { MainnavContext } from "./mainnav-context";
import mainnavStyle from "./mainnav.css";
import SgdsMainnavDropdown from "./sgds-mainnav-dropdown";
import SgdsMainnavItem from "./sgds-mainnav-item";
export type MainnavExpandSize = "sm" | "md" | "lg" | "xl" | "xxl" | "always" | "never";

const SIZES = {
  sm: SM_BREAKPOINT,
  md: MD_BREAKPOINT,
  lg: LG_BREAKPOINT,
  xl: XL_BREAKPOINT,
  xxl: XXL_BREAKPOINT,
  never: Infinity,
  always: -1
};

/**
 * @summary This component is the primary means that your users will use to navigate through your portal. It includes horizontal navigation and branding to identify your site.
 *
 * @event sgds-show - Emitted on show. Only for collapsed menu.
 * @event sgds-after-show - Emitted on show after animation has completed. Only for collapsed menu.
 * @event sgds-hide - Emitted on hide. Only for collapsed menu.
 * @event sgds-after-hide - Emitted on hide after animation has completed. Only for collapsed menu.
 *
 * @slot default - Default slot of SgdsMainnav. Pass in SgdsMainnavItem elements here.
 * @slot end - Elements in this slot will be positioned to the right end of .navbar-nav. Elements in this slot will also be included in collapsed menu.
 * @slot brand - Brand slot of SgdsMainnav. Pass in brand logo img here
 * @slot non-collapsible - Elements in this slot will not be collapsed
 *
 */
export class SgdsMainnav extends SgdsElement {
  static styles = [...SgdsElement.styles, mainnavStyle];
  /** @internal */
  static dependencies = {
    "sgds-icon-button": SgdsIconButton
  };

  @provide({ context: MainnavContext })
  @state()
  private _breakpointReached = false;

  /** @internal */
  @query("nav") nav: HTMLElement;
  /** @internal */
  @query(".navbar") navbar: HTMLElement;
  /** @internal */
  @query(".navbar-toggler") header: HTMLElement;
  /** @internal */
  @query(".navbar-body") body: HTMLElement;
  /** @internal */
  @query(".navbar-nav-scroll") navScroll: HTMLElement;
  /** @internal */
  @query("slot[name='non-collapsible']") nonCollapsibleSlot: HTMLSlotElement;

  constructor() {
    super();
    window.addEventListener("resize", () => {
      const newBreakpointReachedValue = window.innerWidth < SIZES[this.expand];
      if (newBreakpointReachedValue !== this.breakpointReached) {
        this.requestUpdate();
      } else {
        this.body ? (this.body.hidden = true) : null;
        this.expanded = false;
      }

      if (newBreakpointReachedValue) {
        this._handleMobileNav();

        if (!this._breakpointReached) {
          this._breakpointReached = true;
        }
      } else {
        this._handleDesktopNav();
        this._breakpointReached = false;
      }
    });
  }

  /** The href link for brand logo */
  @property({ type: String })
  brandHref = "";

  private collapseId = genId("mainnav", "collapse");

  /** The breakpoint, below which, the Navbar will collapse. When always the Navbar will always be expanded regardless of screen size. When never, the Navbar will always be collapsed */
  @property({ type: String })
  expand: MainnavExpandSize = "lg";

  /** @internal */
  @state()
  breakpointReached = false;

  /** @internal */
  @state()
  expanded = false;

  /** @internal */
  @queryAssignedElements() private defaultNodes!: SgdsMainnavItem[] | SgdsMainnavDropdown[];

  /** @internal */
  @queryAssignedElements({ slot: "end" }) private endNodes!: SgdsMainnavItem[] | SgdsMainnavDropdown[];

  /** @internal */
  get defaultSlotItems(): SgdsMainnavItem[] | SgdsMainnavDropdown[] {
    return [...(this.defaultNodes || [])].filter((node: HTMLElement) => typeof node.tagName !== "undefined") as
      | SgdsMainnavItem[]
      | SgdsMainnavDropdown[];
  }

  /** @internal */
  get endSlotItems(): SgdsMainnavItem[] | SgdsMainnavDropdown[] {
    return [...(this.endNodes || [])].filter((node: HTMLElement) => typeof node.tagName !== "undefined") as
      | SgdsMainnavItem[]
      | SgdsMainnavDropdown[];
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this.body));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this.body));
  }

  firstUpdated() {
    if (this.breakpointReached && this.body) {
      this.expanded = false;
      this.body.hidden = true;
      this._handleMobileNav();
      this._breakpointReached = true;
    }

    const items = [...this.defaultSlotItems, ...this.endSlotItems] as SgdsMainnavItem[] | SgdsMainnavDropdown[];
    items.forEach((item: SgdsMainnavItem | SgdsMainnavDropdown) => {
      item.setAttribute("expand", this.expand);
    });
  }

  private _handleClickOutOfElement(e: MouseEvent, self: HTMLElement) {
    if (!e.composedPath().includes(self) && !e.composedPath().includes(this.header)) {
      this.hide();
    }
  }

  private _handleSummaryClick() {
    if (this.expanded) {
      this.hide();
    } else {
      document.querySelector("body").style.overflow = "hidden";
      this.show();
    }
  }

  private async _handleMobileNav() {
    if (!this.nav) return;

    this.nav.appendChild(this.body);
    await customElements.whenDefined("sgds-masthead");
    const offsetTop = this.nav.offsetTop;
    const navHeight = this.nav.clientHeight;
    const mainNavPosition = offsetTop + navHeight;
    this.body.style.top = `${mainNavPosition}px`;
    this.navScroll.style.maxHeight = `calc(100dvh - ${mainNavPosition}px)`;
  }

  private _handleDesktopNav() {
    this.navbar?.insertBefore(this.body, this.nonCollapsibleSlot);
  }

  private async _animateToShow() {
    const sgdsShow = this.emit("sgds-show", { cancelable: true });
    if (sgdsShow.defaultPrevented) {
      this.expanded = false;
      return;
    }

    await stopAnimations(this.body);
    this.body.hidden = false;

    const { keyframes, options } = getAnimation(this, "mainnav.show");
    await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
    this.body.style.height = "auto";

    this.emit("sgds-after-show");
  }

  private async _animateToHide() {
    const slHide = this.emit("sgds-hide", { cancelable: true });
    if (slHide.defaultPrevented) {
      this.expanded = true;
      return;
    }

    await stopAnimations(this.body);

    const { keyframes, options } = getAnimation(this, "mainnav.hide");
    await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
    this.body.hidden = true;
    this.body.style.height = "auto";

    this.emit("sgds-after-hide");
  }

  @watch("expanded", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.expanded) {
      // Show
      this._animateToShow();
    } else {
      this.header.focus();
      // Hide
      this._animateToHide();
    }
  }
  /** Shows the menu. For when mainnav is in the collapsed form */
  public async show() {
    if (this.expanded) {
      return;
    }

    this.expanded = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the menu. For when mainnav is in the collapsed form */
  public async hide() {
    if (!this.expanded) {
      return;
    }

    this.expanded = false;
    document.querySelector("body").style.removeProperty("overflow");

    return waitForEvent(this, "sgds-after-hide");
  }

  // assigning name attribute to elements added in slot="end", to use wildcard css selector to assign styles only to *-mainnav-item
  _handleSlotChange(e: Event) {
    const childElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true });

    childElements.forEach(e => {
      e.setAttribute("name", e.tagName.toLowerCase());
    });
  }

  render() {
    this.breakpointReached = window.innerWidth < SIZES[this.expand];

    return html`
      <nav>
        <div class="navbar ${this._expandClass()}">
          <a class="navbar-brand" href=${this.brandHref} aria-label="brand-link">
            <slot name="brand"></slot>
          </a>
          <div class="navbar-body navbar-collapse" id=${this.collapseId}>
            <div class="navbar-nav navbar-nav-scroll">
              <slot></slot>
              <slot
                name="end"
                class=${classMap({ "slot-end": !this.breakpointReached })}
                @slotchange=${this._handleSlotChange}
              ></slot>
            </div>
          </div>
          <slot name="non-collapsible"></slot>
          <sgds-icon-button
            name=${this.expanded ? "cross" : "menu"}
            variant="ghost"
            size="sm"
            class="navbar-toggler"
            @click=${this._handleSummaryClick}
            aria-controls="${this.collapseId}"
            aria-expanded="${this.expanded}"
            aria-label="Toggle navigation"
          ></sgds-icon-button>
        </div>
      </nav>
    `;
  }
  _expandClass() {
    switch (this.expand) {
      case "always":
        return "navbar-expand";
      case "never":
        break;
      default:
        return `navbar-expand-${this.expand}`;
    }
  }
}
setDefaultAnimation("mainnav.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

setDefaultAnimation("mainnav.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

export default SgdsMainnav;
