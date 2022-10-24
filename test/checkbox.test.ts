import {
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
  assert,
  waitUntil,
  elementUpdated,
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

  it("should be able to pass in checkboxId to attributes(id/for pair)", async () => {
    const el = await fixture(
      html`<sgds-checkbox checkboxId="checkbox-123"></sgds-checkbox>`
    );
    const input = el.shadowRoot?.querySelector("input");
    expect(input).to.have.attribute("id", "checkbox-123");
    const label = el.shadowRoot?.querySelector("label");
    expect(label).to.have.attribute("for", "checkbox-123");
  });

  it("should be able to pass in aria-label attribute", async () => {
    const el = await fixture(
      html`<sgds-checkbox ariaLabel="label"></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot?.querySelector("label");
    expect(checkbox).to.have.attribute("aria-label", "label");
  });

  it("should have class .is-invalid with invalid and required attribute", async () => {
    const el = await fixture(
      html`<sgds-checkbox invalid required></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.classList.value).to.contain("is-invalid");
  });

  it("should render aria-invalid to true with invalid and required attribute", async () => {
    const el = await fixture(
      html`<sgds-checkbox invalid required></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox).to.have.attribute("aria-invalid", "true");
  });

  it("if class input is .is-invalid, feedback div should contain .invalid-feedback", async () => {
    const el = await fixture(
      html`<sgds-checkbox invalid required
        ><div slot="feedback">Hello world</div></sgds-checkbox
      >`
    );
    const checkbox = el.shadowRoot?.querySelector("slot[name='feedback']");
    expect(checkbox?.classList.value).to.contain("invalid-feedback");
  });

  it("if class input is not .is-invalid, feedback el should be undefined", async () => {
    const el = await fixture(
      html`<sgds-checkbox
        ><div slot="feedback">Hello world</div></sgds-checkbox
      >`
    );
    const checkbox = el.shadowRoot?.querySelector("slot[name='feedback']");
    expect(checkbox).to.not.exist;
  });

  it("should emit sgds-change event when input is clicked", async () => {
    const el = await fixture(html`<sgds-checkbox></sgds-checkbox>`);
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-change", toggleHandler);
    el.shadowRoot?.querySelector("input")?.click();
    expect(toggleHandler).to.have.been.calledOnce;
  });

  it("should emit sgds-change event when label is clicked", async () => {
    const el = await fixture(html`<sgds-checkbox></sgds-checkbox>`);
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-change", toggleHandler);
    el.shadowRoot?.querySelector("label")?.click();
    expect(toggleHandler).to.have.been.calledOnce;
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
});

it("should be invalid when the input is empty and form.reportValidity() is called", async () => {
  const form = await fixture<HTMLFormElement>(html`
    <form>
      <sgds-checkbox required value=""></sgds-checkbox>
    </form>
  `);

  expect(form.reportValidity()).to.be.false;
});

it("should be valid when the input is not checked, reportValidity() is called, and the form has novalidate", async () => {
  const form = await fixture<HTMLFormElement>(html`
    <form novalidate>
      <sgds-checkbox required value="hello"></sgds-checkbox>
    </form>
  `);

  expect(form.reportValidity()).to.be.true;
});

it("should be valid by default", async () => {
  const el = await fixture<SgdsCheckbox>(
    html` <sgds-checkbox></sgds-checkbox> `
  );
  expect(el.invalid).to.be.false;
});

it("should be invalid when required and empty", async () => {
  const el = await fixture<SgdsCheckbox>(
    html` <sgds-checkbox required></sgds-checkbox> `
  );
  expect(el.reportValidity()).to.be.false;
  expect(el.invalid).to.be.true;
});

it("should be invalid when required and disabled is removed", async () => {
  const el = await fixture<SgdsCheckbox>(
    html` <sgds-checkbox disabled required></sgds-checkbox> `
  );
  el.disabled = false;
  await el.updateComplete;
  expect(el.invalid).to.be.true;
});
