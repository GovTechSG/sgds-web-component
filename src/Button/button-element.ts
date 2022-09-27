import { LitElement} from "lit";
import { customElement, property } from "lit/decorators.js";
import { html, literal } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from "./button-element.scss";

@customElement("button-element")
export class ButtonElement extends LitElement {
  static styles = styles;

  /** The button's variant. */
  @property({ reflect: true }) 
  variant: 
  'default' | 
  'primary' | 
  'outline-primary' | 
  'secondary' | 
  'outline-secondary' | 
  'success' | 
  'outline-success' | 
  'warning' | 
  'outline-warning' | 
  'danger' | 
  'outline-danger' | 
  'info' | 
  'outline-info' | 
  'light' | 
  'outline-light' | 
  'dark' | 
  'outline-dark' | 
  'text' | 
  'link' ;


  /** Draws an outlined button. */
  @property({ reflect: true }) size :'default' | 'sm' | 'lg' ;

  /** Draws an outlined button. */
  @property({ type: Boolean, reflect: true }) block = false ;

  /** Draws an outlined button. */
  @property({ type: Boolean, reflect: true }) disabled = false ;

  /** Draws an outlined button. */
  @property({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button' ;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href?: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target?: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
  @property() download?: string;


  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? literal`a` : literal`button`;
    return html`
      <${tag}
        part="base"
        class="sgds btn${classMap({
          "btn-sm" : this.size === "sm",
          "btn-lg" : this.size === "lg",
          "btn-primary": this.variant === "primary",
          "btn-outline-primary": this.variant === "outline-primary",
          "btn-secondary": this.variant === "secondary",
          "btn-outline-secondary": this.variant === "outline-secondary",
          "btn-success": this.variant === "success",
          "btn-outline-success": this.variant === "outline-success",
          "btn-warning": this.variant === "warning",
          "btn-outline-warning": this.variant === "outline-warning",
          "btn-danger": this.variant === "danger",
          "btn-outline-danger": this.variant === "outline-danger",
          "btn-info": this.variant === "info",
          "btn-outline-info": this.variant === "outline-info",
          "btn-text": this.variant === "text",
          "btn-link": this.variant === "link",
        })}"
        ?disabled=${ifDefined(isLink ? undefined : this.disabled)}
        type=${ifDefined(isLink ? undefined : this.type)}
        href=${ifDefined(isLink ? this.href : undefined)}
        target=${ifDefined(isLink ? this.target : undefined)}
        download=${ifDefined(isLink ? this.download : undefined)}
        rel=${ifDefined(isLink && this.target ? 'noreferrer noopener' : undefined)}
        role=${ifDefined(isLink ? undefined : 'button')}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        <span part="label">
          <slot name="label"></slot>
        </span>
      </${tag}>
    `;
  }
}

export default ButtonElement;
