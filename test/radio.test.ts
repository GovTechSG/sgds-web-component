import "./sgds-web-component";
import { assert, elementUpdated, expect, fixture, fixtureCleanup, triggerFocusFor } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import { SgdsButton, SgdsRadio, SgdsRadioGroup } from "../src/components";

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

  it("input's id should be equal to label's for attribute", async () => {
    const el = await fixture(html`<sgds-radio></sgds-radio>`);
    const input = el.shadowRoot?.querySelector("input");
    const label = el.shadowRoot?.querySelector("label");
    expect(input?.getAttribute("id")).to.equal(label?.getAttribute("for"));
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

describe("<sgds-radio-group>", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-radio-group");
    assert.instanceOf(el, SgdsRadioGroup);
  });

  it("should render the name attribute when passed", async () => {
    const el = await fixture(html`<sgds-radio-group name="option"></sgds-radio-group>`);
    const fieldset = el.shadowRoot?.querySelector("fieldset");
    expect(fieldset).to.have.attribute("name", "option");
  });

  it("radio2 should have aria-checked to be true when checked", async () => {
    const el = await fixture(
      html`<sgds-radio-group name="option"
        ><sgds-radio id="radio1" value="1">one</sgds-radio
        ><sgds-radio id="radio2" value="2">two</sgds-radio></sgds-radio-group
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

  it("radio-group should emit sgds-change event when one of the radio is clicked", async () => {
    const el = await fixture(
      html`<sgds-radio-group name="option"> <sgds-radio id="radio2" value="2">two</sgds-radio></sgds-radio-group>`
    );
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-change", toggleHandler);
    const radio2 = <SgdsRadio>el.querySelector("sgds-radio#radio2");
    radio2.click();
    await Promise.all([elementUpdated(el)]);
    expect(toggleHandler).to.have.been.calledOnce;
  });

  it("radio-group should update and reflect the value for the checked radio", async () => {
    const el = await fixture<SgdsRadioGroup>(
      html`<sgds-radio-group id="radio-group">
        <sgds-radio id="radio2" value="2">two</sgds-radio>
      </sgds-radio-group>`
    );

    expect(el).to.have.attribute("value", undefined);

    const radio = el.querySelector("sgds-radio");
    radio?.click();
    await el.updateComplete;
    expect(el).to.have.attribute("value", "2");
  });

  it("should be invalid state on form submission with required passed in", async () => {
    const el = await fixture<HTMLFormElement>(
      html`<form>
        <sgds-radio-group id="radio-group" required>
          <sgds-radio id="radio2" value="2">two</sgds-radio>
        </sgds-radio-group>
        <sgds-button type="submit">Submit</sgds-button>
      </form>`
    );

    const button = <SgdsButton>el.querySelector("sgds-button");
    button?.click();
    await el.updateComplete;
    expect(el.reportValidity()).to.be.false;
    const radioGroup = <SgdsRadioGroup>el.querySelector("sgds-radio-group");
    expect(radioGroup.invalid).to.be.true;
  });
  it("when hasFeedback is true, feedback message is empty string", async () => {
    const el = await fixture<SgdsRadioGroup>(
      html`
        <sgds-radio-group id="radio-group" hasFeedback>
          <sgds-radio id="radio2" value="2">two</sgds-radio>
        </sgds-radio-group>
      `
    );
    const invalidFeedback = el.shadowRoot?.querySelector("div.invalid-feedback");
    expect(invalidFeedback?.textContent).to.equal("");
  });
  it("invalidFeedback sets the feedback message", async () => {
    const el = await fixture<SgdsRadioGroup>(
      html`
        <sgds-radio-group id="radio-group" hasFeedback invalidFeedback="test">
          <sgds-radio id="radio2" value="2">two</sgds-radio>
        </sgds-radio-group>
      `
    );
    const invalidFeedback = el.shadowRoot?.querySelector("div.invalid-feedback");
    expect(invalidFeedback?.textContent).to.equal("test");
  });

  it("by default, first radio is tabindex 0", async () => {
    const el = await fixture<SgdsRadioGroup>(html`<sgds-radio-group>
      <sgds-radio value="1">one</sgds-radio>
      <sgds-radio value="2">two</sgds-radio>
      <sgds-radio value="3">three</sgds-radio>
    </sgds-radio-group>`);

    expect(el.querySelectorAll("sgds-radio")[0]).to.have.attribute("tabindex", "0");
    expect(el.querySelectorAll("sgds-radio")[1]).to.have.attribute("tabindex", "-1");
    expect(el.querySelectorAll("sgds-radio")[2]).to.have.attribute("tabindex", "-1");
  });

  it("should toggle tabindex 0 for checked radio & tabindex -1 when unchecked upon clicking", async () => {
    const el = await fixture<SgdsRadioGroup>(html`<sgds-radio-group>
      <sgds-radio value="1">one</sgds-radio>
      <sgds-radio value="2">two</sgds-radio>
      <sgds-radio value="3">three</sgds-radio>
    </sgds-radio-group>`);

    const radio1 = el.querySelectorAll("sgds-radio")[0];
    const radio2 = el.querySelectorAll("sgds-radio")[1];
    const radio3 = el.querySelectorAll("sgds-radio")[2];

    radio1.click();
    await el.updateComplete;

    expect(radio1).to.have.attribute("tabindex", "0");
    expect(radio2).to.have.attribute("tabindex", "-1");
    expect(radio3).to.have.attribute("tabindex", "-1");

    radio2.click();
    await el.updateComplete;

    expect(radio1).to.have.attribute("tabindex", "-1");
    expect(radio2).to.have.attribute("tabindex", "0");
    expect(radio3).to.have.attribute("tabindex", "-1");
  });

  it("clicking label should focus on first radio when radios unchecked", async () => {
    const el = await fixture<SgdsRadioGroup>(html`<sgds-radio-group label="Hello world">
      <sgds-radio value="1">one</sgds-radio>
      <sgds-radio value="2">two</sgds-radio>
      <sgds-radio value="3">three</sgds-radio>
    </sgds-radio-group>`);

    const radio1 = el.querySelectorAll("sgds-radio")[0];

    const label = <HTMLLabelElement>el.shadowRoot?.querySelector("label.form-label");
    label.click();

    await triggerFocusFor(radio1);
    expect(document.activeElement === radio1).to.be.true;
  });

  it("when a radio is checked, clicking label should focus on the checked radio", async () => {
    const el = await fixture<SgdsRadioGroup>(html`<sgds-radio-group label="Hello world">
      <sgds-radio value="1">one</sgds-radio>
      <sgds-radio value="2">two</sgds-radio>
      <sgds-radio value="3">three</sgds-radio>
    </sgds-radio-group>`);

    const radio2 = el.querySelectorAll("sgds-radio")[1];

    radio2.click();
    await el.updateComplete;

    const label = <HTMLLabelElement>el.shadowRoot?.querySelector("label.form-label");
    label.click();

    await triggerFocusFor(radio2);
    expect(document.activeElement === radio2).to.be.true;
  });

  it("should allow for the following keyboard interactions upon keydown", async () => {
    const el = await fixture<SgdsRadioGroup>(html`<sgds-radio-group label="Hello world">
      <sgds-radio value="1">one</sgds-radio>
      <sgds-radio value="2">two</sgds-radio>
      <sgds-radio value="3">three</sgds-radio>
    </sgds-radio-group>`);

    const radio1 = el.querySelectorAll("sgds-radio")[0];
    const radio2 = el.querySelectorAll("sgds-radio")[1];
    const radio3 = el.querySelectorAll("sgds-radio")[2];

    const label = <HTMLLabelElement>el.shadowRoot?.querySelector("label.form-label");
    label.click();

    await triggerFocusFor(radio1);
    expect(document.activeElement === radio1).to.be.true;

    // spacebar key
    await sendKeys({ press: " " });
    expect(radio1).to.have.attribute("tabindex", "0");
    expect(radio1).to.have.attribute("aria-checked", "true");
    expect(el).to.have.attribute("value", "1");

    // arrowright incr index
    await sendKeys({ press: "ArrowRight" });
    expect(radio2).to.have.attribute("tabindex", "0");
    expect(radio2).to.have.attribute("aria-checked", "true");
    expect(el).to.have.attribute("value", "2");

    // arrowdown incr index
    await sendKeys({ press: "ArrowDown" });
    expect(radio3).to.have.attribute("tabindex", "0");
    expect(radio3).to.have.attribute("aria-checked", "true");
    expect(el).to.have.attribute("value", "3");

    // arrowleft decr index
    await sendKeys({ press: "ArrowLeft" });
    expect(radio2).to.have.attribute("tabindex", "0");
    expect(radio2).to.have.attribute("aria-checked", "true");
    expect(el).to.have.attribute("value", "2");

    // arrowup decr index
    await sendKeys({ press: "ArrowLeft" });
    expect(radio1).to.have.attribute("tabindex", "0");
    expect(radio1).to.have.attribute("aria-checked", "true");
    expect(el).to.have.attribute("value", "1");
  });
});

// Keyboard interactions (arrowdown, arrowup) --> to keep check on the handleKeyDown() you wrote --> and that it updates the sgds-radio-group
