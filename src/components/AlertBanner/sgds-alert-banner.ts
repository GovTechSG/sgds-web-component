import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { html, nothing } from "lit";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import alertBannerStyles from "./alert-banner.css";
import { watch } from "../../utils/watch";
import { classMap } from "lit/directives/class-map.js";
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
  /**@internal */
  @watch("show")
  _handleShowChange() {
    this.show ? this.emit("sgds-show") : this.emit("sgds-hide");
  }

  render() {
    return (this.dismissible && this.show) || !this.dismissible
      ? html`
          <div
            class="${classMap({
              alert: true,
              show: this.show,
              [`alert-dismissible`]: this.dismissible,
              outlined: this.outlined
            })}"
            role="alert"
            aria-hidden=${this.show ? "false" : "true"}
          >
            <div class="content">
              <slot></slot>
            </div>
            <div class="pagination">
              <sgds-icon-button name="chevron-left" tone="fixed-light" variant="ghost" size="xs"></sgds-icon-button>
              <span>1/3</span>
              <sgds-icon-button name="chevron-right" tone="fixed-light" variant="ghost" size="xs"></sgds-icon-button>
            </div>
            ${this.dismissible
              ? html`<sgds-close-button
                  aria-label="close the alert"
                  @click=${this.close}
                  variant=${this.outlined ? "dark" : "light"}
                ></sgds-close-button>`
              : nothing}
          </div>
        `
      : nothing;
  }
}

export default SgdsAlertBanner;
