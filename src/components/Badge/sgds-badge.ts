import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import badgeStyle from "./badge.css";
export type BadgeVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

/**
 * @summary Badges can be used to highlight important bits of information such as labels, notifications & status.
 * @slot default - slot for badge
 *
 */
export class SgdsBadge extends SgdsElement {
  static styles = [...SgdsElement.styles, badgeStyle];

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`, `link` */
  @property({ reflect: true }) variant: BadgeVariant = "primary";
  /**  Visually set badge for lesser color emphasis. Renamed from previous `isLight` prop */
  @property({ type: Boolean, reflect: true }) outlined = false;
  /** Visually set badge with rounded corners. */
  @property({ type: Boolean, reflect: true }) roundedPill = false;

  render() {
    return html`
      <span
        class="  
          ${classMap({
          badge: true,
          "rounded-pill": this.roundedPill
        })}
            "
      >
        <slot name="leftIcon"></slot>
        <slot></slot>
        <slot name="rightIcon"></slot>
      </span>
    `;
  }
}

export default SgdsBadge;
