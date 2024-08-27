import "./sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsSpinner } from "../src/components";

describe("<sgds-spinner>", () => {
  it("should have default class of 'spinner-md' if no size attribute define", async () => {
    const el = await fixture<SgdsSpinner>(html`<sgds-spinner></sgds-spinner>`);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[role="status"]');
    expect(base).to.have.class("spinner-md");
  });

  it("should have class of 'spinner-sm' if size='sm'", async () => {
    const el = await fixture(html`<sgds-spinner size="sm"></sgds-spinner>`);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[role="status"]');
    expect(base).to.have.class("spinner-sm");
  });

  it("should have class of 'spinner-lg' if size='lg'", async () => {
    const el = await fixture(html`<sgds-spinner size="lg"></sgds-spinner>`);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[role="status"]');
    expect(base).to.have.class("spinner-lg");
  });
});
