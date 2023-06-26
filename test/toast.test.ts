import { aTimeout, assert, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import "../src/components/Alert/sgds-alert";
import { SgdsToast, SgdsToastContainer } from "../src/components/Toast";
describe("<sgds-toast>", () => {
  it("it is defined", () => {
    const el = document.createElement("sgds-toast");
    assert.instanceOf(el, SgdsToast);
  });
  it("semantically matches the DOM", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    assert.shadowDom.equal(
      el,
      `
        <div
        class="toast sgds show"
        hidden=""
        role="alert"
        aria-hidden="true"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <slot name="icon"></slot>
          <strong class="me-auto">Title</strong>
          <small class="text-muted me-2"><slot name="duration"></slot></small>
          <sgds-closebutton
            closeLabel="Close the Toast"
            data-dismiss="toast"
          ></sgds-closebutton>
        </div>
        <div class="toast-body"><slot></slot></div>
      </div>
        `
    );
  });
  it("toast is hidden by default", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("div.toast")).to.have.attribute("hidden");
  });
  it("when show is true, toast is not hidden", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("div.toast")).not.to.have.attribute("hidden");
  });
  it("when show set is true, sgds-show and sgds-after-show events are emitted", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    const showHandler = sinon.spy();
    const shownHandler = sinon.spy();
    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", shownHandler);
    expect(showHandler).not.to.be.called;
    expect(shownHandler).not.to.be.called;

    el.show = true;
    await el.updateComplete;

    expect(showHandler).to.be.calledOnce;
    // wait for animation to be completely done
    await aTimeout(500);
    expect(shownHandler).to.be.calledOnce;
    expect(shownHandler).to.be.calledAfter(showHandler);
  });
  it("when show set is false, sgds-hide and sgds-after-hide events are emitted", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    const hideHandler = sinon.spy();
    const hiddenHandler = sinon.spy();
    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", hiddenHandler);
    expect(hideHandler).not.to.be.called;
    expect(hiddenHandler).not.to.be.called;

    el.show = false;
    await el.updateComplete;

    expect(hideHandler).to.be.calledOnce;
    // wait for animation to be completely done
    await aTimeout(500);
    expect(hiddenHandler).to.be.calledOnce;
    expect(hiddenHandler).to.be.calledAfter(hideHandler);
  });
  it("when autohide is true, toast disappears after the specified delay of 100ms", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show autohide delay="100"></sgds-toast>`);

    expect(el.shadowRoot?.querySelector("div.toast")).not.to.have.attribute("hidden");
    await aTimeout(1000);
    expect(el.shadowRoot?.querySelector("div.toast")).to.have.attribute("hidden");
  }).timeout(6000);

  it("showToast method, shows the toast and returns after all show events are called", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    const showHandler = sinon.spy();
    const shownHandler = sinon.spy();
    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", shownHandler);

    expect(el.shadowRoot?.querySelector("div.toast[hidden='']")).to.exist;
    await el.showToast();
    expect(showHandler).to.be.called;
    expect(el.shadowRoot?.querySelector("div.toast[hidden='']")).not.to.exist;
    expect(shownHandler).to.be.called;
  });
  it("hideToast method, hides the toast and returns after all hide events are called", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    const hideHandler = sinon.spy();
    const hiddenHandler = sinon.spy();
    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", hiddenHandler);

    expect(el.shadowRoot?.querySelector("div.toast[hidden='']")).not.to.exist;
    await el.hideToast();
    expect(hideHandler).to.be.called;
    expect(el.shadowRoot?.querySelector("div.toast[hidden='']")).to.exist;
    expect(hiddenHandler).to.be.called;
  });
});
describe("<sgds-toast-container>", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-toast-container");
    assert.instanceOf(el, SgdsToastContainer);
  });
  it("semantically matches the DOM", async () => {
    const el = await fixture<SgdsToastContainer>(html`<sgds-toast-container></sgds-toast-container>`);
    assert.shadowDom.equal(
      el,
      `
            <div
            class="sgds toast-container"
          >
            <slot></slot>
          </div>
            `
    );
  });
  it("when position prop is defined, it adds class position-absolute to the div.toast-container", async () => {
    const el = await fixture<SgdsToastContainer>(
      html`<sgds-toast-container position="top-start"></sgds-toast-container>`
    );
    expect(el.shadowRoot?.querySelector("div.toast-container")).to.have.class("position-absolute");
  });
  it("when position prop is defined, it adds class position-absolute to the div.toast-container", async () => {
    const el = await fixture<SgdsToastContainer>(
      html`<sgds-toast-container position="top-start"></sgds-toast-container>`
    );
    expect(el.shadowRoot?.querySelector("div.toast-container")).to.have.class("position-absolute");
    expect(el.shadowRoot?.querySelector("div.toast-container")).to.have.class("top-0");
    expect(el.shadowRoot?.querySelector("div.toast-container")).to.have.class("start-50");
    expect(el.shadowRoot?.querySelector("div.toast-container")).to.have.class("translate-middle-x");
  });
  it("when position prop is top-end, it adds the right classes", async () => {
    const el = await fixture<SgdsToastContainer>(
      html`<sgds-toast-container position="top-end"></sgds-toast-container>`
    );
    expect(el.shadowRoot?.querySelector("div.toast-container")?.classList.value.trim()).to.equal(
      "sgds toast-container position-absolute top-0 end-0"
    );
  });
});
