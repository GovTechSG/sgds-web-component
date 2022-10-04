import { SgdsButton } from '../src/Button/sgds-button'
import '../src/Button/sgds-button';
import {fixture, assert, expect} from '@open-wc/testing';
import {html} from 'lit';

describe('sgds-button', () => {
  it('is defined', () => {
      const el = document.createElement('sgds-button');
      assert.instanceOf(el, SgdsButton)
  })
  it('renders with default values', async () => {
    const el = await fixture(html`<sgds-button></sgds-button>`);
    assert.shadowDom.equal(
      el,
      `<button class="btn btn-primary sgds" type="button" aria-disabled="false" tabindex="0">
        <span slot="label"></span>
      </button>
    `
    );
  })

  it('should convert from button tag to anchor tag if href is defined', async () => {
    const el = await fixture(html`<sgds-button href="#"></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute('href','#');
    expect(anchorTag).to.have.attribute('role','button');
    expect(anchorTag).not.to.have.attribute('type','button');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('should convert to anchor tag if download and href attributes are defined, button tag', async () => {
    const el = await fixture(html`<sgds-button download="logo.svg" href="folder/subfolder/logo.svg"></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute('download','logo.svg');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('anchor tag should contain rel="noreferrer noopener" attribute if href and target="_blank" attributes are defined', async () => {
    const el = await fixture(html`<sgds-button href="#" target="_blank"></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute('rel','noreferrer noopener');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

  it('should contain disabled if is an anchor tag and disabled attributes are defined', async () => {
    const el = await fixture(html`<sgds-button href="#" disabled></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.class("disabled");
    expect(anchorTag).to.have.attribute('aria-disabled','true');
    expect(anchorTag).to.have.attribute('tabindex','-1');
    expect(anchorTag).not.to.have.attribute('disabled','');
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  })

});