import { SgdsBadge } from "../src/components/Badge";
import { fixture, expect, elementUpdated } from "@open-wc/testing";
import { html } from "lit";
customElements.define("sgds-badge", SgdsBadge)

describe("attributes added to badge", () => {
  it("should add rounded-pill class if roundedPill attribute is defined", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge></sgds-badge>`);
    el.setAttribute("roundedPill", "");
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("span.badge")).to.have.class("rounded-pill");
  });

  it("should add badge-light class if isLight attribute is defined", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge></sgds-badge>`);
    el.setAttribute("isLight", "");
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("span.badge")).to.have.class("badge-light");
  });
});
