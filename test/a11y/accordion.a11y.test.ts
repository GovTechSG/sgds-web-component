import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Accordion a11y", () => {
  it("sgds-accordion should be accessible", async () => {
    const el = await fixture(html`
      <sgds-accordion>
        <sgds-accordion-item>
          <div slot="header">Accordion title #1</div>
          <div slot="content">Content for item 1</div>
        </sgds-accordion-item>
        <sgds-accordion-item>
          <div slot="header">Accordion title #2</div>
          <div slot="content">Content for item 2</div>
        </sgds-accordion-item>
        <sgds-accordion-item>
          <div slot="header">Accordion title #3</div>
          <div slot="content">Content for item 3</div>
        </sgds-accordion-item>
      </sgds-accordion>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-accordion-item (open) should be accessible", async () => {
    const el = await fixture(html`
      <sgds-accordion-item open>
        <div slot="header">Accordion title</div>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-accordion-item (closed) should be accessible", async () => {
    const el = await fixture(html`
      <sgds-accordion-item>
        <div slot="header">Accordion title</div>
        <div slot="content">Accordion content</div>
      </sgds-accordion-item>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-accordion-item (disabled) should be accessible", async () => {
    const el = await fixture(html`
      <sgds-accordion-item disabled>
        <div slot="header">Disabled accordion</div>
        <div slot="content">This item is disabled</div>
      </sgds-accordion-item>
    `);
    await expect(el).to.be.accessible();
  });
});
