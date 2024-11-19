import "./sgds-web-component";
import type { SgdsBadge } from "../src/components";
import { fixture, expect, elementUpdated } from "@open-wc/testing";
import { html } from "lit";

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
  it("should render the leadingIcon slot", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show><span slot="leadingIcon">Icon</span></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("slot[name='leadingIcon']")).to.exist;
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
