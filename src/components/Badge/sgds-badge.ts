import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import badgeStyle from "./badge.css";
import { watch } from "../../utils/watch";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";
export type BadgeVariant = "info" | "success" | "danger" | "warning" | "neutral";

/**
 * @summary Badges can be used to highlight important bits of information such as labels, notifications & status.
 *
 * @slot default - slot for badge
 * @slot leftIcon - The slot for icon to the left of the badge text
 * @slot rightIcon - The slot for icon to the right of the badge text
 *
 * @event sgds-show - Emitted when the badge appears.
 * @event sgds-hide - Emitted after the badge closes.
 *
 * @cssprop --sgds-badge-bg - The background color of the badge
 * @cssprop --sgds-badge-color - The text color of badge
 * @cssprop --sgds-badge-border-radius - The border radius of badge
 * @cssprop --sgds-badge-border-color - The border color of the badge, only applicable when outlined prop is true
 *
 */
export class SgdsBadge extends SgdsElement {
  static styles = [...SgdsElement.styles, badgeStyle];

  /**@internal */
  static get scopedElements() {
    return {
      "sgds-close-button": SgdsCloseButton
    };
  }

  /** Controls the appearance of the alert  */
  @property({ type: Boolean, reflect: true }) show = false;

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `info`, `success`, `danger`, `warning`, 'neutral' */
  @property({ reflect: true }) variant: BadgeVariant = "info";

  /** Manually set the outlined state to false */
  @property({ type: Boolean, reflect: true }) outlined = false;

  /** Manually set the dismissable state of the button to `false` */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** Closes the badge  */
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
            class="  
          ${classMap({
              [`badge-dismissible`]: this.dismissible,
              badge: true,
              outlined: this.outlined
            })}
            "
            aria-hidden=${this.show ? "false" : "true"}
          >
            ${!this.dismissible ? html`<slot name="leftIcon"></slot>` : nothing}
            <span class="badge-label">
              <slot></slot>
            </span>

            ${this.dismissible
              ? html`<sgds-close-button
                  size="sm"
                  aria-label="close the badge"
                  @click=${this.close}
                  variant=${this.outlined ? "dark" : "light"}
                ></sgds-close-button>`
              : nothing}
          </div>
        `
      : nothing;
  }
}

export default SgdsBadge;
