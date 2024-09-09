import "./sgds-web-component";
import { aTimeout, expect, fixture, elementUpdated } from "@open-wc/testing";
import { html } from "lit";
import { waitForEvent } from "../src/utils/event";
import type { SgdsToast } from "../src/components";
import sinon from "sinon";

describe("SgdsToast component", () => {
  it("should render the close button when dismissable is true", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show dismissable></sgds-toast>`);
    el.dismissable = true;
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.exist;
  });
  it("should not render the close button when dismissable is false", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.not.exist;
  });

  it("toast is hidden by default", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("div.toast")).to.not.exist;
  });
  it("when show is true, toast is not hidden", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("div.toast")).to.exist;
  });
  it("when show set is true, sgds-show and sgds-after-show events are emitted", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    const showHandler = sinon.spy();
    const shownHandler = sinon.spy();
    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", shownHandler);
    await el.updateComplete;

    el.show = true;
    await el.updateComplete;

    await waitForEvent(el, "sgds-after-show");

    expect(showHandler).to.be.calledOnce;
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
    await aTimeout(500);
    expect(hiddenHandler).to.be.calledOnce;
    expect(hiddenHandler).to.be.calledAfter(hideHandler);
  });
  it("when autohide is true, toast disappears after the specified delay of 100ms", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show autohide delay="100"></sgds-toast>`);

    expect(el.shadowRoot?.querySelector("div.toast")).to.exist;
    await aTimeout(1000);
    expect(el.shadowRoot?.querySelector("div.toast")).not.to.exist;
  }).timeout(6000);

  it("showToast method, shows the toast and returns after all show events are called", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    const showHandler = sinon.spy();
    const shownHandler = sinon.spy();
    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", shownHandler);

    await el.showToast();
    expect(showHandler).to.be.called;
    expect(shownHandler).to.be.called;
  });

  it("hideToast method, hides the toast and returns after all hide events are called", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    const hideHandler = sinon.spy();
    const hiddenHandler = sinon.spy();
    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", hiddenHandler);

    await el.hideToast();
    expect(hideHandler).to.be.called;
    expect(hiddenHandler).to.be.called;
  });
});

describe("SgdsToast component", () => {
  it("should render the action slot when action is true", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show action><span slot="action">Action</span></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast-action")).to.exist;
  });

  it("should not render the action slot when action is false", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast-action")).to.not.exist;
  });
});
