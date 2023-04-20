import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit/static-html.js';
import SgdsElement from '../base/sgds-element';
import styles from './sgds-toast.scss';

export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';

@customElement('sgds-toast')
export class SgdsToast extends SgdsElement {
  static styles = styles;

  @query('[part~="base"]') base: HTMLElement;

  @property({ type: Boolean, reflect: true }) show = true;

  /**
   * Apply a CSS fade transition to the toast
   */
  @property({ type: Boolean, reflect: true }) animation?: boolean;

  @property({ type: Boolean, reflect: true }) autohide? = false;

  @property({ type: Number, reflect: true }) delay = Infinity;

  @property({ type: String, reflect: true }) variant;

  /** The toast variant. */
  @property({ type: String, reflect: true }) bg?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';

  @property({ type: String }) closeLabel?: string;

  /**Adds CSS styling to `<Toast />` based on the defined status */
  @property({ type: String, reflect: true }) status?: 'success' | 'warning' | 'danger';

  handleCloseClick() {
    this.show = false;
    this.emit('sgds-close');
  }

  render() {
    if (this.autohide && this.delay < Infinity) {
      setTimeout(() => {
        this.show = false;
      }, this.delay);
    }
    return html`
      ${this.show
        ? html`
            <div
              part="base"
              class="fade toast sgds show ${classMap({
                [`is-${this.variant}`]: this.variant,
                [`bg-${this.bg}`]: this.bg,
                [`is-${this.status}`]: this.status
              })}"
              role="alert"
              aria-hidden=${this.show ? 'false' : 'true'}
              aria-live="assertive"
              aria-atomic="true"
            >
              <div class="toast-header">
                <sl-icon name="check-circle" class="me-2"></sl-icon>
                <strong class="me-auto">Title</strong>
                <sgds-closebutton
                  closeLabel=${ifDefined(this.closeLabel)}
                  @click=${this.handleCloseClick}
                  data-dismiss="toast"
                ></sgds-closebutton>
              </div>
              <div class="toast-body">This is a toast message.</div>
            </div>
          `
        : null}
    `;
  }
}

export default SgdsToast;
