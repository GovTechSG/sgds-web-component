import "../../sgds-web-component";
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

  it("sgds-input required should be accessible", async () => {
    const el = await fixture(html` <sgds-input label="Full name" inputId="required-input" required></sgds-input> `);
    await expect(el).to.be.accessible();
  });

  it("sgds-input readonly should be accessible", async () => {
    const el = await fixture(html`
      <sgds-input label="Reference ID" inputId="readonly-input" readonly value="REF-12345"></sgds-input>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-input invalid with feedback should be accessible", async () => {
    const el = await fixture(html`
      <sgds-input
        label="Email"
        inputId="invalid-input"
        invalid
        hasFeedback="both"
        invalidFeedback="Please enter a valid email"
      ></sgds-input>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-input type number should be accessible", async () => {
    const el = await fixture(html`
      <sgds-input label="Age" inputId="number-input" type="number" min="0" max="120"></sgds-input>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-input with prefix and suffix should be accessible", async () => {
    const el = await fixture(html`
      <sgds-input label="Amount" inputId="prefix-input" prefix="$" suffix=".00"></sgds-input>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-textarea should be accessible", async () => {
    const el = await fixture(html` <sgds-textarea label="Comments" textareaId="comments-textarea"></sgds-textarea> `);
    await expect(el).to.be.accessible();
  });
});
