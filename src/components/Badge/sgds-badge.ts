import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import badgeStyle from "./badge.css";
export type BadgeStatus =  "success" | "danger" | "warning" | "info" | "neutral";
export type BadgeVariant =  "filled" | "outlined" ;

/**
 * @summary Badges can be used to highlight important bits of information such as labels, notifications & status.
 * 
 * @slot default - slot for badge
 * @slot icon - The slot for icon to the left of the badge text
 * 
 * @cssprop --sgds-badge-color - The text color of badge, only if the 'variant' prop is set to 'filled' and the background color is yellow.
 * @cssprop --sgds-badge-border-radius - The border radius of badge
 * @cssprop --sgds-badge-bg - The background color of the badge. Changing 'status' prop updates this css property
 * @cssprop --sgds-badge-border-color - The border color of the badge. Changing `variant` prop to 'outline' updates this css property
 *
 */
export class SgdsBadge extends SgdsElement {
  static styles = [...SgdsElement.styles, badgeStyle];

  /** One or more button variant combinations buttons may be one of a variety of visual variants such as: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`, `link` */
  @property({ reflect: true }) variant: BadgeVariant = "filled";
  /** Visually changes the color of the badge */
  @property({ reflect: true }) status: BadgeStatus = "info";
  
  /** Manually set the dismissable state of the button to `false` */
  @property({ type: Boolean, reflect: true }) dismissable = false;

  /** Manually set the sm state (whether or not the badge is sm) to false */
   @property({ type: Boolean, reflect: true }) warningSm = false;




  render() {
    return html`
      <span
        class="  
          ${classMap({
          dismissable: this.dismissable,
          badge: true,
          warningSm: this.warningSm
        })}
            "
      >
        <slot name="icon"></slot>
        <span class="badge-label">
        <slot></slot>
        </span>
        <slot>
        ${this.dismissable ? html`<sgds-close-button></sgds-close-button>` : ''}
        </slot>
      </span>
    `;
  }
}

export default SgdsBadge;
