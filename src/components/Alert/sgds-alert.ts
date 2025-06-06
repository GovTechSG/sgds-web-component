import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
import SgdsIcon from "../Icon/sgds-icon";
import alertStyle from "./alert.css";

export type AlertVariant = "info" | "success" | "danger" | "warning" | "neutral";
/**
 * @summary Alerts provide short, timely, and relevant information for your users. It can be a simple text message or customised HTML content with paragraphs, headings and links.
 *
 * @slot default - The alert's main content.
 * @slot icon - An icon to show in the alert. Pass in SVG elements.
 *
 * @event sgds-show - Emitted when the alert appears.
 * @event sgds-hide - Emitted after the alert closes.
 *
 */
export class SgdsAlert extends SgdsElement {
  static styles = [...SgdsElement.styles, alertStyle];
  /**@internal */
  static dependencies = {
    "sgds-close-button": SgdsCloseButton,
    "sgds-icon": SgdsIcon
  };
  /** Controls the appearance of the alert  */
  @property({ type: Boolean, reflect: true }) show = false;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** The alert's theme variant. */
  @property({ type: String, reflect: true }) variant: AlertVariant = "info";

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
            <slot name="icon"></slot>
            <div class="alert-content">
              ${this.title ? html`<div class="alert-title">${this.title}</div>` : nothing}
              <slot></slot>
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

export default SgdsAlert;
