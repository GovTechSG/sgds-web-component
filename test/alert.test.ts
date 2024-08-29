import "./sgds-web-component";
import { assert, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import type { SgdsAlert } from "../src/components";
import type { SgdsCloseButton } from "../src/internals/CloseButton/sgds-close-button";

describe("<sgds-alert-heading>", () => {
  it("the default tag is h4", async () => {
    const el = await fixture(html`<sgds-alert-heading></sgds-alert-heading>`);
    assert.shadowDom.equal(
      el,
      `<span
      class="h4"
      >
      <slot></slot>
      </span>
        `
    );
  });
  it("span class is defined by headerTag property", async () => {
    const el = await fixture(html`<sgds-alert-heading headerTag="h2"></sgds-alert-heading>`);
    assert.shadowDom.equal(
      el,
      `<span
      class="h2"
      >
      <slot></slot>
      </span>
        `
    );
  });
});

describe("<sgds-alert-link>", () => {
  it("semantically matches the DOM", async () => {
    const el = await fixture(html`<sgds-alert-link></sgds-alert-link>`);
    assert.shadowDom.equal(
      el,
      `<a class="alert-link" tabindex="0"><slot></slot> </a>
        `
    );
  });
  it("href attribute forwarded to a", async () => {
    const el = await fixture(html`<sgds-alert-link href="#"></sgds-alert-link>`);
    assert.shadowDom.equal(
      el,
      `<a class="alert-link" href="#" tabindex="0"><slot></slot> </a>
        `
    );
  });
  it("target attribute forwarded to a", async () => {
    const el = await fixture(html`<sgds-alert-link target="_blank"></sgds-alert-link>`);
    assert.shadowDom.equal(
      el,
      `<a class="alert-link" target="_blank" tabindex="0"><slot></slot> </a>
        `
    );
  });
});
describe("<Alert>", () => {
  it("semantically matches the dom", async () => {
    const el = await fixture(html`<sgds-alert show></sgds-alert>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="sgds alert fade show" role="alert" aria-hidden="false">
          <i><slot name="icon"></slot></i>
          <slot></slot>
        </div>
      `
    );
  });
  it("Should output a alert with message", async () => {
    const message = "This is a test alert";
    const el = await fixture<SgdsAlert>(html` <sgds-alert show>${message}</sgds-alert> `);

    const alert = el.shadowRoot?.querySelector(".alert");
    assert.exists(alert, "Alert element exists");

    const slot = el.shadowRoot?.querySelectorAll("slot");
    const slotContent = slot?.[1].assignedNodes()[0]?.textContent;
    expect(slotContent).to.equal(message);
  });

  it("Should have dismissible style", async () => {
    const el = await fixture<SgdsAlert>(html` <sgds-alert show dismissible></sgds-alert> `);

    const alert = el.shadowRoot?.querySelector(".sgds.alert");
    expect(alert?.classList.value).to.contain("alert-dismissible");
  });
  it('Should default to variant="primary"', async () => {
    const el = await fixture<SgdsAlert>(html` <sgds-alert></sgds-alert> `);

    expect(el.getAttribute("variant")).to.equal("primary");
  });

  it("Should emit the sgds-hide event on dismiss click of close button", async () => {
    const el = await fixture<SgdsAlert>(html`<sgds-alert show dismissible></sgds-alert>`);
    const onCloseSpy = sinon.spy();
    el.addEventListener("sgds-hide", onCloseSpy);

    const closeButton = el.shadowRoot?.querySelector("sgds-close-button") as SgdsCloseButton;
    closeButton?.click();
    await el.updateComplete;
    expect(el.show).to.be.false;
    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it("Should emit the sgds-show event when alert show state is true", async () => {
    const el = await fixture<SgdsAlert>(html`<sgds-alert></sgds-alert>`);
    const onShowSpy = sinon.spy();
    el.addEventListener("sgds-show", onShowSpy);

    el.show = true;
    await el.updateComplete;
    expect(el.show).to.be.true;
    expect(onShowSpy).to.have.been.calledOnce;
  });

  it("Should have the variant that is passed in", async () => {
    const el = await fixture<SgdsAlert>(html` <sgds-alert variant="warning"></sgds-alert> `);

    expect(el.getAttribute("variant")).to.equal("warning");
  });

  it("should have fade class when rendered", async () => {
    const el = await fixture(html`<sgds-alert show variant="primary">Test alert</sgds-alert>`);
    const base = el.shadowRoot?.querySelector(".sgds.alert");
    expect(base?.classList.contains("fade")).to.be.true;
  });

  it("when show is false, should remove from shadow DOM", async () => {
    const el = await fixture(html`<sgds-alert variant="primary">Test alert</sgds-alert>`);
    const base = el.shadowRoot?.querySelector(".sgds.alert");
    assert.notExists(base, "Alert element not exists");
  });

  it("when show is true, alert should have show class", async () => {
    const el = await fixture(html`<sgds-alert variant="primary" show>Test alert</sgds-alert>`);
    const base = el.shadowRoot?.querySelector(".sgds.alert");
    expect(base?.classList.contains("show")).to.be.true;
  });

  describe("Web Accessibility", () => {
    it("Should have alert role", async () => {
      const el = await fixture(html`<sgds-alert show></sgds-alert>`);
      const alertEl = el.shadowRoot?.querySelector("div.sgds.alert");
      assert.equal(alertEl?.getAttribute("role"), "alert");
    });
  });
});
