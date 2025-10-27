import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { html, nothing } from "lit";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import alertBannerItemStyles from "./alert-banner-item.css";
import { watch } from "../../utils/watch";
import { classMap } from "lit/directives/class-map.js";
export type AlertBannerVariant = "info" | "danger" | "warning" | "neutral";

export class SgdsAlertBannerItem extends SgdsElement {
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

export default SgdsAlertBannerItem;
