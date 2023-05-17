import { SgdsTextArea } from "../src/components/Textarea/sgds-textarea";
import "../src/components/Textarea";
import { SgdsButton } from "../src/components/Button/sgds-button";
import "../src/components/Button";
import { assert, fixture, html, expect, waitUntil, oneEvent } from "@open-wc/testing";
import sinon from "sinon";
import { sendKeys } from "@web/test-runner-commands";

describe("sgds-textarea", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-textarea");
    assert.instanceOf(el, SgdsTextArea);
  });
  it("renders with default values", async () => {
    const el = await fixture(
      html`<sgds-textarea
        textareaId="test"
        required
        invalidFeedback="Do not leave blank"
        maxlength="10"
      ></sgds-textarea>`
    );
    assert.shadowDom.equal(
      el,
      `
      <div class="text-area-label-wrapper d-flex justify-content-between">
        <label class="form-label" for="test">label</label>
        <div class="form-text">0/10</div>
      </div>
      <textarea class=" form-control textarea-resize-vertical " id="test" rows="4" placeholder="Placeholder" maxlength="10" aria-invalid="false" spellcheck="false" required=""></textarea>
    `
    );
  });

  it("should be disabled with the disabled attribute", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea disabled></sgds-textarea> `);
    const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>("textarea");

    expect(textarea?.disabled).to.be.true;
  });

  it("should focus the textarea when clicking on the label", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea label="Name"></sgds-textarea> `);
    const label = el.shadowRoot?.querySelector(".form-label");
    const submitHandler = sinon.spy();

    el.addEventListener("sgds-focus", submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });
  it("when hasFeedback is true, div.invalid-feedback appears", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea label="Name" hasFeedback></sgds-textarea> `);
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).to.exist;
  });
  it("when hasFeedback is true, div.invalid-feedback appears and invalidFeedback value is forwarded to it", async () => {
    const el = await fixture<SgdsTextArea>(html`
      <sgds-textarea label="Name" hasFeedback invalidFeedback="teast"></sgds-textarea>
    `);
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).to.exist;
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")?.textContent).to.equal("teast");
  });

  it(".is-invalid appears on textarea when hasFeedback and state of component is invalid", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea label="Name" hasFeedback></sgds-textarea> `);
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea?.className).not.to.include("is-invalid");

    //force an invalid state
    el.invalid = true;
    await el.updateComplete;
    expect(textarea?.className).to.include("is-invalid");
  });
  it(".is-valid appears on textarea when hasFeedback and state of component is valid", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea label="Name" hasFeedback></sgds-textarea> `);
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea?.className).not.to.include("is-valid");

    //force an invalid state
    el.valid = true;
    await el.updateComplete;
    expect(textarea?.className).to.include("is-valid");
  });
});

describe("when using constraint validation", () => {
  it("should be valid by default", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea></sgds-textarea> `);
    expect(el.invalid).to.be.false;
  });

  it("should be valid when required and empty by default", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea required></sgds-textarea> `);

    expect(el.invalid).to.be.false;
  });

  it("should be invalid when required and after removing disabled ", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea disabled required></sgds-textarea> `);

    el.disabled = false;
    await el.updateComplete;

    expect(el.invalid).to.be.true;
  });

  it("should be invalid when required and disabled is removed", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea disabled required></sgds-textarea> `);
    el.disabled = false;
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });
  it("should be valid=false when input is not required, has other validation,  and has no value", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea minlength="3" value="t"></sgds-textarea> `);
    expect(el.valid).to.be.false;
    expect(el.invalid).to.be.false;
    el.focus();
    await sendKeys({ type: "es" });
    await el.updateComplete;
    expect(el.value).to.equal("tes");
    expect(el.valid).to.be.true;
    expect(el.invalid).to.be.false;

    await sendKeys({ press: "Backspace" });
    await el.updateComplete;
    expect(el.value).to.equal("te");
    expect(el.valid).to.be.false;
    expect(el.invalid).to.be.true;
    // when empty value and input is optional, valid/invalid state should go back to default state
    await sendKeys({ press: "Backspace" });
    await sendKeys({ press: "Backspace" });
    await el.updateComplete;
    expect(el.value).to.equal("");
    expect(el.valid).to.be.false;
    expect(el.invalid).to.be.false;
  });
});

describe("when resetting a form", () => {
  it("should reset the element to its initial value", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-textarea name="a" value="test"></sgds-textarea>
        <sgds-button type="reset">Reset</sgds-button>
      </form>
    `);
    const button = form.querySelector<SgdsButton>("sgds-button");
    const textarea = form.querySelector<SgdsTextArea>("sgds-textarea");
    if (textarea) textarea.value = "1234";

    await textarea?.updateComplete;

    setTimeout(() => button?.click());
    await oneEvent(form, "reset");
    await textarea?.updateComplete;

    expect(textarea?.value).to.equal("test");

    if (textarea) textarea.defaultValue = "";

    setTimeout(() => button?.click());
    await oneEvent(form, "reset");
    await textarea?.updateComplete;

    expect(textarea?.value).to.equal("");
  });
});

describe("when maxlength is declared", () => {
  it("form text should exist", async () => {
    const el = await fixture<SgdsTextArea>(html` <sgds-textarea required maxlength="250"></sgds-textarea> `);
    const formtext = el.shadowRoot?.querySelector(".form-text");

    expect(formtext).to.exist;
    expect(formtext?.textContent).to.contain("0/250");

    el.setAttribute("maxlength", "300");
    await el.updateComplete;

    expect(formtext).to.exist;
    expect(formtext?.textContent).to.contain("0/300");
  });
});

describe("Feedback UI optional", () => {
  it("when hasFeedback is true, div.invalid-feedback appears in shadowDOM", async () => {
    const el = await fixture<SgdsTextArea>(
      html` <sgds-textarea hasFeedback invalidFeedback="invalid feedback"></sgds-textarea> `
    );
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).not.to.be.null;
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")?.textContent).to.equal("invalid feedback");
  });
  it("when hasFeedback is true and invalid state is true, invalid stylings", async () => {
    const el = await fixture<SgdsTextArea>(
      html` <sgds-textarea hasFeedback invalidFeedback="invalid feedback"></sgds-textarea> `
    );
    expect(el.invalid).to.be.false;
    expect(el.valid).to.be.false;
    expect(el.shadowRoot?.querySelector("textarea")).does.not.have.class("is-invalid");
    expect(el.shadowRoot?.querySelector("textarea")).does.not.have.class("is-valid");
    //force an invalid state
    el.invalid = true;
    expect(el.invalid).to.be.true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("textarea")).to.have.class("is-invalid");
    expect(el.shadowRoot?.querySelector("textarea")).does.not.have.class("is-valid");

    // //force an valid state
    el.invalid = false;
    el.valid = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("textarea")).to.have.class("is-valid");
    expect(el.shadowRoot?.querySelector("textarea")).does.not.have.class("is-invalid");
  });
});