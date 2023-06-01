import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-badge.scss";

export type BadgeVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

@customElement("sgds-badge")
export class SgdsBadge extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  @property({ reflect: true }) variant: BadgeVariant = "primary";
  @property({ type: Boolean, reflect: true }) isLight;
  @property({ type: Boolean, reflect: true }) roundedPill;
  render() {
    return html`
      <span
        class="  
                ${classMap({
          "sgds badge": true,
          [`bg-${this.variant}`]: this.variant,
          "badge-light": this.isLight,
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
