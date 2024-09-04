import "./sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsSpinner } from "../src/components";

describe("<sgds-spinner>", () => {
  it("should have default class of 'spinner-border' if no 'type' attribute define", async () => {
    const el = await fixture<SgdsSpinner>(html`<sgds-spinner></sgds-spinner>`);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[role="status"]');
    expect(base).to.have.class("spinner-border");
  });

  it("should have class of 'spinner-border' if type='border'", async () => {
    const el = await fixture(html`<sgds-spinner type="border"></sgds-spinner>`);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[role="status"]');
    expect(base).to.have.class("spinner-border");
  });

  it("should have class of 'spinner-grow' if type='grow'", async () => {
    const el = await fixture(html`<sgds-spinner type="grow"></sgds-spinner>`);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[role="status"]');
    expect(base).to.have.class("spinner-grow");
  });
});
