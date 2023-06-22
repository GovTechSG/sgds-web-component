import { customElement, property, queryAsync } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import styles from "./sgds-alert.scss";

//TODO: Alert Link
/**
 *
 * @dependency sl-icon-button
 *
 * @slot - The alert's main content.
 * @slot icon - An icon to show in the alert. Works best with `<sl-icon>`.
 *
 * @event sl-show - Emitted when the alert opens.
 * @event sl-after-show - Emitted after the alert opens and all animations are complete.
 * @event sl-hide - Emitted when the alert closes.
 * @event sl-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the alert's main content.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */

export type AlertVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light";

@customElement("sgds-alert")
export class SgdsAlert extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  @property({ type: Boolean, reflect: true }) show = false;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) dismissible? = false;

  /** The alert's theme variant. */
  @property({ reflect: true }) variant: AlertVariant = "primary";

  @property({ reflect: true }) alertClasses?: string;

  @queryAsync("slot")
  defaultSlot: HTMLElement;

  public showAlert() {
    this.show = true;
  }
  public hideAlert() {
    this.show = false;
  }
  private handleCloseClick() {
    this.show = false;
  }

  @watch("show")
  handleShowChange() {
    this.show ? this.emit("sgds-show") : this.emit("sgds-hide");
  }
  render() {
    return html`
      <div
        part="base"
        class="${classMap({
          sgds: true,
          alert: true,
          fade: true,
          show: this.show,
          [`alert-${this.variant}`]: this.variant,
          [`alert-dismissible`]: this.dismissible,
          [`${this.alertClasses}`]: this.alertClasses,
          "d-flex": true,
          "align-items-center": true
        })}"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
      >
        <i><slot name="icon"></slot></i>
        <slot></slot>
        ${this.dismissible
          ? html`<button
              class="btn-close btn-sm"
              aria-label="close the alert"
              @click=${this.handleCloseClick}
            ></button>`
          : null}
      </div>
    `;
  }
}

export default SgdsAlert;
