import "./sgds-web-component";
import type { SgdsBadge } from "../src/components";
import { fixture, expect, elementUpdated } from "@open-wc/testing";
import { html } from "lit";

describe("attributes added to badge", () => {
  it("should add rounded-pill class if roundedPill attribute is defined", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge></sgds-badge>`);
    el.setAttribute("roundedPill", "");
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("span.badge")).to.have.class("rounded-pill");
  });
});
