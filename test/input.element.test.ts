import "./sgds-web-component";
import type { SgdsInput, SgdsButton, SgdsIcon } from "../src/components";
import { expect, fixture, html, oneEvent, waitUntil, assert, elementUpdated } from "@open-wc/testing";
import sinon from "sinon";
import { sendKeys, sendMouse } from "@web/test-runner-commands";

describe("sgds-input", () => {
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-input inputId="test-id" label="label" hintText="hello"></sgds-input>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="form-control-container">
          <label class="form-label" for="test-id">label</label>
           <div class="form-control-row">
          <div class="form-control-group">
            <slot name="icon"></slot>
            <input type="text" class="form-control" id="test-id" aria-invalid="false" placeholder="placeholder">
            <slot name="trailing-icon"></slot>
          </div>
          <slot name="action"></slot>
          </div>
          <div class="form-text" id="test-idHelp">hello</div>
        </div>
    `,
      { ignoreAttributes: ["id", "for", "aria-labelledby"] }
    );
  });
  it("renders with suffix defined", async () => {
    const el = await fixture(html`<sgds-input inputId="test-id" suffix="test"></sgds-input>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="form-control-container">
        <div class="form-control-row">
          <div class="form-control-group">
            <slot name="icon"></slot>
            <input type="text" class="form-control" id="test-id" aria-invalid="false" placeholder="placeholder">
            <span class="form-control-suffix">test</span>  
            <slot name="trailing-icon"></slot>
          </div>
            <slot name="action"></slot>
        </div>
    `,
      { ignoreAttributes: ["id", "for", "aria-labelledby"] }
    );
  });
  it("renders with prefix defined", async () => {
    const el = await fixture(html`<sgds-input inputId="test-id" prefix="test"></sgds-input>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="form-control-container">
        <div class="form-control-row">
          <div class="form-control-group">
            <slot name="icon"></slot>
            <span class="form-control-prefix">
              test
            </span>
            <input type="text" class="form-control" id="test-id" aria-invalid="false" placeholder="placeholder">
            <slot name="trailing-icon"></slot>
          </div>
            <slot name="action"></slot>
          </div>
    `,
      { ignoreAttributes: ["id", "for", "aria-labelledby"] }
    );
  });
  it("renders with spinner when loading=true", async () => {
    const el = await fixture(html`<sgds-input inputId="test-id" loading></sgds-input>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="form-control-container">
          <div class="form-control-row">
            <div class="form-control-group">
              <slot name="icon"></slot>
              <input type="text" class="form-control" id="test-id" aria-invalid="false" placeholder="placeholder">
              <slot name="trailing-icon">
              <sgds-spinner
                size="sm"
                variant="primary">
              </sgds-spinner>
            </slot>
            </div>
              <slot name="action"></slot>
        </div>
    `,
      { ignoreAttributes: ["id", "for", "aria-labelledby"] }
    );
  });

  it("input's id attribute should equal to label's for attribute and contain in hint text id attribute", async () => {
    const el = await fixture(html`<sgds-input label="label" hintText="hello"></sgds-input>`);
    const input = el.shadowRoot?.querySelector("input");
    const label = el.shadowRoot?.querySelector("label");
    const hintText = el.shadowRoot?.querySelector("div.form-text");
    expect(input?.getAttribute("id")).to.equal(label?.getAttribute("for"));
    expect(hintText?.getAttribute("id")).to.contain(input?.getAttribute("id"));
  });
  it("input's aria-labelledby points to label id, hint text id and invalid-feedback id", async () => {
    const el = await fixture<SgdsInput>(
      html`<sgds-input label="label" hintText="hello" hasFeedback="both"></sgds-input>`
    );
    const input = el.shadowRoot?.querySelector("input");
    const label = el.shadowRoot?.querySelector("label");
    const hintText = el.shadowRoot?.querySelector("div.form-text");
    expect(input?.getAttribute("aria-labelledby")).to.contain(label?.getAttribute("id"));
    expect(input?.getAttribute("aria-labelledby")).to.contain(hintText?.getAttribute("id"));

    el.invalid = true;
    await elementUpdated(el);
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback");
    expect(input?.getAttribute("aria-labelledby")).to.contain(feedback?.getAttribute("id"));
  });

  it("input's id attribute should contain in .invalid-feedback's id attribute", async () => {
    const el = await fixture<SgdsInput>(html`<sgds-input hasFeedback="both"></sgds-input>`);
    el.invalid = true;
    await elementUpdated(el);
    const input = el.shadowRoot?.querySelector("input");
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback");
    expect(feedback?.getAttribute("id")).to.contain(input?.getAttribute("id"));
    expect(input?.getAttribute("aria-describedby")).to.contain(feedback?.getAttribute("id"));
  });

  it("should be disabled with the disabled attribute", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input disabled></sgds-input> `);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>("input");

    expect(input?.disabled).to.be.true;
  });

  // Labels
  it("should replace label value the if updated", async () => {
    const el = await fixture(html`<sgds-input></sgds-input>`);
    el.setAttribute("label", "Enter your name");
    await elementUpdated(el);
    const labelText = el.shadowRoot?.querySelector(".form-label");
    expect(labelText?.textContent).to.contain("Enter your name");
  });

  // Hint Text
  it("should render hint text element if hintText attribute is defined", async () => {
    const el = await fixture(html`<sgds-input hintText="hint"></sgds-input>`);
    const hintText = el.shadowRoot?.querySelector(".form-text");
    el.setAttribute("hintText", "hint");
    await elementUpdated(el);
    expect(hintText?.textContent).to.equal("hint");
    expect(hintText).to.exist;
  });

  //Name
  it("updates the name attribute value to 'Hello'", async () => {
    const el = await fixture(html`<sgds-input></sgds-input>`);
    el?.setAttribute("name", "Hello");
    await elementUpdated(el);
    const name = el.shadowRoot?.querySelector(".form-control");
    expect(name?.getAttribute("name")).to.equal("Hello");
  });

  //Placeholder
  it("updates the default placeholder value to 'Hello'", async () => {
    const el = await fixture(html`<sgds-input></sgds-input>`);
    el?.setAttribute("placeholder", "Hello");
    await elementUpdated(el);
    const placeHolder = el.shadowRoot?.querySelector(".form-control");
    expect(placeHolder?.getAttribute("placeholder")).to.equal("Hello");
  });

  it("placeholder prop is passed to input", async () => {
    const el = await fixture(html`<sgds-input placeholder="hello"></sgds-input>`);
    const placeHolder = el.shadowRoot?.querySelector(".form-control");
    expect(placeHolder?.getAttribute("placeholder")).to.equal("hello");
  });
  it("should focus the input when clicking on the label", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input label="Name"></sgds-input> `);
    const label = el.shadowRoot?.querySelector("label");
    const submitHandler = sinon.spy();

    el.addEventListener("sgds-focus", submitHandler);
    (label as HTMLElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });
});

describe("sgds-input type='password'", () => {
  it("when type=password, eye-fill icon should appear", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input type="password"></sgds-input> `);
    const icon = el.shadowRoot?.querySelector<SgdsIcon>("sgds-icon");
    expect(icon?.name).to.equal("eye-fill");
  });
  it("when eye-fill icon is clicked, it becomes eye-slash-fill icon", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input type="password"></sgds-input> `);
    const icon = el.shadowRoot?.querySelector<SgdsIcon>("sgds-icon");
    expect(icon?.name).to.equal("eye-fill");

    icon?.click();
    await elementUpdated(el);
    expect(icon?.name).to.equal("eye-slash-fill");
  });
  it("when eye-fill icon is clicked, shadow dom input's type becomes text to show password", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input type="password"></sgds-input> `);
    const icon = el.shadowRoot?.querySelector<SgdsIcon>("sgds-icon");
    expect(icon?.name).to.equal("eye-fill");

    icon?.click();
    await elementUpdated(el);
    const shadowInput = el.shadowRoot?.querySelector("input");
    expect(shadowInput?.type).to.equal("text");
  });
});
describe("Feedback UI optional", () => {
  it("when hasFeedback and invalid is true, div.invalid-feedback appears in shadowDOM", async () => {
    const el = await fixture<SgdsInput>(
      html` <sgds-input invalid hasFeedback="both" invalidFeedback="invalid feedback"></sgds-input> `
    );
    el.invalid = true;
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).not.to.be.null;
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")?.textContent).to.contain("invalid feedback");
  });
  it("when hasFeedback is true and invalid state is true, invalid stylings", async () => {
    const el = await fixture<SgdsInput>(
      html` <sgds-input hasFeedback="both" invalidFeedback="invalid feedback"></sgds-input> `
    );
    expect(el.invalid).to.be.false;
    expect(el.shadowRoot?.querySelector(".form-control-group")).does.not.have.class("is-invalid");
    //force an invalid state
    el.invalid = true;
    expect(el.invalid).to.be.true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".form-control-group")).to.have.class("is-invalid");

    //force an valid state
    el.invalid = false;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".form-control-group")).does.not.have.class("is-invalid");
  });
});
describe("when using constraint validation", () => {
  it("by default, invalid should be false", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input></sgds-input> `);
    expect(el.invalid).to.be.false;
    expect(el.checkValidity()).to.be.true;
  });
  it("invalid is true for a required input when it is touched ", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input required></sgds-input> `);
    expect(el.invalid).to.be.false;

    el.focus();
    el.blur();
    await el.updateComplete;
    expect(el.invalid).to.be.true;
    expect(el.checkValidity()).to.be.false;
  });
  it("for non requried fields invalid is always false even after touching", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input></sgds-input> `);
    expect(el.invalid).to.be.false;

    el.focus();
    el.blur();
    await el.updateComplete;
    expect(el.invalid).to.be.false;
  });
  it("when required, validation occurs upon onChange ", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input required></sgds-input> `);
    expect(el.invalid).to.be.false;

    el.focus();
    await sendKeys({ type: "s" });
    el.blur();
    await el.updateComplete;

    expect(el.value).to.equal("s");
    expect(el.invalid).to.be.false;
    expect(el.checkValidity()).to.be.true;
    el.focus();
    await sendKeys({ press: "Backspace" });
    el.blur();
    await el.updateComplete;
    expect(el.value).to.equal("");

    expect(el.invalid).to.be.true;
    expect(el.checkValidity()).to.be.false;
  });

  it("when required, blurring out an empty and touched field should cause input to be invalid", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input required></sgds-input> `);
    expect(el.invalid).to.be.false;

    el.focus();
    await sendKeys({ type: "ssd" });
    el.blur();
    await el.updateComplete;
    expect(el.value).to.equal("ssd");
    expect(el.invalid).to.be.false;

    el.focus();
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendMouse({ type: "click", position: [0, 0] });

    expect(el.invalid).to.be.true;
    expect(el.checkValidity()).to.be.false;

    el.focus();
    await sendKeys({ type: "ssd" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendMouse({ type: "click", position: [0, 0] });
    expect(el.invalid).to.be.true;
    expect(el.checkValidity()).to.be.false;
  });
  it("when NOT required, blurring out an empty and touched field should NOT cause input to be invalid", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input></sgds-input> `);
    expect(el.invalid).to.be.false;

    el.focus();
    await sendKeys({ type: "ssd" });
    el.blur();
    await el.updateComplete;
    expect(el.value).to.equal("ssd");
    expect(el.invalid).to.be.false;

    el.focus();
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendMouse({ type: "click", position: [0, 0] });

    expect(el.invalid).to.be.false;
    expect(el.checkValidity()).to.be.true;

    el.focus();
    await sendKeys({ type: "ssd" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await sendMouse({ type: "click", position: [0, 0] });
    expect(el.invalid).to.be.false;
    expect(el.checkValidity()).to.be.true;
  });

  it("for an invalid field,  invalid is set to false (reset) when user is typing", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input invalid></sgds-input> `);
    expect(el.invalid).to.be.true;
    el.focus();
    await sendKeys({ type: "s" });
    await el.updateComplete;
    expect(el.invalid).to.be.false;
  });
  it("should be invalid when the pattern does not match", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input pattern="failtest" value="fail"></sgds-input> `);
    expect(el.invalid).to.be.false;
    expect(el.checkValidity()).to.be.false;
    el.focus();
    await sendKeys({ type: "tes" });
    el.blur();
    await el.updateComplete;
    expect(el.value).to.equal("failtes");
    expect(el.invalid).to.be.true;
    expect(el.checkValidity()).to.be.false;
    el.focus();
    await sendKeys({ type: "t" });
    el.blur();
    await el.updateComplete;
    expect(el.value).to.equal("failtest");
    expect(el.invalid).to.be.false;
    expect(el.checkValidity()).to.be.true;
    el.focus();
    await sendKeys({ press: "Backspace" });
    el.blur();
    await el.updateComplete;
    expect(el.value).to.equal("failtes");
    expect(el.invalid).to.be.true;
    expect(el.checkValidity()).to.be.false;
  });

  it("when disabled, invalid state is removed", async () => {
    const el = await fixture<SgdsInput>(
      html` <sgds-input invalid invalidFeedback="test" hasFeedback="both"></sgds-input> `
    );
    expect(el.invalid).to.be.true;
    el.disabled = true;
    await el.updateComplete;
    expect(el.invalid).to.be.false;
    el.disabled = false;
    expect(el.invalid).to.be.false;
  });
});

