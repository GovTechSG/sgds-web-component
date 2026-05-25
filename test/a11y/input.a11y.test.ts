import "../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("Input a11y", () => {
  it("sgds-input should be accessible", async () => {
    const el = await fixture(html` <sgds-input label="Full name" inputId="name-input"></sgds-input> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-input with hint text should be accessible", async () => {
    const el = await fixture(html`
      <sgds-input label="Email" inputId="email-input" hintText="Enter your work email"></sgds-input>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-input disabled should be accessible", async () => {
    const el = await fixture(html`
      <sgds-input label="Disabled field" inputId="disabled-input" disabled></sgds-input>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-textarea should be accessible", async () => {
    const el = await fixture(html` <sgds-textarea label="Comments" textareaId="comments-textarea"></sgds-textarea> `);
    await expect(el).to.be.accessible();
  });
});
