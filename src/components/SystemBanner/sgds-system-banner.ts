import { html, nothing, PropertyValueMap } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import SgdsCloseButton from "../CloseButton/sgds-close-button";
import { animateTo } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { watch } from "../../utils/watch";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import alertBannerStyles from "./system-banner.css";
import SgdsSystemBannerItem from "./sgds-system-banner-item";
import { SystemBannerChildCountContext, NoClampActionContext } from "./system-banner-context";
import { provide } from "@lit/context";

/**
 * @summary The system banner component for displaying important messages to users at the application level.
 * Each banner can contain up to 5 banner items that cycle automatically every 5 seconds. Pagination appears when there are multiple items, allowing users to navigate between them. The banner can also be made dismissible with a close button.
 * `sgds-system-banner-item` is the subcomponent for `sgds-system-banner`. Each banner item represents a message in the system banner.
 *
 * @slot default - The slot to pass in `sgds-system-banner-item`
 *
 * @event sgds-show - Emitted when the banner has start to appear on screen
 * @event sgds-hide - Emitted when the banner is disappearing from the screen
 */
export class SgdsSystemBanner extends SgdsElement {
  static styles = [...SgdsElement.styles, alertBannerStyles];
  /**@internal */
  static dependencies = {
    "sgds-close-button": SgdsCloseButton,
    "sgds-icon": SgdsIcon,
    "sgds-icon-button": SgdsIconButton
  };
  /** Controls the appearance of the alert  */
  @property({ type: Boolean, reflect: true }) show = false;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** When true, removes max-width constraint to allow content to stretch full screen width */
  @property({ type: Boolean, reflect: true }) fluid = false;
  /** Disables the action link that appears when text content is clamped */
  @provide({ context: NoClampActionContext })

  /** When true, all its children SgdsSystemBannerItem's message will be truncated with ellipsis only */
  @property({ type: Boolean })
  noClampAction = false;

  /** Closes the alert  */
  public close() {
    this.show = false;
  }
  @queryAssignedElements({ flatten: true })
  private bannerItem: SgdsSystemBannerItem[];

  @query(".banner")
  private banner: HTMLDivElement;

  @provide({ context: SystemBannerChildCountContext })
  @state()
  private childCount: number;

  @state() private _intervalId = null;

  private _intervalTime = 5000;

  @state() private _currentIndex = 0;

  protected firstUpdated(changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(changedProperties);
    this.childCount = this.bannerItem.length;
    if (!this.show) {
      this.banner.classList.add("d-none");
    } else {
      this.childCount > 1 && this._startAutoCycle();
      this.addEventListener("mouseenter", this._pauseAutoCycle.bind(this));
      this.addEventListener("mouseleave", this._resumeAutoCycle.bind(this));

      this.addEventListener("focus", this._pauseAutoCycle.bind(this));
      this.addEventListener("blur", this._resumeAutoCycle.bind(this));
    }
    this._updateActiveItem();

    if (this.childCount > 5) {
      console.warn("It is not recommended to have more than 5 <sgds-system-banner-item> elements.");
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoCycle();
  }

  /**@internal */
  @watch("show", { waitUntilFirstUpdate: true })
  async _handleShowChange() {
    if (this.show) {
      this.childCount > 1 && this._startAutoCycle();
      this.emit("sgds-show");
      this.banner.classList.remove("d-none");
    } else {
      this._stopAutoCycle();
      this.emit("sgds-hide");
      this.banner.classList.add("d-none");
    }
  }

  private _updateActiveItem() {
    const items = this.bannerItem;
    items.forEach((item, i) => {
      if (i === this._currentIndex) {
        item.setAttribute("active", "");
      } else {
        item.removeAttribute("active");
      }
    });
  }
  private _next() {
    const items = this.bannerItem;
    this._currentIndex = (this._currentIndex + 1) % items.length;
    this._updateActiveItem();
    this._animateItem(items[this._currentIndex], "next");
    this._resetAutoCycle();
  }

  private _prev() {
    const items = this.bannerItem;
    this._currentIndex = (this._currentIndex - 1 + items.length) % items.length;
    this._updateActiveItem();
    this._animateItem(items[this._currentIndex], "prev");
    this._resetAutoCycle();
  }
  private async _animateItem(item: SgdsSystemBannerItem, direction: "next" | "prev") {
    // Cancel any existing animations before starting a new one
    item.getAnimations().forEach(a => a.cancel());
    // Start the slide-down animation
    const bannerLoopMessage = getAnimation(this, `banner.item.${direction}`);
    await animateTo(item, bannerLoopMessage.keyframes, bannerLoopMessage.options);
  }
  private _startAutoCycle() {
    this._stopAutoCycle(); // avoid duplicates
    this._intervalId = setInterval(() => this._next(), this._intervalTime);
  }

  private _stopAutoCycle() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
  private _resetAutoCycle() {
    this._stopAutoCycle();
    this._startAutoCycle();
  }
  private _pauseAutoCycle(): void {
    this._stopAutoCycle();
  }

  private _resumeAutoCycle(): void {
    if (this.show && this.childCount > 1) {
      this._startAutoCycle();
    }
  }
  render() {
    return html`
      <div
        class="${classMap({
          banner: true
        })}"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
      >
        <div class="content">
          <slot id="loop-slot"></slot>
        </div>
        ${this.childCount > 1
          ? html` <div class="pagination">
              <sgds-icon-button
                name="chevron-left"
                tone="fixed-light"
                variant="ghost"
                size="xs"
                @click=${this._prev}
              ></sgds-icon-button>
              <span>${this._currentIndex + 1}/${this.childCount}</span>
              <sgds-icon-button
                name="chevron-right"
                tone="fixed-light"
                variant="ghost"
                size="xs"
                @click=${this._next}
              ></sgds-icon-button>
            </div>`
          : nothing}
        ${this.dismissible
          ? html`
              <sgds-close-button
                aria-label="close the alert"
                @click=${this.close}
                tone="fixed-light"
              ></sgds-close-button>
            `
          : nothing}
      </div>
    `;
  }
}

export default SgdsSystemBanner;

setDefaultAnimation("banner.item.next", {
  keyframes: [
    { opacity: 0, transform: "translateY(-100%)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  options: {
    duration: 500,
    easing: "cubic-bezier(0.45,0.05,0.55,0.95)"
  }
});
setDefaultAnimation("banner.item.prev", {
  keyframes: [
    { opacity: 0, transform: "translateY(100%)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  options: {
    duration: 500,
    easing: "cubic-bezier(0.45,0.05,0.55,0.95)"
  }
});
