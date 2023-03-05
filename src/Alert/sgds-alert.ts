import { customElement, property, state, query } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-alert.scss";
import { styleMap } from "lit-html/directives/style-map.js";
import { watch } from "../utils/watch";
import { repeat } from "lit/directives/repeat.js";

// const toastStack = Object.assign(document.createElement('div'), { className: 'sl-toast-stack' });

/**
 * @summary Alerts are used to display important messages inline or as toast notifications.
 * @documentation https://shoelace.style/components/alert
 * @status stable
 * @since 2.0
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

export type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light";

@customElement("sgds-alert")
export class SgdsAlert extends SgdsElement {
  static styles = styles;

  // @query('[part~="base"]') base: HTMLElement;

  @property({ type: Boolean, reflect: true }) show = true;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) dismissible? = false;

  /** The alert's theme variant. */
  @property({ reflect: true }) variant: AlertVariant = "primary";

  @property({ type: String }) closeLabel?: string;

  @property({ reflect: true }) alertClasses?: string;

  toggleShow() {
    if (!this.show) {
      this.show = true;
      this.emit("sgds-open");
    }
  }

  handleCloseClick(event: string) {
    this.show = false;
    this.emit("sgds-close");
  }

  render() {
    return html`
      ${this.show
        ? html`
            <div
              part="base"
              class="sgds alert fade show ${classMap({
                [`alert-${this.variant}`]: this.variant,
                [`alert-dismissible`]: this.dismissible,
                [`${this.alertClasses}`]: this.alertClasses,
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
          `
        : null}
    `;
  }
}

export default SgdsAlert;
