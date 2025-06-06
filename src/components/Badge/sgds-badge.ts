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
 * @slot icon - The slot for icon to the left of the badge text
 *
 * @event sgds-show - Emitted when the badge appears.
 * @event sgds-hide - Emitted after the badge closes.
 */
export class SgdsBadge extends SgdsElement {
  static styles = [...SgdsElement.styles, badgeStyle];

  /**@internal */
  static dependencies = {
    "sgds-close-button": SgdsCloseButton
  };

  /** Controls the appearance of the dismissible badge. This prop only applies when dismissible is true  */
  @property({ type: Boolean, reflect: true }) show = false;

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `info`, `success`, `danger`, `warning`, 'neutral' */
  @property({ reflect: true }) variant: BadgeVariant = "info";

  /** Manually set the outlined state to false */
  @property({ type: Boolean, reflect: true }) outlined = false;

  /** Manually set the dismissible state of the button to `false` */
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
    return (this.dismissible && this.show) || !this.dismissible
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
            ${!this.dismissible ? html`<slot name="icon"></slot>` : nothing}
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
