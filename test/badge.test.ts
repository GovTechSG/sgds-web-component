import { SgdsBadge } from '../src/Badge';
import '../src/Badge/sgds-badge';
import { fixture, assert, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';

describe('sgds-badge', () => {
  it('is defined', () => {
    const el = document.createElement('sgds-badge');
    assert.instanceOf(el, SgdsBadge);
  });
});
describe('attributes added to badge', () => {
  it('should add rounded-pill class if roundedPill attribute is defined', async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge></sgds-badge>`);
    el.setAttribute('roundedPill', '');
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('span.badge')).to.have.class('rounded-pill');
  });

  it('should add badge-light class if isLight attribute is defined', async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge></sgds-badge>`);
    el.setAttribute('isLight', '');
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector('span.badge')).to.have.class('badge-light');
  });
});
