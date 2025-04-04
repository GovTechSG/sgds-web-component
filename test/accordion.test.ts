import "./sgds-web-component";
import { SgdsAccordionItem, SgdsAccordion } from "../src/components";
import { fixture, expect, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";

// customElements.define("sgds-accordion", SgdsAccordion);
// customElements.define("sgds-accordion-item", SgdsAccordionItem);

describe("<sgds-accordion>", () => {
  it("accordion items should contain the attribute [first,nth,last]-of-type if items is more than 2", async () => {
    const el = await fixture<SgdsAccordion>(html`
      <sgds-accordion>
        <sgds-accordion-item> Lorem ipsum </sgds-accordion-item>
        <sgds-accordion-item> Lorem ipsum </sgds-accordion-item>
        <sgds-accordion-item> Lorem ipsum </sgds-accordion-item>
        <sgds-accordion-item> Lorem ipsum </sgds-accordion-item>
      </sgds-accordion>
    `);

    const first = el.shadowRoot?.querySelector("slot")?.assignedNodes()[1];
    expect(first).to.have.attribute("first-of-type");
    const second = el.shadowRoot?.querySelector("slot")?.assignedNodes()[3];
    const third = el.shadowRoot?.querySelector("slot")?.assignedNodes()[5];
    expect(second).to.have.attribute("nth-of-type");
    expect(third).to.have.attribute("nth-of-type");

    const last = el.shadowRoot?.querySelector("slot")?.assignedNodes()[7];
    expect(last).to.have.attribute("last-of-type");
  });
});

describe("<sgds-accordion-item>", () => {
  it("should be visible with the open attribute", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const body = el.shadowRoot?.querySelector<HTMLElement>(".accordion-body");

    expect(body?.hidden).to.be.false;
  });

  it("should not be visible without the open attribute", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const body = el.shadowRoot?.querySelector<HTMLElement>(".accordion-body");

    expect(body?.classList.contains("hidden")).to.be.true;
  });

  it("should emit sgds-show and sgds-after-show when calling show()", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const body = el.shadowRoot?.querySelector<HTMLElement>(".accordion-body");
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", afterShowHandler);
    el.show();

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(body?.hidden).to.be.false;
  });

  it("should emit sgds-hide and sgds-after-hide when calling hide()", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const body = el.shadowRoot?.querySelector<HTMLElement>(".accordion-body");
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", afterHideHandler);
    el.hide();

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(body?.classList.contains("hidden")).to.be.true;
  });

  it("should emit sgds-show and sgds-after-show when setting open = true", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const body = el.shadowRoot?.querySelector<HTMLElement>(".accordion-body");
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(body?.hidden).to.be.false;
  });

  it("should emit sgds-hide and sgds-after-hide when setting open = false", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const body = el.shadowRoot?.querySelector<HTMLElement>(".accordion-body");
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(body?.classList.contains("hidden")).to.be.true;
  });

  it("should not open when preventing sgds-show", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const showHandler = sinon.spy((event: Event) => event.preventDefault());

    el.addEventListener("sgds-show", showHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(el.open).to.be.false;
  });

  it("should not close when preventing sgds-hide", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const hideHandler = sinon.spy((event: Event) => event.preventDefault());

    el.addEventListener("sgds-hide", hideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(el.open).to.be.true;
  });

  it("variant prop is forwarded to variant prop of sgds-accordion-item element", async () => {
    const el = await fixture<SgdsAccordion>(html`<sgds-accordion variant="border">
      <sgds-accordion-item>
        <div slot="header">Accordion 1</div>
        <span slot="content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
          Eum.</span
        >
      </sgds-accordion-item>
    </sgds-accordion>`);
    expect(el.querySelectorAll("sgds-accordion-item")[0]).to.have.attribute("variant", "border");
  });

  it("density prop is forwarded to density prop of sgds-accordion-item element", async () => {
    const el = await fixture<SgdsAccordion>(html`<sgds-accordion density="compact">
      <sgds-accordion-item>
        <div slot="header">Accordion 1</div>
        <span slot="content"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio?
          Eum.</span
        >
      </sgds-accordion-item>
    </sgds-accordion>`);
    expect(el.querySelectorAll("sgds-accordion-item")[0]).to.have.attribute("density", "compact");
  });

  it("should be disabled when disabled = true", async () => {
    const el = await fixture<SgdsAccordionItem>(html`
      <sgds-accordion-item disabled>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </sgds-accordion-item>
    `);
    const button = el.shadowRoot?.querySelector(".accordion-btn") as HTMLButtonElement;

    expect(button?.classList.contains("disabled")).to.be.true;

    button.click();
    await el.updateComplete;

    const accordionBody = el.shadowRoot?.querySelector(".accordion-body") as HTMLButtonElement;
    expect(accordionBody?.classList.contains("hidden")).to.be.true;
  });
});
