import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import alertBannerItemStyles from "./system-banner-item.css";
import { HasSlotController } from "../../utils/slot";

/**
 * @summary The item component for `sgds-system-banner`. Each banner item represents a message in the system banner.
 *
 * @slot icon - The slot to pass in an icon element.
 * @slot action - The slot to pass in an action element such as a button or link
 * @slot default - The slot to pass in the message content of the banner item. Text will be clamped at 2 lines
 *
 * @event sgds-show-more - The event emitted when user clicks on "show more" in the banner text message
 */
export class SgdsSystemBannerItem extends SgdsElement {
  static styles = [...SgdsElement.styles, alertBannerItemStyles];

  @state() private clamped = false;

  @property({ type: Boolean }) hasActionSlot = false;

  private readonly hasSlotController = new HasSlotController(this, "action");

  private _resizeObserver: ResizeObserver;
  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    await this.updateComplete;
    this._clampCheck();

    // Watch resizing for dynamic layout changes
    this._resizeObserver = new ResizeObserver(() => this._clampCheck());
    this._resizeObserver.observe(this.shadowRoot.querySelector(".message"));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) this._resizeObserver.disconnect();
  }
  updated() {
    if (!this.hasActionSlot) this.hasActionSlot = this.hasSlotController.test("action");
  }
  private _clampCheck() {
    const textEl = this.shadowRoot.querySelector(".message");
    requestAnimationFrame(() => {
      this.clamped = textEl.scrollHeight > textEl.clientHeight;
    });
  }

  private _handleShowMoreClick() {
    this.emit("sgds-show-more");
  }
  render() {
    return html`
      <div class="banner-item">
        <slot name="icon"></slot>
        <div class="banner-item__message_and__action">
          <div class="clamped-container">
            <div class=${classMap({ message: true, truncated: this.clamped })}>
              <slot></slot>
            </div>
            ${this.clamped
              ? html`<span class="show-more"
                  >...<a class="show-more__link" @click="${this._handleShowMoreClick}">show more</a></span
                >`
              : nothing}
          </div>
          ${this.hasActionSlot || this.getAttribute("data-banner-item")
            ? html`
                <div class=${classMap({ action: true, "mh-20": this.getAttribute("data-banner-item") })}>
                  <slot name="action"></slot>
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}
export default SgdsSystemBannerItem;
