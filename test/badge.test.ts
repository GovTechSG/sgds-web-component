import "./sgds-web-component";
import type { SgdsBadge } from "../src/components";
import { fixture, expect, elementUpdated } from "@open-wc/testing";
import { html } from "lit";
import Sinon from "sinon";

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
});
