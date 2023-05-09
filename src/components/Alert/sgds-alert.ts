import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit/static-html.js";
import SgdsElement from "../../base/sgds-element";
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

  // @query('[part~="base"]') base: HTMLElement;

  @property({ type: Boolean, reflect: true }) show = false;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) dismissible? = false;

  /** The alert's theme variant. */
  @property({ reflect: true }) variant: AlertVariant = "primary";

  @property({ type: String }) closeLabel?: string;

  @property({ reflect: true }) alertClasses?: string;

  toggleShow() {
    if (!this.show) {
      this.show = true;
      this.emit("sgds-show");
    }
  }

  handleCloseClick() {
    this.show = false;
    this.emit("sgds-hide");
  }

  render() {
    return html`
            <div
              part="base"
              class="${classMap({
                "sgds": true,
                "alert": true,
                "fade": true,
                "show": this.show,
                [`alert-${this.variant}`]: this.variant,
                [`alert-dismissible`]: this.dismissible,
                [`${this.alertClasses}`]: this.alertClasses
              })}"
              role="alert"
              aria-hidden=${this.show ? "false" : "true"}
            >
              <slot></slot>
              ${this.dismissible
                ? html`<sgds-closebutton
                    class="btn-close btn-sm"
                    closeLabel=${ifDefined(this.closeLabel)}
                    @click=${this.handleCloseClick}
                  ></sgds-closebutton>`
                : null}
            </div>
    `;
  }
}

export default SgdsAlert;
