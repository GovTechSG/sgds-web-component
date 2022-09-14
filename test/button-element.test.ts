import { ButtonElement } from '../src/Button/button-element'
import '../src/Button/button-element';
import {fixture, assert, expect} from '@open-wc/testing';
import {html} from 'lit';

describe('button-element', () => {
    it('is defined', () => {
        const el = document.createElement('button-element');
        assert.instanceOf(el, ButtonElement)
    })
    it('renders with default values', async () => {
        const el = await fixture(html`<button-element></button-element>`);
        assert.shadowDom.equal(
          el,
          `<button class="btn btn-primary"><slot></slot></button>`
        );
      });
})