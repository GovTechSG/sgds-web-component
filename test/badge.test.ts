import "./sgds-web-component";
import type { SgdsBadge } from "../src/components";
import { fixture, expect, oneEvent, elementUpdated } from "@open-wc/testing";
import { html } from "lit";

describe("SgdsBadge component", () => {
  it("should render the leftIcon slot with the class 'left-icon'", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge><span slot="leftIcon">Icon</span></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("slot[name='leftIcon']")).to.have.class("left-icon");
  });

  it("should render the rightIcon slot with the class 'right-icon'", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge><span slot="rightIcon">Icon</span></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("slot[name='rightIcon']")).to.have.class("right-icon");
  });
});

describe("SgdsBadge component", () => {
  it("should render a close button when dismissible is true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge dismissible></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.exist;
  });

  it("should not render a close button when dismissible is false", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.not.exist;
  });
});
