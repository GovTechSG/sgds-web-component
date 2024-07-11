import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import alertStyle from "./alert.css";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import SgdsCloseButton from "../CloseButton/sgds-close-button";

export type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light";
/**
 * @summary Alerts provide short, timely, and relevant information for your users. It can be a simple text message or customised HTML content with paragraphs, headings and links.
 *
 * @slot default - The alert's main content.
 * @slot icon - An icon to show in the alert. Pass in SVG elements.
 *
 * @event sgds-show - Emitted when the alert appears.
 * @event sgds-hide - Emitted after the alert closes.
 *
 * @cssproperty --sgds-alert-bg - The background color of alert
 * @cssproperty --sgds-alert-padding-x - The x-axis padding of alert
 * @cssproperty --sgds-alert-padding-y - The y-axis padding of alert
 * @cssproperty --sgds-alert-margin-bottom - The bottom margin of alert
 * @cssproperty --sgds-alert-color - The text color of alert
 * @cssproperty --sgds-alert-border-color - The color of the border of alert
 * @cssproperty --sgds-alert-border-width - The width of the border of alert
 * @cssproperty --sgds-alert-border-radius - The border radius of alert
 * @cssproperty --sgds-alert-link-color - The link color of alert
 * @cssproperty --sgds-alert-icon-gap - The gap between the icon and alert text
 *
 */
export class SgdsAlert extends ScopedElementsMixin(SgdsElement) {
  static styles = [...SgdsElement.styles, alertStyle];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-close-button": SgdsCloseButton
    };
  }
  /** Controls the appearance of the alert  */
  @property({ type: Boolean, reflect: true }) show = false;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** The alert's theme variant. */
  @property({ type: String, reflect: true }) variant: AlertVariant = "primary";

  /** Controls the alert visual between a lighter outline and a solid darker variant. */
  @property({ type: Boolean, reflect: true }) outlined = false;

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
    return this.show
      ? html`
          <div
            class="${classMap({
              sgds: true,
              alert: true,
              fade: true,
              show: this.show,
              [`alert-dismissible`]: this.dismissible
            })}"
            role="alert"
            aria-hidden=${this.show ? "false" : "true"}
          >
            <i><slot name="icon"></slot></i>
            <slot></slot>
            ${this.dismissible
              ? html`<sgds-close-button aria-label="close the alert" @click=${this.close}></sgds-close-button>`
              : nothing}
          </div>
        `
      : nothing;
  }
}

export default SgdsAlert;
