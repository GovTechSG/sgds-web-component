import { assert, expect, fixture, html, oneEvent, waitUntil } from "@open-wc/testing";
import sinon from "sinon";
import type { SgdsButton, SgdsTextarea } from "../src/components";
import "./sgds-web-component";
import { sendKeys } from "@web/test-runner-commands";

describe("sgds-textarea", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsTextarea>(html`<sgds-textarea maxlength="10" required></sgds-textarea>`);
    assert.shadowDom.equal(
      el,
      `
      <div class="form-control-container">
        <label class="form-label"></label>
        <textarea class=" form-control textarea-resize-vertical "  rows="4" placeholder="Placeholder" maxlength="10" aria-invalid="false" spellcheck="false" required=""></textarea>
        <div class="textarea-info-container">
          <div class="form-text word-count">0/10</div>
        </div>
      </div>
    `,
      { ignoreAttributes: ["id", "for"] }
    );
  });
  it("label for attr should equal to textarea id attribute", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea></sgds-textarea> `);
    const label = el.shadowRoot?.querySelector("label");
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(label?.getAttribute("for")).to.equal(textarea?.getAttribute("id"));
  });
  it("when invalid feedback element is in shadowm dom, its div id should contain same id value as textarea", async () => {
    const el = await fixture<SgdsTextarea>(
      html` <sgds-textarea hasFeedback invalid invalidFeedback="test"></sgds-textarea> `
    );
    const feedback = el.shadowRoot?.querySelector("div.invalid-feedback");
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(feedback?.getAttribute("id")).to.contain(textarea?.getAttribute("id"));
  });
  it("should be disabled with the disabled attribute", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea disabled></sgds-textarea> `);
    const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>("textarea");

    expect(textarea?.disabled).to.be.true;
  });

  it("should focus the textarea when clicking on the label", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea label="Name"></sgds-textarea> `);
    const label = el.shadowRoot?.querySelector(".form-label");
    const submitHandler = sinon.spy();

    el.addEventListener("sgds-focus", submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });
  it("when hasFeedback is true and invalidFeedback specified, div.invalid-feedback appears", async () => {
    const el = await fixture<SgdsTextarea>(
      html` <sgds-textarea label="Name" invalid hasFeedback invalidFeedback="test"></sgds-textarea> `
    );
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).to.exist;
  });
  it("when hasFeedback is true, div.invalid-feedback appears and invalidFeedback value is forwarded to it", async () => {
    const el = await fixture<SgdsTextarea>(html`
      <sgds-textarea label="Name" invalid hasFeedback invalidFeedback="teast"></sgds-textarea>
    `);
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).to.exist;
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")?.textContent).to.contain("teast");
  });

  it(".is-invalid appears on textarea when hasFeedback and state of component is invalid", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea label="Name" hasFeedback></sgds-textarea> `);
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea?.className).not.to.include("is-invalid");

    //force an invalid state
    el.invalid = true;
    await el.updateComplete;
    expect(textarea?.className).to.include("is-invalid");
  });
});

describe("when using constraint validation", () => {
  it("should be valid by default", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea></sgds-textarea> `);
    expect(el.invalid).to.be.false;
  });

  it("should be valid when required and empty by default", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea required></sgds-textarea> `);

    expect(el.invalid).to.be.false;
  });

  it("when disabled, invalid state is removed", async () => {
    const el = await fixture<SgdsTextarea>(
      html` <sgds-textarea invalid invalidFeedback="test" hasFeedback required></sgds-textarea> `
    );
    expect(el.invalid).to.be.true;
    el.disabled = true;
    await el.updateComplete;
    expect(el.invalid).to.be.false;
    el.disabled = false;
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
    const textarea = form.querySelector<SgdsTextarea>("sgds-textarea");
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
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea required maxlength="250"></sgds-textarea> `);
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
  it("when hasFeedback and invalid is true, div.invalid-feedback appears in shadowDOM", async () => {
    const el = await fixture<SgdsTextarea>(
      html` <sgds-textarea hasFeedback invalid invalidFeedback="invalid feedback"></sgds-textarea> `
    );
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")).not.to.be.null;
    expect(el.shadowRoot?.querySelector("div.invalid-feedback")?.textContent).to.contain("invalid feedback");
  });
  it("when hasFeedback is true and invalid state is true, invalid stylings", async () => {
    const el = await fixture<SgdsTextarea>(
      html` <sgds-textarea hasFeedback invalidFeedback="invalid feedback"></sgds-textarea> `
    );
    expect(el.invalid).to.be.false;
    expect(el.shadowRoot?.querySelector("textarea")).does.not.have.class("is-invalid");
    //force an invalid state
    el.invalid = true;
    expect(el.invalid).to.be.true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("textarea")).to.have.class("is-invalid");

    // //force an valid state
    el.invalid = false;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("textarea")).does.not.have.class("is-invalid");
  });
});

describe("Validaiton", () => {
  it("fulfills required validation", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-textarea required value="test"></sgds-textarea>
      </form>
    `);
    expect(form.reportValidity()).to.be.true;
  });
  it("fulfills required validation", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-textarea required value=""></sgds-textarea>
      </form>
    `);
    expect(form.reportValidity()).to.be.false;
  });
  it("validates when touched", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea required></sgds-textarea> `);
    expect(el.invalid).to.be.false;
    el.focus();
    el.blur();
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });
  it("validation is reset when typing occurs", async () => {
    const el = await fixture<SgdsTextarea>(html` <sgds-textarea required></sgds-textarea> `);
    expect(el.invalid).to.be.false;
    el.focus();
    el.blur();
    await el.updateComplete;
    expect(el.invalid).to.be.true;

    el.focus();
    await sendKeys({ press: "A" });
    await el.updateComplete;
    expect(el.invalid).to.be.false;
  });
  it("form resets works on textarea", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-textarea required value=""></sgds-textarea>
      </form>
    `);

    const textarea = form.querySelector("sgds-textarea");
    textarea?.focus();
    await sendKeys({ press: "A" });
    await waitUntil(() => textarea?.value === "A");

    form.reset();

    await waitUntil(() => textarea?.value === "");
    expect(textarea?.value).to.equal("");
  });
  it("form resets resets validity on textarea", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-textarea invalid invalidFeedback="test" hasFeedback></sgds-textarea>
      </form>
    `);
    const textarea = form.querySelector("sgds-textarea");
    form.reset();

    await waitUntil(() => !textarea?.invalid);
    expect(textarea?.invalid).to.be.false;
  });
});
