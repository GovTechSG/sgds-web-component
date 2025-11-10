import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { html, LitElement, nothing, PropertyValueMap } from "lit";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import alertBannerStyles from "./alert-banner.css";
import { watch } from "../../utils/watch";
import { classMap } from "lit/directives/class-map.js";
import SgdsAlertBannerItem from "./sgds-alert-banner-item";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { animateTo } from "../../utils/animate";
export type AlertBannerVariant = "info" | "danger" | "warning" | "neutral";

export class SgdsAlertBanner extends SgdsElement {
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

  /** The alert's theme variant. */
  @property({ type: String, reflect: true }) variant: AlertBannerVariant = "info";

  /** Controls the alert visual between a lighter outline and a solid darker variant. */
  @property({ type: Boolean, reflect: true }) outlined = false;

  /** The title of the alert. Only text is allowed */
  @property({ type: String, reflect: true }) title: string;

  /** Closes the alert  */
  public close() {
    this.show = false;
  }
  @queryAssignedElements({ flatten: true })
  bannerItem: SgdsAlertBannerItem[];

  @query(".banner")
  banner: HTMLDivElement;
  @state() private childCount: number;

  @state() private _intervalId = null;

  private _intervalTime = 20000; // 20 seconds

  @state() private _currentIndex = 0;

  protected firstUpdated(changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(changedProperties);
    if (!this.show) {
      this.banner.classList.add("d-none");
    } else {
      this._startAutoCycle();
      this.addEventListener("mouseenter", this._pauseAutoCycle.bind(this));
      this.addEventListener("mouseleave", this._resumeAutoCycle.bind(this));
    }
    this._updateActiveItem();
    this.childCount = this.bannerItem.length;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoCycle();
  }

  /**@internal */
  @watch("show", { waitUntilFirstUpdate: true })
  async _handleShowChange() {
    if (this.show) {
      this._startAutoCycle();
      this.emit("sgds-show");
      this.banner.classList.remove("d-none");
      const bannerShow = getAnimation(this, "banner.show");
      await animateTo(this, bannerShow.keyframes, bannerShow.options);
      this.emit("sgds-after-show");
    } else {
      this._stopAutoCycle();
      this.emit("sgds-hide");
      const bannerHide = getAnimation(this, "banner.hide");
      await animateTo(this, bannerHide.keyframes, bannerHide.options);
      this.banner.classList.add("d-none");

      this.emit("sgds-after-hide");
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
  private _animateItem(item: SgdsAlertBannerItem, direction: "next" | "prev") {
    // Cancel any existing animations before starting a new one
    item.getAnimations().forEach(a => a.cancel());
    // Start the slide-down animation
    const animationSettings = {
      next: [
        { opacity: 0, transform: "translateY(-100%)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      prev: [
        { opacity: 0, transform: "translateY(100%)" },
        { opacity: 1, transform: "translateY(0)" }
      ]
    };
    item.animate(animationSettings[direction], {
      duration: 500,
      easing: "cubic-bezier(0.45,0.05,0.55,0.95)"
    });
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
    if (this.show) {
      this._startAutoCycle();
    }
  }
  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements() as SgdsAlertBannerItem[];
    assignedElements.forEach(item => item.setAttribute("variant", this.variant));
  }
  render() {
    const buttonTone = this.variant === "warning" ? "neutral" : "fixed-light";
    return html`
      <div
        class="${classMap({
          banner: true,
          outlined: this.outlined
        })}"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
      >
        <div class="content">
          <slot id="loop-slot" @slotchange=${this._handleSlotChange}></slot>
        </div>
        <div class="pagination">
          <sgds-icon-button
            name="chevron-left"
            tone=${buttonTone}
            variant="ghost"
            size="xs"
            @click=${this._prev}
          ></sgds-icon-button>
          <span>${this._currentIndex + 1}/${this.childCount}</span>
          <sgds-icon-button
            name="chevron-right"
            tone=${buttonTone}
            variant="ghost"
            size="xs"
            @click=${this._next}
          ></sgds-icon-button>
        </div>
        ${this.dismissible
          ? html`<sgds-close-button
              aria-label="close the alert"
              @click=${this.close}
              variant=${this.variant === "warning" ? "dark" : "light"}
            ></sgds-close-button>`
          : nothing}
      </div>
    `;
  }
}

export default SgdsAlertBanner;

setDefaultAnimation("banner.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 400, easing: "ease" }
});
setDefaultAnimation("banner.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 400, easing: "ease" }
});
