import { SgdsAccordionItem } from '../src/Accordion/sgds-accordion-item';
import '../src/Accordion/sgds-accordion-item';
import {fixture, assert, expect, aTimeout, waitUntil} from '@open-wc/testing';
import {html} from 'lit';
import sinon  from 'sinon';

describe('<sgds-accordion>', () => {
    it('should be visible with the open attribute', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion open>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const body = el.shadowRoot!.querySelector<HTMLElement>('.accordion-body')!;
  
      expect(body.hidden).to.be.false;
    });
  
    it('should not be visible without the open attribute', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const body = el.shadowRoot!.querySelector<HTMLElement>('.accordion-body')!;
  
      expect(body.hidden).to.be.true;
    });
  
    it('should emit sgds-show and sgds-after-show when calling show()', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const body = el.shadowRoot!.querySelector<HTMLElement>('.accordion-body')!;
      const showHandler = sinon.spy();
      const afterShowHandler = sinon.spy();
  
      el.addEventListener('sgds-show', showHandler);
      el.addEventListener('sgds-after-show', afterShowHandler);
      el.show();
  
      await waitUntil(() => showHandler.calledOnce);
      await waitUntil(() => afterShowHandler.calledOnce);
  
      expect(showHandler).to.have.been.calledOnce;
      expect(afterShowHandler).to.have.been.calledOnce;
      expect(body.hidden).to.be.false;
    });
  
    it('should emit sgds-hide and sgds-after-hide when calling hide()', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion open>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const body = el.shadowRoot!.querySelector<HTMLElement>('.accordion-body')!;
      const hideHandler = sinon.spy();
      const afterHideHandler = sinon.spy();
  
      el.addEventListener('sgds-hide', hideHandler);
      el.addEventListener('sgds-after-hide', afterHideHandler);
      el.hide();
  
      await waitUntil(() => hideHandler.calledOnce);
      await waitUntil(() => afterHideHandler.calledOnce);
  
      expect(hideHandler).to.have.been.calledOnce;
      expect(afterHideHandler).to.have.been.calledOnce;
      expect(body.hidden).to.be.true;
    });
  
    it('should emit sgds-show and sgds-after-show when setting open = true', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const body = el.shadowRoot!.querySelector<HTMLElement>('.accordion-body')!;
      const showHandler = sinon.spy();
      const afterShowHandler = sinon.spy();
  
      el.addEventListener('sgds-show', showHandler);
      el.addEventListener('sgds-after-show', afterShowHandler);
      el.open = true;
  
      await waitUntil(() => showHandler.calledOnce);
      await waitUntil(() => afterShowHandler.calledOnce);
  
      expect(showHandler).to.have.been.calledOnce;
      expect(afterShowHandler).to.have.been.calledOnce;
      expect(body.hidden).to.be.false;
    });
  
    it('should emit sgds-hide and sgds-after-hide when setting open = false', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion open>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const body = el.shadowRoot!.querySelector<HTMLElement>('.accordion-body')!;
      const hideHandler = sinon.spy();
      const afterHideHandler = sinon.spy();
  
      el.addEventListener('sgds-hide', hideHandler);
      el.addEventListener('sgds-after-hide', afterHideHandler);
      el.open = false;
  
      await waitUntil(() => hideHandler.calledOnce);
      await waitUntil(() => afterHideHandler.calledOnce);
  
      expect(hideHandler).to.have.been.calledOnce;
      expect(afterHideHandler).to.have.been.calledOnce;
      expect(body.hidden).to.be.true;
    });
  
    it('should not open when preventing sgds-show', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const showHandler = sinon.spy((event: Event) => event.preventDefault());
  
      el.addEventListener('sgds-show', showHandler);
      el.open = true;
  
      await waitUntil(() => showHandler.calledOnce);
  
      expect(showHandler).to.have.been.calledOnce;
      expect(el.open).to.be.false;
    });
  
    it('should not close when preventing sgds-hide', async () => {
      const el = await fixture<SgdsAccordionItem>(html`
        <sgds-accordion open>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </sgds-accordion>
      `);
      const hideHandler = sinon.spy((event: Event) => event.preventDefault());
  
      el.addEventListener('sgds-hide', hideHandler);
      el.open = false;
  
      await waitUntil(() => hideHandler.calledOnce);
  
      expect(hideHandler).to.have.been.calledOnce;
      expect(el.open).to.be.true;
    });
  });