import "./sgds-web-component";
import { aTimeout, expect, fixture, elementUpdated } from "@open-wc/testing";
import { html } from "lit";
import { waitForEvent } from "../src/utils/event";
import type { SgdsToast } from "../src/components";
import type { SgdsToastContainer } from "../src/components/Toast/sgds-toast-container";
import { toast } from "../src/components/Toast";
import sinon from "sinon";

describe("SgdsToast component", () => {
  it("should render the close button when dismissible is true", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show dismissible></sgds-toast>`);
    el.dismissible = true;
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.exist;
  });
  it("should not render the close button when dismissible is false", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.not.exist;
  });

  it("toast is hidden by default", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("div.toast.d-none")).to.exist;
  });
  it("when show is true, toast is not hidden", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    expect(el.shadowRoot?.querySelector("div.toast.d-none")).to.not.exist;
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

    expect(el.shadowRoot?.querySelector("div.toast.d-none")).to.not.exist;
    await aTimeout(1000);
    expect(el.shadowRoot?.querySelector("div.toast.d-none")).to.exist;
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
  it("class .d-none absent the action slot when action slot is present is true", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show><span slot="action">Action</span></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast-action.d-none")).not.to.exist;
  });

  it("class .d-none present when the action slot when there is no action slot", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast-action.d-none")).to.exist;
  });
});

describe("SgdsToastContainer.toast() method", () => {
  it("creates a toast element and appends it to the container", async () => {
    const container = await fixture<SgdsToastContainer>(
      html`<sgds-toast-container position="bottom-end"></sgds-toast-container>`
    );
    const toastEl = container.toast({ title: "Test" });
    expect(toastEl).to.exist;
    expect(toastEl.title).to.equal("Test");
    expect(toastEl.parentElement).to.equal(container);
  });

  it("applies default options", async () => {
    const container = await fixture<SgdsToastContainer>(
      html`<sgds-toast-container position="bottom-end"></sgds-toast-container>`
    );
    const toastEl = container.toast({ title: "Defaults" });
    expect(toastEl.autohide).to.be.true;
    expect(toastEl.delay).to.equal(5000);
    expect(toastEl.dismissible).to.be.true;
  });

  it("applies custom options", async () => {
    const container = await fixture<SgdsToastContainer>(
      html`<sgds-toast-container position="bottom-end"></sgds-toast-container>`
    );
    const toastEl = container.toast({
      title: "Custom",
      message: "Hello",
      variant: "danger",
      autohide: false,
      delay: 3000,
      dismissible: false
    });
    expect(toastEl.variant).to.equal("danger");
    expect(toastEl.autohide).to.be.false;
    expect(toastEl.delay).to.equal(3000);
    expect(toastEl.dismissible).to.be.false;
    expect(toastEl.textContent).to.equal("Hello");
  });

  it("auto-removes toast from DOM after hiding", async () => {
    const container = await fixture<SgdsToastContainer>(
      html`<sgds-toast-container position="bottom-end"></sgds-toast-container>`
    );
    const toastEl = container.toast({ title: "AutoRemove" });
    await aTimeout(100);
    await toastEl.hideToast();
    await aTimeout(100);
    expect(toastEl.parentElement).to.be.null;
  }).timeout(6000);
});

describe("toast() utility function", () => {
  afterEach(() => {
    document.querySelectorAll("sgds-toast-container").forEach(el => el.remove());
  });

  it("creates a container and toast when called", async () => {
    const toastEl = toast({ title: "Utility", position: "bottom-end" });
    await elementUpdated(toastEl);
    expect(toastEl).to.exist;
    expect(toastEl.title).to.equal("Utility");
    const container = toastEl.parentElement as SgdsToastContainer;
    expect(container).to.exist;
    expect(container.position).to.equal("bottom-end");
  });

  it("reuses the same container for the same position", async () => {
    const t1 = toast({ title: "First", position: "top-center" });
    const t2 = toast({ title: "Second", position: "top-center" });
    expect(t1.parentElement).to.equal(t2.parentElement);
  });

  it("creates separate containers for different positions", async () => {
    const t1 = toast({ title: "Bottom", position: "bottom-end" });
    const t2 = toast({ title: "Top", position: "top-center" });
    expect(t1.parentElement).to.not.equal(t2.parentElement);
  });

  it("defaults to bottom-end position", async () => {
    const toastEl = toast({ title: "Default position" });
    await elementUpdated(toastEl);
    const container = toastEl.parentElement as SgdsToastContainer;
    expect(container.position).to.equal("bottom-end");
  });
});
