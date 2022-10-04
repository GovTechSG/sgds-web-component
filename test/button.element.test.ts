import { ButtonElement } from '../src/Button/sgds-button'
import '../src/Button/sgds-button';
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
      `<button class="btn btn-primary sgds" type="button" aria-disabled="false" tabindex="0">
        <span part="label">
          <slot name="label"></slot>
        </span>
      </button>
    `
    );
  })

  it('should convert from button tag to anchor tag if href is defined', async () => {
    const el = await fixture(html`<button-element href="#"></button-element>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute('href','#');
    expect(anchorTag).to.have.attribute('role','button');
    expect(anchorTag).not.to.have.attribute('type','button');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('should convert to anchor tag if download and href attributes are defined, button tag', async () => {
    const el = await fixture(html`<button-element download="logo.svg" href="folder/subfolder/logo.svg"></button-element>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute('download','logo.svg');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('anchor tag should contain rel="noreferrer noopener" attribute if href and target="_blank" attributes are defined', async () => {
    const el = await fixture(html`<button-element href="#" target="_blank"></button-element>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute('rel','noreferrer noopener');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('should contain disabled if is an anchor tag and disabled attributes are defined', async () => {
    const el = await fixture(html`<button-element href="#" disabled></button-element>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.class("disabled");
    expect(anchorTag).to.have.attribute('aria-disabled','true');
    expect(anchorTag).to.have.attribute('tabindex','-1');
    expect(anchorTag).not.to.have.attribute('disabled','');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

});