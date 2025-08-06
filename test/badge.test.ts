import { elementUpdated, expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import Sinon from "sinon";
import type { SgdsBadge } from "../src/components";
import SgdsCloseButton from "../src/internals/CloseButton/sgds-close-button";
import "./sgds-web-component";

describe("SgdsBadge component", () => {
  it("should render when show is true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".badge")).to.exist;
  });
  it("should render a close button when dismissible is true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.exist;
  });
  it("should render the icon slot", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture<SgdsBadge>(
      html`<sgds-badge show>
        <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
        Badge
      </sgds-badge>`
    );
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("slot[name='icon']")).to.exist;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("should not render a close button when dismissible is false", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.not.exist;
  });
  it("should render with the 'outlined' class when outlined is true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show outlined></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".badge")).to.have.class("outlined");
  });
  it("should not render with the 'outlined' class when outlined is false", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".badge")).to.not.have.class("outlined");
  });
  it("close public method invoke, removes badge from the document", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    el.close();
    await waitUntil(() => !el.show);
    expect(el.shadowRoot?.querySelector("div.badge")).not.to.exist;
  });
  it("default prevented in sgds-hide will prevent dismissible badge from closing", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    el.addEventListener("sgds-hide", e => e.preventDefault());
    el.close();
    expect(el.shadowRoot?.querySelector("div.badge")).to.exist;
  });
  it("mouse click badge close button emits sgds-hide and removes shadowDom contents of badge", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    const spyHide = Sinon.spy();
    el.addEventListener("sgds-hide", spyHide);
    const closeBtn = el.shadowRoot?.querySelector<SgdsCloseButton>("sgds-close-button");
    closeBtn?.click();

    expect(spyHide).to.be.calledOnce;
    await waitUntil(() => !el.show);
    expect(el.shadowRoot?.querySelector("div.badge")).not.to.exist;
  });
  it("when show is true, emits sgds-show event", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge dismissible></sgds-badge>`);
    const spyShow = Sinon.spy();
    el.addEventListener("sgds-show", spyShow);
    el.show = true;
    await el.updateComplete;
    expect(spyShow).to.be.calledOnce;
    expect(el.shadowRoot?.querySelector("div.badge")).to.exist;
  });
  // it("sgds-after- events are called when show is set to true/false")
  it("when default prevented for sgds-show, sgds-after-show is emitted and show cannot be set to true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge dismissible></sgds-badge>`);
    const afterShowSpy = Sinon.spy();
    el.addEventListener("sgds-show", e => e.preventDefault());
    el.addEventListener("sgds-after-show", afterShowSpy);
    el.show = true;
    await el.updateComplete;
    expect(afterShowSpy).not.to.be.called;
    expect(el.show).to.be.false;
  });
  it("when default prevented, sgds-after-hide toggling and show cannot be set to false ", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    const afterHideSpy = Sinon.spy();

    el.addEventListener("sgds-hide", e => e.preventDefault());
    el.addEventListener("sgds-after-hide", afterHideSpy);

    el.show = false;
    await el.updateComplete;
    expect(afterHideSpy).not.to.be.called;
    expect(el.show).to.be.true;
  });
});
