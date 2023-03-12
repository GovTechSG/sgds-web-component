
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from '../utils/animate';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { getAnimation, setDefaultAnimation } from '../utils/animation-registry';
import { html } from 'lit';
// import { LocalizeController } from '../../utilities/localize';
import { waitForEvent } from '../utils/event';
import { watch } from '../utils/watch';
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-accordion.scss";

@customElement('sgds-accordion')
export class SgdsAccordion extends SgdsElement {

    static styles = styles;
  @query('.accordion') accordion: HTMLElement;
  @query('.accordion-header') header: HTMLElement;
  @query('.accordion-body') body: HTMLElement;
  @query('.accordion__expand-icon-slot') expandIconSlot: HTMLSlotElement;

  @property({ type: Boolean, reflect: true }) open = false;

  /** The summary to show in the header. If you need to display HTML, use the `summary` slot instead. */
  @property() summary: string;

  /** Disables the accordion so it can't be toggled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  firstUpdated() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? 'auto' : '0';
  }

  private handleSummaryClick() {
    if (!this.disabled) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }

      this.header.focus();
    }
  }

  private handleSummaryKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hide();
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.show();
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      const sgdsShow = this.emit('sgds-show', { cancelable: true });
      if (sgdsShow.defaultPrevented) {
        this.open = false;
        return;
      }

      await stopAnimations(this.body);
      this.body.hidden = false;

      const { keyframes, options } = getAnimation(this, 'accordion.show');
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = 'auto';

      this.emit('sgds-after-show');
    } else {
      // Hide
      const slHide = this.emit('sgds-hide', { cancelable: true });
      if (slHide.defaultPrevented) {
        this.open = true;
        return;
      }

      await stopAnimations(this.body);

      const { keyframes, options } = getAnimation(this, 'accordion.hide');
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = 'auto';

      this.emit('sgds-after-hide');
    }
  }

  /** Shows the accordion. */
  async show() {
    if (this.open || this.disabled) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'sgds-after-show');
  }

  /** Hides the accordion */
  async hide() {
    if (!this.open || this.disabled) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'sgds-after-hide');
  }

  render() {
    

    return html`
      <div
        part="base"
        class=${classMap({
			sgds: true,
          	'accordion-item': true,
          	'accordion--open': this.open,
          	'accordion--disabled': this.disabled
        })}
      >
        <header
          part="header"
          id="header"
          class="accordion-button"
          role="button"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls="content"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="accordion__summary">${this.summary}</slot>
          <span part="summary-icon" class="accordion__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name='chevron-up'></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name='chevron-down'></sl-icon>
            </slot>
          </span>
        </header>
        <div class="accordion-body">
          <slot part="content" id="content" class="accordion-content" role="region" aria-labelledby="header"></slot>
        </div>
      </div>
    `;
  }
}

setDefaultAnimation('accordion.show', {
  keyframes: [
    { height: '0', opacity: '0' },
    { height: 'auto', opacity: '1' }
  ],
  options: { duration: 300, easing: 'linear' }
});

setDefaultAnimation('accordion.hide', {
  keyframes: [
    { height: 'auto', opacity: '1' },
    { height: '0', opacity: '0' }
  ],
  options: { duration: 300, easing: 'linear' }
});

export default SgdsAccordion;