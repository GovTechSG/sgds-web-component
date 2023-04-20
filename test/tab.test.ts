import { expect, fixture, html } from '@open-wc/testing';
import { SgdsTab } from '../src/Tab/sgds-tab';
import '../src/Tab';

describe('<sgds-tab>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture<SgdsTab>(html`
      <sgds-tab-group>
        <sgds-tab slot="nav">Test</sgds-tab>
      </sgds-tab-group>
    `);
    await expect(el).to.be.accessible();
  });

  it('should render default tab', async () => {
    const el = await fixture<SgdsTab>(html` <sgds-tab>Test</sgds-tab> `);

    const tab = el.shadowRoot?.querySelector<HTMLElement>('.tab');
    expect(el.getAttribute('role')).to.equal('tab');
    expect(el.getAttribute('aria-disabled')).to.equal('false');
    expect(el.getAttribute('aria-selected')).to.equal('false');
    expect(tab?.getAttribute('tabindex')).to.equal('0');
    expect(tab?.getAttribute('class')).to.equal(' tab ');
    expect(el.active).to.equal(false);
    expect(el.disabled).to.equal(false);
  });

  it('should disable tab by attribute', async () => {
    const el = await fixture<SgdsTab>(html` <sgds-tab disabled>Test</sgds-tab> `);

    const tab = el.shadowRoot?.querySelector<HTMLElement>('.tab');

    expect(el.disabled).to.equal(true);
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    expect(tab?.getAttribute('class')).to.equal(' tab tab--disabled ');
    expect(tab?.getAttribute('tabindex')).to.equal('-1');
  });

  it('should set active tab by attribute', async () => {
    const el = await fixture<SgdsTab>(html` <sgds-tab active>Test</sgds-tab> `);

    const tab = el.shadowRoot?.querySelector<HTMLElement>('.tab');

    expect(el.active).to.equal(true);
    expect(el.getAttribute('aria-selected')).to.equal('true');
    expect(tab?.getAttribute('class')).to.equal(' tab tab--active ');
    expect(tab?.getAttribute('tabindex')).to.equal('0');
  });

  describe('focus', () => {
    it('should focus inner div', async () => {
      const el = await fixture<SgdsTab>(html` <sgds-tab>Test</sgds-tab> `);

      const tab = el.shadowRoot?.querySelector<HTMLElement>('.tab');

      el.focus();
      await el.updateComplete;

      expect(el.shadowRoot?.activeElement).to.equal(tab);
    });
  });

  describe('blur', () => {
    it('should blur inner div', async () => {
      const el = await fixture<SgdsTab>(html` <sgds-tab>Test</sgds-tab> `);

      el.focus();
      await el.updateComplete;

      el.blur();
      await el.updateComplete;

      expect(el.shadowRoot?.activeElement).to.equal(null);
    });
  });
});
