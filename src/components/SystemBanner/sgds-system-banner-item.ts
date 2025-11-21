import { html, nothing } from "lit";
import SgdsElement from "../../base/sgds-element";
import alertBannerItemStyles from "./system-banner-item.css";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
export type AlertBannerVariant = "info" | "danger" | "warning" | "neutral";

/**
 * @summary The item component for `sgds-system-banner`. Each banner item represents a message in the system banner.
 *
 * @slot icon - The slot to pass in an icon element
 * @slot action - The slot to pass in an action element such as a button or link
 * @slot default - The slot to pass in the message content of the banner item
 */
export class SgdsSystemBannerItem extends SgdsElement {
  static styles = [...SgdsElement.styles, alertBannerItemStyles];

  @state() clamped = false;
  _resizeObserver: ResizeObserver;
  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    await this.updateComplete
    this._clampCheck();

    // Watch resizing for dynamic layout changes
    this._resizeObserver = new ResizeObserver(() => this._clampCheck());
    this._resizeObserver.observe(
      this.shadowRoot.querySelector('.message')
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) this._resizeObserver.disconnect();
  }
   private _clampCheck() {
    const textEl = this.shadowRoot.querySelector('.message');

    requestAnimationFrame(() => {
      this.clamped = textEl.scrollHeight > textEl.clientHeight;
    });
  } 

  private _handleShowMoreClick() {
   this.emit('sgds-show-more');
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
           ${this.clamped ? html`<a class="inline-link" @click="${this._handleShowMoreClick}">show more</a>` : nothing}
          </div>
          <div class="action">
            <slot name="action"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

export default SgdsSystemBannerItem;
