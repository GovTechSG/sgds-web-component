import {
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
  assert,
  waitUntil,
} from "@open-wc/testing";
import sinon from "sinon";
import "../src/Checkbox";
import { SgdsCheckbox } from "../src/Checkbox";

describe("<sgds-checkbox>", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-checkbox");
    assert.instanceOf(el, SgdsCheckbox);
  });

  it("should be disabled with the disabled attribute & aria-disabled to be true", async () => {
    const el = await fixture(html`<sgds-checkbox disabled></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.disabled).to.be.true;
    expect(checkbox).to.have.attribute("aria-disabled", "true");
  });

  it("should be able to pass in value to attributes(id/for pair)", async () => {
    const el = await fixture(
      html`<sgds-checkbox id="checkbox-123"></sgds-checkbox>`
    );
    const input = el.shadowRoot?.querySelector("input");
    expect(input).to.have.attribute("id", "checkbox-123");
    const label = el.shadowRoot?.querySelector("label");
    expect(label).to.have.attribute("for", "checkbox-123");
  });

  it("should render id to attributes(id/for pair) by default", async () => {
    const el = await fixture(html`<sgds-checkbox></sgds-checkbox>`);
    const input = el.shadowRoot?.querySelector("input");
    expect(input).to.have.attribute("id");
    const label = el.shadowRoot?.querySelector("label");
    expect(label).to.have.attribute("for");
  });

  it("should render aria-label attribute by default", async () => {
    const el = await fixture(
      html`<sgds-checkbox ariaLabel="label"></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot?.querySelector("label");
    expect(checkbox).to.have.attribute("aria-label");
  });

  it("should be able to pass in value to aria-label attribute", async () => {
    const el = await fixture(
      html`<sgds-checkbox ariaLabel="label"></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot?.querySelector("label");
    expect(checkbox).to.have.attribute("aria-label", "label");
  });

  it("should have class .is-invalid with isInvalid prop", async () => {
    const el = await fixture(html`<sgds-checkbox isInvalid></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.classList.value).to.contain("is-invalid");
  });

  it("should have class .is-valid with isValid prop", async () => {
    const el = await fixture(html`<sgds-checkbox isValid></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.classList.value).to.contain("is-valid");
  });

  it("if prop showFeedback is false, feedback element should not be defined", async () => {
    const el = await fixture(
      html`<sgds-checkbox isValid
        ><div slot="feedback">Hello world</div></sgds-checkbox
      >`
    );
    const checkbox = el.shadowRoot?.querySelector("div > slot");
    expect(checkbox).to.be.null;
  });

  it("if class input is .is-valid, feedback div should contain .valid-feedback", async () => {
    const el = await fixture(
      html`<sgds-checkbox isValid showFeedback
        ><div slot="feedback">Hello world</div></sgds-checkbox
      >`
    );
    const checkbox = el.shadowRoot?.querySelector("div > slot");
    expect(checkbox?.classList.value).to.contain("valid-feedback");
  });

  it("if class input is .is-invalid, feedback div should contain .invalid-feedback", async () => {
    const el = await fixture(
      html`<sgds-checkbox isInvalid showFeedback
        ><div slot="feedback">Hello world</div></sgds-checkbox
      >`
    );
    const checkbox = el.shadowRoot?.querySelector("slot[name='feedback']");
    expect(checkbox?.classList.value).to.contain("invalid-feedback");
  });

  it("should click the inner input", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot!.querySelector("input")!;
    const clickSpy = sinon.spy();

    checkbox.addEventListener("click", clickSpy, { once: true });

    el.click();
    await el.updateComplete;

    expect(clickSpy.called).to.equal(true);
    expect(el.checked).to.equal(true);
  });

  it("should have input aria-checked false by default", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot!.querySelector("input");

    expect(checkbox!).to.have.attribute("aria-checked", "false");
  });

  it("should show aria-checked to be true when checked is true", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot!.querySelector("input")!;
    const clickSpy = sinon.spy();

    checkbox.addEventListener("click", clickSpy, { once: true });

    el.click();
    await el.updateComplete;

    expect(clickSpy.called).to.equal(true);
    expect(el.checked).to.equal(true);
    expect(checkbox).to.have.attribute("aria-checked", "true");
  });

  //   it("should focus the inner input", async () => {
  //     const el = await fixture<SgdsCheckbox>(html`<sl-checkbox></sl-checkbox>`);
  //     const checkbox = el.shadowRoot!.querySelector("input")!;
  //     const focusSpy = sinon.spy();

  //     checkbox.addEventListener("focus", focusSpy, { once: true });

  //     el.focus();
  //     await el.updateComplete;

  //     expect(focusSpy.called).to.equal(true);
  //     expect(el.shadowRoot!.activeElement).to.equal(checkbox);
  //   });
});
