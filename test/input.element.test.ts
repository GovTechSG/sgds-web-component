import "./sgds-web-component";
import type { SgdsInput, SgdsButton } from "../src/components";
import { expect, fixture, html, oneEvent, waitUntil, assert, elementUpdated } from "@open-wc/testing";
import sinon from "sinon";
import { sendKeys } from "@web/test-runner-commands";

describe("sgds-input", () => {
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-input inputId="test-id" label="label" hintText="hello"></sgds-input>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="form-control-container">
          <label class="form-label" for="test-id">label</label>
          <small class="form-text" id="test-idHelp">hello</small>
          <input type="text" class="form-control " id="test-id" aria-invalid="false" placeholder="placeholder">
        </div>
    `,
      { ignoreAttributes: ["id", "for", "aria-labelledby"] }
    );
  });

  it("input's id attribute should equal to label's for attribute and contain in small's id attribute", async () => {
    const el = await fixture(html`<sgds-input label="label" hintText="hello"></sgds-input>`);
    const input = el.shadowRoot?.querySelector("input");
    const label = el.shadowRoot?.querySelector("label");
    const small = el.shadowRoot?.querySelector("small");
    expect(input?.getAttribute("id")).to.equal(label?.getAttribute("for"));
    expect(small?.getAttribute("id")).to.contain(input?.getAttribute("id"));
  });
  it("input's aria-labelledby points to label id, hinttext id and invalid-feedback id", async () => {
    const el = await fixture<SgdsInput>(html`<sgds-input label="label" hintText="hello" hasFeedback></sgds-input>`);
    const input = el.shadowRoot?.querySelector("input");
    const label = el.shadowRoot?.querySelector("label");
    const small = el.shadowRoot?.querySelector("small");
    const feedback = el.shadowRoot?.querySelector(".invalid-feedback");
    expect(input?.getAttribute("aria-labelledby")).to.contain(label?.getAttribute("id"));
    expect(input?.getAttribute("aria-labelledby")).to.contain(small?.getAttribute("id"));
    expect(input?.getAttribute("aria-labelledby")).not.to.contain(feedback?.getAttribute("id"));

    el.invalid = true;
    await elementUpdated(el);
    expect(input?.getAttribute("aria-labelledby")).to.contain(feedback?.getAttribute("id"));
  });

  it("input's id attribute should contain in .invalid-feedback's id attribute", async () => {
    const el = await fixture<SgdsInput>(html`<sgds-input hasFeedback></sgds-input>`);
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

  // Icon
  it("should render with form-control-group if icon attribute is defined", async () => {
    const el = await fixture(html`<sgds-input
      icon='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
  </svg>'
    ></sgds-input>`);
    expect(el.shadowRoot?.querySelector("div.form-control-group.sgds")).to.exist;
    expect(el.shadowRoot?.querySelector("div.form-control-group.sgds>span.form-control-icon>svg")).to.exist;
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
describe("Feedback UI optional", () => {
  it("when hasFeedback is true, div.invalid-feedback appears in shadowDOM", async () => {
    const el = await fixture<SgdsInput>(
      html` <sgds-input hasFeedback invalidFeedback="invalid feedback"></sgds-input> `
    );
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).not.to.be.null;
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")?.textContent).to.equal("invalid feedback");
  });
  it("when hasFeedback is true and invalid state is true, invalid stylings", async () => {
    const el = await fixture<SgdsInput>(
      html` <sgds-input hasFeedback invalidFeedback="invalid feedback"></sgds-input> `
    );
    expect(el.invalid).to.be.false;
    expect(el.shadowRoot?.querySelector("input")).does.not.have.class("is-invalid");
    //force an invalid state
    el.invalid = true;
    expect(el.invalid).to.be.true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("input")).to.have.class("is-invalid");

    //force an valid state
    el.invalid = false;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("input")).does.not.have.class("is-invalid");
  });
});
describe("when using constraint validation", () => {
  it("by default, invalid should be false", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input></sgds-input> `);
    expect(el.invalid).to.be.false;
    expect(el.reportValidity()).to.be.true;
  });
  it("when required, validation occurs upon typing ", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input required></sgds-input> `);
    expect(el.invalid).to.be.false;

    el.focus();
    await sendKeys({ type: "s" });
    await el.updateComplete;

    expect(el.value).to.equal("s");
    expect(el.invalid).to.be.false;
    expect(el.reportValidity()).to.be.true;

    await sendKeys({ press: "Backspace" });
    await el.updateComplete;
    expect(el.value).to.equal("");

    expect(el.invalid).to.be.true;
    expect(el.reportValidity()).to.be.false;
  });

  it("should be invalid when the pattern does not match", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input pattern="failtest" value="fail"></sgds-input> `);
    expect(el.invalid).to.be.false;
    expect(el.reportValidity()).to.be.false;

    await sendKeys({ type: "tes" });
    await el.updateComplete;
    expect(el.value).to.equal("failtes");
    expect(el.invalid).to.be.true;
    expect(el.reportValidity()).to.be.false;

    await sendKeys({ type: "t" });
    await el.updateComplete;
    expect(el.value).to.equal("failtest");
    expect(el.invalid).to.be.false;
    expect(el.reportValidity()).to.be.true;

    await sendKeys({ press: "Backspace" });
    await el.updateComplete;
    expect(el.value).to.equal("failtes");
    expect(el.invalid).to.be.true;
    expect(el.reportValidity()).to.be.false;
  });

  it("should be invalid when required and disabled is removed", async () => {
    const el = await fixture<SgdsInput>(html` <sgds-input disabled required></sgds-input> `);
    el.disabled = false;
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });
});

describe("when calling HTMLFormElement.reportValidity()", () => {
  it("should be invalid when the input is empty and form.reportValidity() is called", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-input required value=""></sgds-input>
      </form>
    `);

    expect(form.reportValidity()).to.be.false;
  });

  it("should be valid when the input is empty, reportValidity() is called, and the form has novalidate", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-input required value=""></sgds-input>
      </form>
    `);

    expect(form.reportValidity()).to.be.true;
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
  it("should submit the form when pressing enter in a form without a submit button", async () => {
    const form = await fixture<HTMLFormElement>(html` <form><sgds-input></sgds-input></form> `);
    const input = form.querySelector<SgdsInput>("sgds-input");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

    form.addEventListener("submit", submitHandler);
    input?.focus();
    await sendKeys({ press: "Enter" });
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

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

  it("should prevent submission when pressing enter in an input and canceling the keydown event", async () => {
    const form = await fixture<HTMLFormElement>(html` <form><sgds-input></sgds-input></form> `);
    const input = form.querySelector<SgdsInput>("sgds-input");
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    const keydownHandler = sinon.spy((event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });

    form.addEventListener("submit", submitHandler);
    input?.addEventListener("keydown", keydownHandler);
    input?.focus();
    await sendKeys({ press: "Enter" });
    await waitUntil(() => keydownHandler.calledOnce);

    expect(keydownHandler).to.have.been.calledOnce;
    expect(submitHandler).to.not.have.been.called;
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
});
