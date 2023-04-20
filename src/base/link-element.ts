import { html } from 'lit';
import SgdsElement from './sgds-element';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export default class LinkElement extends SgdsElement {
  @property({ type: Boolean })
  active = false;

  @property({ type: String })
  href = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`
      <li>
        <a
          href="${this.href}"
          class="nav-link ${classMap({
            disabled: this.disabled,
            active: this.active
          })} "
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          ><slot></slot
        ></a>
      </li>
    `;
  }
}
