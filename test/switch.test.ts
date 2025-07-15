import { expect, assert, fixture, html, oneEvent } from "@open-wc/testing";
import { SgdsSwitch } from "../src/components/Switch/sgds-switch";
import "../src/components/Switch";

describe("<sgds-switch>", () => {
  it("semantically matches the shadowDOM", async () => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch></sgds-switch>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="form-check">
          <label class="form-check-label left-label d-none">
            <slot name="leftLabel"></slot>
          </label>
          <input
            class="form-check-input"
            type="checkbox"
            aria-disabled="false"
            aria-checked="false"
          />
          <label class="form-check-label d-none">
            <slot></slot>
          </label>
        </div>
      `,
      { ignoreAttributes: ["id", "for"] }
    );
  });

  it("toggles checked state on click", async () => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch></sgds-switch>`);
    const input = el.shadowRoot?.querySelector("input");

    input?.click();
    expect(el.checked).to.be.true;

    input?.click();
    expect(el.checked).to.be.false;
  });

  it("emits sgds-change event on toggle", async () => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch></sgds-switch>`);
    const input = el.shadowRoot?.querySelector("input");
    const listener = oneEvent(el, "sgds-change");

    input?.click();

    const event = await listener;
    expect(event).to.exist;
    expect(event.detail.checked).to.equal(true);
  });

  it("applies disabled state correctly", async () => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch disabled></sgds-switch>`);
    const input = el.shadowRoot?.querySelector("input");

    expect(input?.disabled).to.be.true;

    input?.click();
    expect(el.checked).to.be.false;
  });

  it("renders with leftLabel slot", async () => {
    const el = await fixture<SgdsSwitch>(html`
      <sgds-switch>
        <span slot="leftLabel">Left Label</span>
      </sgds-switch>
    `);

    const leftLabelSlot = el.shadowRoot?.querySelector("slot[name='leftLabel']");
    expect(leftLabelSlot).to.exist;

    const leftLabel = el.querySelector('[slot="leftLabel"]');
    expect(leftLabel).to.have.trimmed.text("Left Label");
  });

  it("renders with default (rightLabel) slot", async () => {
    const el = await fixture<SgdsSwitch>(html`
      <sgds-switch>
        <span>Right Label</span>
      </sgds-switch>
    `);

    const defaultSlot = el.shadowRoot?.querySelector("slot:not([name])");
    expect(defaultSlot).to.exist;

    const content = el.querySelector("span");
    expect(content).to.have.trimmed.text("Right Label");
  });

  it("hides left label when default slot is filled", async () => {
    const el = await fixture<SgdsSwitch>(html`
      <sgds-switch>
        <span>Right Label</span>
      </sgds-switch>
    `);

    const leftLabel = el.shadowRoot?.querySelector(".left-label");
    expect(leftLabel?.classList.contains("d-none")).to.be.true;
  });

  it("hides right label when leftLabel slot is filled", async () => {
    const el = await fixture<SgdsSwitch>(html`
      <sgds-switch>
        <span slot="leftLabel">Left Label</span>
      </sgds-switch>
    `);

    const rightLabel = el.shadowRoot?.querySelectorAll(".form-check-label")[1];
    expect(rightLabel?.classList.contains("d-none")).to.be.true;
  });

  it("toggles with Enter key", async () => {
    const el = await fixture<SgdsSwitch>(html`<sgds-switch></sgds-switch>`);
    const input = el.shadowRoot?.querySelector("input");
    const event = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });

    input?.dispatchEvent(event);
    expect(el.checked).to.be.true;
  });
});
