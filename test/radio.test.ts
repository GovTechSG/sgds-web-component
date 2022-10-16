import { SgdsRadio, SgdsRadioGroup } from "../src/Radio";
import "../src/Radio";
import {
  fixture,
  assert,
  expect,
  waitUntil,
  elementUpdated,
  aTimeout,
} from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";

describe("<sgds-radio>", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-radio");
    assert.instanceOf(el, SgdsRadio);
  });

  it("by default, tabindex='-1'", async () => {
    const el = await fixture(html`<sgds-radio></sgds-radio>`);
    expect(el).to.have.attribute("tabindex", "-1");
  });

  it("when isInline prop is passed, radio class should have class .form-check-inline", async () => {
    const el = await fixture(html`<sgds-radio isInline></sgds-radio>`);
    const radio = el.shadowRoot?.querySelector("div");
    expect(radio?.classList.value).to.contain("form-check-inline");
  });

  it("should be able to pass in value to attributes(id/for pair)", async () => {
    const el = await fixture(html`<sgds-radio id="radio-123"></sgds-radio>`);
    const input = el.shadowRoot?.querySelector("input");
    expect(input).to.have.attribute("id", "radio-123");
    const label = el.shadowRoot?.querySelector("label");
    expect(label).to.have.attribute("for", "radio-123");
  });

  it("should be disabled with the disabled attribute & aria-disabled to be true", async () => {
    const el = await fixture(html`<sgds-radio disabled></sgds-radio>`);
    const radio = el.shadowRoot?.querySelector("input");
    expect(radio?.disabled).to.be.true;
    expect(radio).to.have.attribute("aria-disabled", "true");
  });

  it("should render aria-label attribute value", async () => {
    const el = await fixture(html`<sgds-radio ariaLabel="label"></sgds-radio>`);
    const radio = el.shadowRoot?.querySelector("label");
    expect(radio).to.have.attribute("aria-label", "label");
  });

  it("should be able to pass in value to value attribute", async () => {
    const el = await fixture(html`<sgds-radio value="3"></sgds-radio>`);
    const radio = el.shadowRoot?.querySelector("input");
    expect(radio).to.have.attribute("value", "3");
  });


it("is defined", () => {
  const el = document.createElement("sgds-radiogroup");
  assert.instanceOf(el, SgdsRadioGroup);
});

it("should render the name attribute when passed", async () => {
  const el = await fixture(
    html`<sgds-radiogroup name="option"></sgds-radiogroup>`
  );
  const fieldset = el.shadowRoot?.querySelector("fieldset");
  expect(fieldset).to.have.attribute("name", "option");
});

it("should emit sgds-change event when button is clicked", async () => {
  const el = await fixture(html`<sgds-radio>radio 1</sgds-radio>`);
  const toggleHandler = sinon.spy();
  el.addEventListener("click", toggleHandler, { once: true });
  el.shadowRoot?.querySelector("input")?.click();
  expect(toggleHandler).to.have.been.calledOnce;
});



// it("should show aria-checked to be true when checked is true", async () => {
//   const el = await fixture(
//     html`<sgds-radiogroup><sgds-radio>radio 1</sgds-radio></sgds-radiogroup>`
//   );
//   const toggleHandler = sinon.spy();
//   const input = el.shadowRoot
//     ?.querySelector("input")
//     ?.addEventListener("click", toggleHandler, { once: true });
//   el.shadowRoot?.querySelector("input")?.click();
//   expect(toggleHandler).to.have.been.calledOnce;

//   expect(input).to.have.attribute("aria-checked", "true");
// });

});