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
import { SgdsButton } from "../src/Button";
import { sendKeys } from "@web/test-runner-commands";

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

it("should be invalid when required prop is passed", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox required></sgds-checkbox>`
  );
  expect(el.invalid).to.be.true;
});

it("should be valid when required/clean prop is passed", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox clean required></sgds-checkbox>`
  );
  expect(el.invalid).to.be.false;
});

it("should be valid upon checked when only required prop is passed", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox required checked></sgds-checkbox>`
  );
  expect(el.invalid).to.be.false;
});

it("should be valid upon checked when required/clean prop is passed", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox clean required checked></sgds-checkbox>`
  );
  expect(el.invalid).to.be.false;
});

it("should not show checked by default", async () => {
  const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
  expect(el.checked).to.be.false;
});

it("should show checked to be true when click", async () => {
  const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
  const checkbox = el.shadowRoot!.querySelector("input")!;
  const clickSpy = sinon.spy();

  checkbox.addEventListener("click", clickSpy, { once: true });

  el.click();
  await el.updateComplete;

  expect(clickSpy.called).to.equal(true);
  expect(el.checked).to.equal(true);
});

//todo: for required prop, to show dirty state by default. upon uncheck(click)
it("for required prop, to show dirty state by default on first load and upon uncheck(click)", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox required></sgds-checkbox>`
  );

  const checkbox = el.shadowRoot!.querySelector("input")!;
  await elementUpdated(el);
  expect(el.invalid).to.be.true;
  const clickSpy = sinon.spy();

  // two clicks to uncheck
  checkbox.addEventListener("click", clickSpy, { once: true });
  checkbox.addEventListener("click", clickSpy, { once: true });

  await elementUpdated(el);

  expect(el.invalid).to.be.true;
});

//todo: for required prop, to show dirty state by default on first load and upon uncheck(enter key)

it("for required prop, to show dirty state by default on first load and upon uncheck(enter key)", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox required></sgds-checkbox>`
  );

  const cbInput = el.shadowRoot?.querySelector("input");
  expect(cbInput?.classList.value).to.contain("is-invalid");
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  await el.updateComplete;
  expect(cbInput?.classList.value).to.contain("is-invalid");
});

//todo: for required prop, to show clean state when passed in prop. upon uncheck(enter key)

it("for required prop, to show clean state on first load and upon uncheck(enter key)", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox clean required></sgds-checkbox>`
  );

  const cbInput = el.shadowRoot?.querySelector("input");
  expect(cbInput?.classList.value).to.not.contain("is-invalid");
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  await el.updateComplete;
  expect(cbInput?.classList.value).to.not.contain("is-invalid");
});

//todo: for required prop, to show clean state when passed in prop. upon uncheck(click)

it("for required prop, to show clean state on first load and upon uncheck(click)", async () => {
  const el = await fixture<SgdsCheckbox>(
    html`<sgds-checkbox clean required></sgds-checkbox>`
  );

  const checkbox = el.shadowRoot!.querySelector("input")!;
  await elementUpdated(el);
  expect(el.invalid).to.be.false;
  const clickSpy = sinon.spy();

  // two clicks to uncheck
  checkbox.addEventListener("click", clickSpy, { once: true });
  checkbox.addEventListener("click", clickSpy, { once: true });

  await elementUpdated(el);

  expect(el.invalid).to.be.false;
});

//todo: for form submission, to show invalid state when clean prop is passed (unchecked)
it("for form submission, to show invalid state when clean prop is passed (default unchecked) when submitted", async () => {
  const form = await fixture<HTMLFormElement>(
    html`
      <form>
        <sgds-checkbox clean required></sgds-checkbox
        ><sgds-button type="submit"></sgds-button>
      </form>
    `
  );
  const button = form.querySelector<SgdsButton>("sgds-button")!;
  const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox")!;

  const clickSpy = sinon.spy();

  button.addEventListener("click", clickSpy, { once: true });
  await elementUpdated(checkbox);
  expect(checkbox.invalid).to.exist
});

it("should be invalid when required and disabled is removed", async () => {
  const el = await fixture<SgdsCheckbox>(
    html` <sgds-checkbox disabled required></sgds-checkbox> `
  );
  el.disabled = false;
  await el.updateComplete;
  expect(el.invalid).to.be.true;
});
