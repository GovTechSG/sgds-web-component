import { SgdsRadio, SgdsRadioGroup } from "../src/Radio";
import "../src/Radio";
import {
  fixture,
  assert,
  expect,
  waitUntil,
  elementUpdated,
  aTimeout,
  fixtureCleanup,
} from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";

describe("<sgds-radio>", () => {
  afterEach(() => fixtureCleanup());
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
    const el = await fixture(
      html`<sgds-radio radioId="radio-123"></sgds-radio>`
    );
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
});

describe("<sgds-radiogroup>", () => {
  afterEach(() => fixtureCleanup());
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

  it("radios should have tabindex of -1  by default when unchecked", async () => {
    const el = await fixture(
      html`<sgds-radiogroup name="option"
        ><sgds-radio id="radio1" value="1">one</sgds-radio
        ><sgds-radio id="radio2" value="2">two</sgds-radio></sgds-radiogroup
      >`
    );
    const radio1 = el.querySelector("sgds-radio#radio1");
    const radio2 = el.querySelector("sgds-radio#radio2");
    expect(radio1).to.have.attribute("tabindex", "-1");
    expect(radio2).to.have.attribute("tabindex", "-1");
  });

  it("radio2 should have tabindex of 0 when checked", async () => {
    const el = await fixture(
      html`<sgds-radiogroup name="option"
        ><sgds-radio id="radio1" value="1">one</sgds-radio
        ><sgds-radio id="radio2" value="2">two</sgds-radio></sgds-radiogroup
      >`
    );
    const radio1 = <SgdsRadio>el.querySelector("sgds-radio#radio1");
    const radio2 = <SgdsRadio>el.querySelector("sgds-radio#radio2");
    expect(radio1).to.have.attribute("tabindex", "-1");
    expect(radio2).to.have.attribute("tabindex", "-1");

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.false;
    expect(radio2.checked).to.be.true;
    expect(radio2).to.have.attribute("tabindex", "0");
  });

  it("radio2 should have aria-checked to be true when checked", async () => {
    const el = await fixture(
      html`<sgds-radiogroup name="option"
        ><sgds-radio id="radio1" value="1">one</sgds-radio
        ><sgds-radio id="radio2" value="2">two</sgds-radio></sgds-radiogroup
      >`
    );
    const radio1 = <SgdsRadio>el.querySelector("sgds-radio#radio1");
    const radio2 = <SgdsRadio>el.querySelector("sgds-radio#radio2");
    expect(radio1.checked).to.be.false;
    expect(radio2.checked).to.be.false;
    expect(radio1).to.have.attribute("aria-checked", "false");
    expect(radio2).to.have.attribute("aria-checked", "false");

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.false;
    expect(radio2.checked).to.be.true;
    expect(radio2).to.have.attribute("aria-checked", "true");
  });

  it("radiogroup should emit sgds-change event when one of the radio is clicked", async () => {
    const el = await fixture(
      html`<sgds-radiogroup name="option">
        <sgds-radio id="radio2" value="2">two</sgds-radio></sgds-radiogroup
      >`
    );
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-change", toggleHandler);
    const radio2 = <SgdsRadio>el.querySelector("sgds-radio#radio2");
    radio2.click();
    await Promise.all([elementUpdated(el)]);
    expect(toggleHandler).to.have.been.calledOnce;
  });

  it("radiogroup should update and reflect the value for the checked radio", async () => {
    const el = await fixture<SgdsRadioGroup>(
      html`<sgds-radiogroup name="option">
        <sgds-radio id="radio2" value="2">two</sgds-radio></sgds-radiogroup
      >`
    );
    const radioGroup = <SgdsRadioGroup>el.querySelector("sgds-radiogroup");
    expect(radioGroup?.getAttribute('value')).to.equal(undefined);
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-change", toggleHandler);
    const radio2 = <SgdsRadio>el.querySelector("sgds-radio#radio2");
    radio2.click();
    await Promise.all([el.updateComplete]);
    expect(toggleHandler).to.have.been.calledOnce;

    expect(radioGroup?.getAttribute('value')).to.equal('2');
 
 
  });

  
});

// the interactions between sgds-radio and sgds-radio-group
// --> when a sgds-radio group is clicked --> updates teh value of sgds-radio-group

// Keyboard interactions (arrowdown, arrowup) --> to keep check on the handleKeyDown() you wrote --> and that it updates the sgds-radio-group

// aria-checked tests

// tabindex tests

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
