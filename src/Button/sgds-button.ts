import { LitElement} from "lit";
import { customElement, property } from "lit/decorators.js";
import { html, literal } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {classMap} from 'lit/directives/class-map.js';
import styles from "./sgds-button.scss";

export type ButtonVariant = 
"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" |
"outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-warning" | "outline-info" | "outline-light" | "outline-dark"

@customElement("sgds-button")
export class SgdsButton extends LitElement {
  static styles = styles;

  /** The button's variant. */
  @property({ reflect: true }) variant: ButtonVariant = "primary";
  
  @property({ reflect: true }) buttonclasses? : string;

  /** Button sizes */
  @property({ reflect: true }) size : 'sm' | 'lg' ;

  /** Button active state */
  @property({ type: Boolean, reflect: true }) active = false ;

  /** Button disabled state */
  @property({ type: Boolean, reflect: true }) disabled = false ;

  @property() type: 'button' | 'submit' | 'reset' = 'button' ;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href?: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target?: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property({ reflect: true }) download?: string;

  render() {
    const isLink = this.href;
    const tag = isLink ? literal`a` : literal`button`;
    return html`
      <${tag}
        class="sgds btn ${classMap(
          {
            'disabled': isLink && this.disabled,
            'active': this.active, 
            [`btn-${this.variant}`]: this.variant,
            [`btn-${this.size}`]: this.size,
            [`${this.buttonclasses}`]: this.buttonclasses
          }
        )}"
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${ifDefined(isLink ? undefined : this.type)}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.target === "_blank" ? 'noreferrer noopener' : undefined)}
        role=${ifDefined(isLink ? 'button': undefined )}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <slot></slot>
      </${tag}>
    `;
  }
}

export default SgdsButton;
