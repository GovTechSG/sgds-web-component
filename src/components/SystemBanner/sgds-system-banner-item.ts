import { html } from "lit";
import SgdsElement from "../../base/sgds-element";
import alertBannerItemStyles from "./system-banner-item.css";
export type AlertBannerVariant = "info" | "danger" | "warning" | "neutral";

export class SgdsSystemBannerItem extends SgdsElement {
  static styles = [...SgdsElement.styles, alertBannerItemStyles];

  render() {
    return html`
      <div class="banner-item">
        <slot name="icon"></slot>
        <div class="content">
          <div class="content-top">
            <div class="title">
              <slot name="title"></slot>
            </div>
            <div class="message"><slot></slot></div>
          </div>
          <div class="action">
            <slot name="action"></slot>
            <sgds-icon name="arrow-right"></sgds-icon>
          </div>
        </div>
      </div>
    `;
  }
}

export default SgdsSystemBannerItem;
