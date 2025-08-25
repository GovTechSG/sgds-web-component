import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { watch } from "../../utils/watch";
import badgeStyle from "./badge.css";

import SgdsElement from "../../base/sgds-element";
import SgdsTooltip from "../Tooltip/sgds-tooltip";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";

import { getTextContent } from "../../utils/slot";

export type BadgeVariant = "info" | "success" | "danger" | "warning" | "neutral";

/**
 * @summary Badges can be used to highlight important bits of information such as labels, notifications & status.
 * When the text exceeds the width, it will be truncated with a tooltip that will be displayed on hover.
 *
 * @slot default - slot for badge
 * @slot icon - The slot for icon to the left of the badge text
 *
 * @event sgds-show - Emitted when the badge appears.
 * @event sgds-hide - Emitted when the badge is starting to close but has not closed.
 * @event sgds-after-show - Emitted after the badge has appeared
 * @event sgds-after-hide - Emitted after the badge has closed
 */
export class SgdsBadge extends SgdsElement {
  static styles = [...SgdsElement.styles, badgeStyle];

  /**@internal */
  static dependencies = {
    "sgds-close-button": SgdsCloseButton,
    "sgds-tooltip": SgdsTooltip
  };

  /** Controls the appearance of the dismissible badge. This prop only applies when dismissible is true  */
  @property({ type: Boolean, reflect: true }) show = false;

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `info`, `success`, `danger`, `warning`, 'neutral' */
  @property({ reflect: true }) variant: BadgeVariant = "info";

  /** Manually set the outlined state to false */
  @property({ type: Boolean, reflect: true }) outlined = false;

  /** Manually set the dismissible state of the button to `false` */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  @state() private truncated = false;
  @state() private text = "";

  /** Closes the badge  */
  public close() {
    this.show = false;
  }

  /**@internal */
  @watch("show")
  _handleShowChange() {
    if (this.show) {
      const sgdsShow = this.emit("sgds-show", { cancelable: true });
      if (sgdsShow.defaultPrevented) {
        this.show = false;
        return;
      }
      // animations if any go here

      this.emit("sgds-after-show");
    } else {
      const sgdsHide = this.emit("sgds-hide", { cancelable: true });
      if (sgdsHide.defaultPrevented) {
        this.show = true;
        return;
      }
      // animations if any go here

      this.emit("sgds-after-hide");
    }
  }

  /**@internal */
  @watch("text")
  _handleTruncation() {
    // checking of text height if its exceeding parent, it needs to be truncated
    const badge = this.shadowRoot.querySelector(".badge");
    const badgeLabel = this.shadowRoot.querySelector(".badge-label");

    if (badge && badgeLabel) {
      const labelHeight = badgeLabel.getBoundingClientRect().height;
      const badgeHeight = badge.getBoundingClientRect().height;

      this.truncated = labelHeight > badgeHeight;
    }
  }

  _handleLabelSlotChange(e: Event) {
    this.text = getTextContent(e.target as HTMLSlotElement);
    return;
  }

  _renderContent() {
    return html`<div
      class="  
          ${classMap({
        [`badge-dismissible`]: this.dismissible,
        badge: true,
        outlined: this.outlined,
        truncated: this.truncated
      })}"
      aria-hidden=${this.show ? "false" : "true"}
    >
      ${!this.dismissible ? html`<slot name="icon"></slot>` : nothing}

      <span class="badge-label">
        <slot @slotchange=${this._handleLabelSlotChange}></slot>
      </span>

      ${this.dismissible
        ? html`<sgds-close-button
            size="sm"
            aria-label="close the badge"
            @click=${this.close}
            variant=${this.outlined ? "dark" : "light"}
          ></sgds-close-button>`
        : nothing}
    </div>`;
  }

  render() {
    return (this.dismissible && this.show) || !this.dismissible
      ? this.truncated
        ? html`<sgds-tooltip content=${this.text}>${this._renderContent()}</sgds-tooltip>`
        : this._renderContent()
      : nothing;
  }
}

export default SgdsBadge;