describe("when calling HTMLFormElement.reportValidity()", () => {
  it("should be valid when the input is empty and form.reportValidity() is called", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input required value="test"></sgds-input>
      </form>
    `);

    expect(form.reportValidity()).to.be.true;
  });
  it("should be invalid when the input is empty and form.reportValidity() is called", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input required value=""></sgds-input>
      </form>
    `);

    expect(form.reportValidity()).to.be.false;
  });

  it("fires sgds-input event when value is entered", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input></sgds-input> `);
    const inputHandler = sinon.spy();
    el.focus();
    el.addEventListener("sgds-input", inputHandler);
    await sendKeys({ press: "A" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputHandler).to.have.been.calledOnce;
  });
});

describe("when submitting a form", () => {
  it("should submit the form when pressing enter in a form with a submit button", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input></sgds-input>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const submitButton = form.querySelector<SgdsButton>("sgds-button");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

    form.addEventListener("submit", submitHandler);
    submitButton?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });

  it("when disabled is true in SgdsInput, form can be submitted even if input is required", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input required disabled></sgds-input>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const submitButton = form.querySelector<SgdsButton>("sgds-button");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    expect(form.reportValidity()).to.equal(true);
    form.addEventListener("submit", submitHandler);
    submitButton?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });

  it("form submission is blocked when input is required", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input required></sgds-input>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const submitButton = form.querySelector<SgdsButton>("sgds-button");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    expect(form.reportValidity()).to.equal(false);
    form.addEventListener("submit", submitHandler);
    submitButton?.click();
    expect(submitHandler).not.to.have.been.calledOnce;
  });
  it("when form has novalidate, form submission is proceeds even when input is required", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-input required></sgds-input>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const submitButton = form.querySelector<SgdsButton>("sgds-button");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    expect(form.reportValidity()).to.equal(false);
    form.addEventListener("submit", submitHandler);
    submitButton?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });
});

describe("when resetting a form", () => {
  it("should reset the element to its initial value", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input name="a" value="test"></sgds-input>
        <sgds-button type="reset">Reset</sgds-button>
      </form>
    `);
    const button = form.querySelector<SgdsButton>("sgds-button");
    const input = form.querySelector<SgdsInput>("sgds-input");
    expect(input?.defaultValue).to.equal("test");
    if (input) input.value = "1234";
    // defaultValue should still be test as set when first created
    expect(input?.defaultValue).to.equal("test");

    await input?.updateComplete;

    setTimeout(() => button?.click());
    await oneEvent(form, "reset");
    await input?.updateComplete;

    expect(input?.value).to.equal("test");

    if (input) input.defaultValue = "";

    setTimeout(() => button?.click());
    await oneEvent(form, "reset");
    await input?.updateComplete;

    expect(input?.value).to.equal("");
  });
  it("form validity gets reset", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input invalid></sgds-input>
        <sgds-button type="reset">Reset</sgds-button>
      </form>
    `);
    const button = form.querySelector<SgdsButton>("sgds-button");
    const input = form.querySelector<SgdsInput>("sgds-input");
    expect(input?.invalid).to.equal(true);

    setTimeout(() => button?.click());
    await oneEvent(form, "reset");
    await input?.updateComplete;

    expect(input?.invalid).to.equal(false);
  });
});
