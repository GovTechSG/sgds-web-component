import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import SgdsElement from '../base/sgds-element';
import { watch } from '../utils/watch';
import styles from './sgds-tab.scss';

let id = 0;

@customElement('sgds-tab')
export class SgdsTab extends SgdsElement {
  static styles = styles;
  @query('.tab') tab: HTMLElement;

  private readonly attrId = ++id;
  private readonly componentId = `sgds-tab-${this.attrId}`;

  @property({ reflect: true }) label = '';
  /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
  @property({ reflect: true }) panel = '';

  /** Draws the tab in an active state. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Makes the tab closable and shows a close button. */
  @property({ type: Boolean }) closable = false;

  /** Disables the tab and prevents selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true }) variant;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
  }

  /** Sets focus to the tab. */
  focus(options?: FocusOptions) {
    this.tab.focus(options);
  }

  /** Removes focus from the tab. */
  blur() {
    this.tab.blur();
  }

  handleCloseClick() {
    this.emit('sgds-close');
  }

  @watch('active')
  handleActiveChange() {
    this.setAttribute('aria-selected', this.active ? 'true' : 'false');
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.id = this.id.length > 0 ? this.id : this.componentId;

    const getAttr = this.closest('sgds-tab').getAttribute('variant');

    return html`
      <div
        part="base"
        class=${classMap({
          tab: true,
          'tab--active': this.active,
          'tab--closable': this.closable,
          'tab--disabled': this.disabled,
          [`tab--${getAttr}`]: getAttr
        })}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsTab;
