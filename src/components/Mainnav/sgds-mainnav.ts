import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { LG_BREAKPOINT, MD_BREAKPOINT, SM_BREAKPOINT, XL_BREAKPOINT, XXL_BREAKPOINT } from "../../utils/breakpoints";
import { waitForEvent } from "../../utils/event";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import styles from "./sgds-mainnav.scss";

export type MainnavExpandSize = "sm" | "md" | "lg" | "xl" | "xxl" | "always" | "never";

const SIZES = {
  sm: SM_BREAKPOINT,
  md: MD_BREAKPOINT,
  lg: LG_BREAKPOINT,
  xl: XL_BREAKPOINT,
  XXL: XXL_BREAKPOINT,
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
 * @slot - Default slot of SgdsMainnav. Pass in SgdsMainnavItem elements here.
 * @slot end - Elements in this slot will be positioned to the right end of .navbar-nav. Elements in this slot will also be included in collapsed menu.
 * @slot brand - Brand slot of SgdsMainnav. Pass in brand logo img here
 * @slot non-collapsible - Elements in this slot will not be collapsed
 *
 * @cssproperty --mainnav-background-color - Navbar's background color.
 * @cssproperty --mainnav-padding-x - left and right padding for browser width > 768px
 * @cssproperty --mainnav-padding-y - top and bottom padding for browser width > 768px
 * @cssproperty --mainnav-mobile-padding-x - left and right padding for browser width < 768px
 * @cssproperty --mainnav-mobile-padding-y - top and bottom padding for browser width < 768px
 * @cssproperty --mainnav-borderBottom-width - bottom border width
 * @cssproperty --mainnav-borderBottom-color - borderBottom width color
 */
export class SgdsMainnav extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** @internal */
  @query(".navbar-toggler") header: HTMLElement;
  /** @internal */
  @query(".navbar-body") body: HTMLElement;

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
  firstUpdated() {
    if (this.breakpointReached && this.body) {
      this.expanded = false;
      this.body.hidden = true;
    }
  }
  private handleSummaryClick() {
    if (this.expanded) {
      this.hide();
    } else {
      this.show();
    }

    this.header.focus();
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
    const collapseClass = "navbar-body navbar-collapse order-2";
    return html`
      <nav
        class="sgds navbar navbar-light
        ${this._expandClass()}"
      >
        <a class="navbar-brand me-auto order-first" href=${this.brandHref} aria-label="brand-link">
          <slot name="brand"></slot>
        </a>
        <slot name="non-collapsible" class="${this.breakpointReached ? "order-1" : "order-last"}"></slot>
        <button
          class="navbar-toggler order-1"
          type="button"
          @click=${this.handleSummaryClick}
          aria-controls="${this.collapseId}"
          aria-expanded="${this.expanded}"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div class=${collapseClass} id=${this.collapseId}>
          <ul class="navbar-nav">
            <slot></slot>
            <slot
              name="end"
              class=${classMap({ "slot-end": !this.breakpointReached })}
              @slotchange=${this._handleSlotChange}
            ></slot>
          </ul>
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
