import "../../sgds-web-component";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";

describe("ComboBox a11y", () => {
  it("sgds-combo-box with slot children should be accessible", async () => {
    const el = await fixture(html`
      <sgds-combo-box label="Select a fruit">
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="cherry">Cherry</sgds-combo-box-option>
      </sgds-combo-box>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-combo-box required should be accessible", async () => {
    const el = await fixture(html`
      <sgds-combo-box label="Select a fruit" required>
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="cherry">Cherry</sgds-combo-box-option>
      </sgds-combo-box>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-combo-box readonly should be accessible", async () => {
    const el = await fixture(html`
      <sgds-combo-box label="Select a fruit" readonly value="apple">
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="cherry">Cherry</sgds-combo-box-option>
      </sgds-combo-box>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-combo-box with hintText should be accessible", async () => {
    const el = await fixture(html`
      <sgds-combo-box label="Select a fruit" hintText="Start typing to filter options">
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="cherry">Cherry</sgds-combo-box-option>
      </sgds-combo-box>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-combo-box invalid with feedback should be accessible", async () => {
    const el = await fixture(html`
      <sgds-combo-box label="Select a fruit" invalid hasFeedback invalidFeedback="Please select a fruit">
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="cherry">Cherry</sgds-combo-box-option>
      </sgds-combo-box>
    `);
    await expect(el).to.be.accessible();
  });

  it("sgds-combo-box multiSelect should be accessible", async () => {
    const el = await fixture(html`
      <sgds-combo-box label="Select fruits" multiSelect>
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="cherry">Cherry</sgds-combo-box-option>
      </sgds-combo-box>
    `);
    await expect(el).to.be.accessible();
  });
});
