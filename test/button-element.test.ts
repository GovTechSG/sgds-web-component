import { ButtonElement } from '../src/Button/button-element'
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

describe('button-element', () => {
    it('is defined', () => {
        const el = document.createElement('button-element');
        assert.instanceOf(el, ButtonElement)
    })
    it('renders with default values', async () => {
        const el = await fixture(html`<button-element></button-element>`);
        assert.shadowDom.equal(
          el,
          `<button class="btn btn-primary">Hello World</button>`
        );
      });
})