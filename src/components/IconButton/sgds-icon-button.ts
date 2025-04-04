import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, literal } from "lit/static-html.js";
import ButtonElement from "../../base/button-element";
import SgdsIcon from "../Icon/sgds-icon";
import iconButtonStyles from "./icon-button.css";

/**
 * @summary An icon button is a user interface element that combines an icon and a button, serving as a clickable or tabbable component.
 *
 * @event sgds-blur - Emitted when the button is blurred.
 * @event sgds-focus - Emitted when the button is focused.
 */
export class SgdsIconButton extends ButtonElement {
  static styles = [...ButtonElement.styles, iconButtonStyles];
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  /** The name of the icon from sgds icon library */
  @property({ type: String, reflect: true }) name: string;

  private _assignIconSize(buttonSize: "sm" | "md" | "lg") {
    if (buttonSize === "sm") return "md";
    if (buttonSize === "md") return "lg";
    if (buttonSize === "lg") return "xl";
  }

  render() {
    const isLink = this.href;
    const tag = isLink ? literal`a` : literal`button`;
    return html`
          <${tag}
            class="btn btn-icon${classMap({
              disabled: this.disabled,
              active: this.active,
              [`btn-${this.variant}`]: this.variant,
              [`btn-${this.size}`]: this.size
            })}"
            ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
            type=${ifDefined(isLink ? undefined : "button")}
            href=${ifDefined(isLink ? this.href : undefined)}
            target=${ifDefined(isLink ? this.target : undefined)}
            download=${ifDefined(isLink ? this.download : undefined)}
            rel=${ifDefined(isLink && this.target === "_blank" ? "noreferrer noopener" : undefined)}
            role=${ifDefined(isLink ? "button" : undefined)}
            aria-disabled=${this.disabled ? "true" : "false"}
            tabindex=${this.disabled ? "-1" : "0"}
            @click=${this._handleClick}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            aria-label=${ifDefined(this.ariaLabel)}
          >
            <sgds-icon name=${ifDefined(this.name)} size=${ifDefined(this._assignIconSize(this.size))}></sgds-icon>
          </${tag}>
        `;
  }
}

export default SgdsIconButton;
