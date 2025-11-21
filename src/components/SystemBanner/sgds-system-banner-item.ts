import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import alertBannerItemStyles from "./system-banner-item.css";
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

  render() {
    return html`
      <div class="banner-item">
        <slot name="icon"></slot>
        <div class="banner-item__message_and__action">
          <div class="message">
            <slot></slot>
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
