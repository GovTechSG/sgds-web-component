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
      `<button class="btn btn-primary" type="button" aria-disabled="false" tabindex="0">
        <span part="label">
          <slot name="label"></slot>
        </span>
      </button>
    `
    );
  })
  // TODO test styling?
  // if href is defined, button tag should convert to anchor tag
  // if download prop is defined, button tag should convert to anchor tag
  //
  it('if href is defined, button tag should convert to anchor tag', async () => {
    const el = await fixture(html`<button-element href="#"></button-element>`);
    expect(el.shadowRoot?.querySelector("a[href='#']")).to.exist;
    expect(el.shadowRoot?.querySelector("a[role='button']")).to.exist;
    expect(el.shadowRoot?.querySelector("a[type='button']")).not.to.exist;
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('if download and href attributes are defined, button tag should convert to anchor tag', async () => {
    const el = await fixture(html`<button-element download="logo.svg" href="folder/subfolder/logo.svg"></button-element>`);
    expect(el.shadowRoot?.querySelector("a[download]")).to.exist;
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('if href and target="_blank" attributes are defined, anchor tag should contain rel="noreferrer noopener" attribute', async () => {
    const el = await fixture(html`<button-element href="#" target="_blank"></button-element>`);
    expect(el.shadowRoot?.querySelector("a[rel='noreferrer noopener']")).to.exist;
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

});