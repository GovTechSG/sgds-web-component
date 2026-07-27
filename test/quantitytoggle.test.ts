import "./sgds-web-component";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import { SgdsIconButton, SgdsInput, SgdsQuantityToggle } from "../src/components";

describe("visual appearance", () => {
  it("minus button has variant=outline, tone=neutral, size=md and class minus-btn", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button.minus-btn") as HTMLElement;

    expect(minusBtn).to.exist;
    expect(minusBtn.getAttribute("variant")).to.equal("outline");
    expect(minusBtn.getAttribute("tone")).to.equal("neutral");
    expect(minusBtn.getAttribute("size")).to.equal("md");
  });

  it("plus button has variant=outline, tone=neutral, size=md and class plus-btn", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle></sgds-quantity-toggle>`);
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button.plus-btn") as HTMLElement;

    expect(plusBtn).to.exist;
    expect(plusBtn.getAttribute("variant")).to.equal("outline");
    expect(plusBtn.getAttribute("tone")).to.equal("neutral");
    expect(plusBtn.getAttribute("size")).to.equal("md");
  });
});

describe("when minusBtn or plusBtn is clicked", () => {
  it("should decrease and increase the value by 1 respectively", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='increase by']") as HTMLButtonElement;

    minusBtn.click();
    await waitUntil(() => el.value === 9);
    expect(el.value).to.equal(9);

    plusBtn.click();
    await waitUntil(() => el.value === 10);
    expect(el.value).to.equal(10);
  });

  it("minusBtn is disabled when reaches 0 without minimum value set", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="1"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;

    minusBtn.click();
    await waitUntil(() => el.value === 0);

    expect(el.value).to.equal(0);
    expect(minusBtn.hasAttribute("disabled")).to.be.true;
  });

  it("minusBtn is disabled when reaches minimum value", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle value="10" min="8"></sgds-quantity-toggle>`
    );
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;

    minusBtn.click();
    await waitUntil(() => el.value === 9);

    expect(el.value).to.equal(9);

    minusBtn.click();
    await waitUntil(() => el.value === 8);

    expect(el.value).to.equal(8);
    expect(minusBtn.hasAttribute("disabled")).to.be.true;
  });

  it("minusBtn is disabled when reaches maximum value", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle value="10" max="11"></sgds-quantity-toggle>`
    );
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='increase by']") as HTMLButtonElement;

    plusBtn.click();
    await waitUntil(() => el.value === 11);

    expect(el.value).to.equal(11);
    expect(plusBtn.hasAttribute("disabled")).to.be.true;
  });
});

describe("when value change", () => {
  it("fires sgds-input event when value is entered", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const inputHandler = sinon.spy();
    inputEl.focus();
    el.addEventListener("sgds-input", inputHandler);
    await sendKeys({ press: "0" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputHandler).to.have.been.calledOnce;
  });

  it("prevent from entering special characters", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="15"></sgds-quantity-toggle>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const inputHandler = sinon.spy();
    inputEl.focus();
    el.addEventListener("sgds-input", inputHandler);
    await sendKeys({ press: "ArrowLeft" });
    await sendKeys({ press: "ArrowLeft" });
    waitUntil(() => inputHandler.calledTwice);
    await sendKeys({ press: "Minus" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputEl.value).to.equal(15);
  });

  it("resets value to 0 when delete the value", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="15"></sgds-quantity-toggle>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const inputHandler = sinon.spy();
    inputEl.focus();
    el.addEventListener("sgds-input", inputHandler);
    await sendKeys({ press: "Backspace" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputEl.value).to.equal(1);

    await sendKeys({ press: "Backspace" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputEl.value).to.equal(0);
  });
});

describe("when step", () => {
  it("should decrease and increase with steps", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle value="10" step="91"></sgds-quantity-toggle>`
    );
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='increase by']") as HTMLButtonElement;

    minusBtn.click();
    await waitUntil(() => el.value === 0);

    expect(el.value).to.equal(0);

    plusBtn.click();
    await waitUntil(() => el.value === 91);

    expect(el.value).to.equal(91);
  });
});

describe("when step changes", () => {
  it("should change arialabel accordingly", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle step="5"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='increase by']") as HTMLButtonElement;

    expect(minusBtn).to.not.be.undefined;
    expect(minusBtn.getAttribute("arialabel")).to.equal("decrease by 5");

    expect(plusBtn.getAttribute("arialabel")).to.equal("increase by 5");
  });
});

describe("methods", () => {
  it("plus method works to increment value of quantity-toggle", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    el.plus();
    await waitUntil(() => el.value === 11);
    expect(el.value).to.equal(11);
  });

  it("minus method works to decrement value of quantity-toggle", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    el.minus();
    await waitUntil(() => el.value === 9);
    expect(el.value).to.equal(9);
  });
});

describe("in form context", () => {
  it("resets to defaultValue when reset sgds-icon-button is clicked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle name="a" value="5"></sgds-quantity-toggle>
      </form>
    `);
    const qtyToggle = form.querySelector<SgdsQuantityToggle>("sgds-quantity-toggle");
    expect(qtyToggle?.defaultValue).to.equal(5);
    //force a random value different from default value
    if (qtyToggle) qtyToggle.value = 10;

    await qtyToggle?.updateComplete;
    expect(qtyToggle?.defaultValue).to.equal(5);
    form.reset();
    await waitUntil(() => qtyToggle?.value === 5);

    expect(qtyToggle?.value).to.equal(5);
  });

  it("valid when quantity toggle has no contraints", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle name="a" value="5"></sgds-quantity-toggle>
      </form>
    `);
    expect(form.reportValidity()).to.be.true;
  });

  it("valid when passes min max validation", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle name="a" max="6" min="3" value="5"></sgds-quantity-toggle>
      </form>
    `);
    expect(form.reportValidity()).to.be.true;
  });

  it("invalid when fails min max validation", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle name="a" max="6" min="3" value="7"></sgds-quantity-toggle>
      </form>
    `);
    expect(form.reportValidity()).to.be.false;
  });

  it("input typing validation happens on change", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="both" min="3"></sgds-quantity-toggle>`
    );
    const input = el.shadowRoot?.querySelector<SgdsInput>("sgds-input");
    input?.focus();
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
    await sendKeys({ press: "2" });
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
    input?.blur();
    await waitUntil(() => el.shadowRoot?.querySelector(".invalid-feedback"));
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.exist;
  });

  it("validation happens as user clicks button", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="both" min="2"></sgds-quantity-toggle>`
    );
    const plusBtn = el.shadowRoot?.querySelectorAll("sgds-icon-button")[1] as SgdsIconButton;
    expect(el.value).to.equal(0);
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
    plusBtn?.click();
    await waitUntil(() => el.shadowRoot?.querySelector(".invalid-feedback"));
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.exist;
    expect(el.value).to.equal(1);
    plusBtn?.click();
    await el.updateComplete;
    await waitUntil(() => !el.shadowRoot?.querySelector(".invalid-feedback"));

    expect(el.value).to.equal(2);
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
  });

  it("validation happens on touch by sgds-input", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="both" min="2" value="1"></sgds-quantity-toggle>`
    );
    expect(el.invalid).to.equal(false);
    const input = el.shadowRoot?.querySelector<SgdsInput>("sgds-input");
    input?.focus();
    input?.blur();
    await input?.updateComplete;
    expect(el.invalid).to.equal(true);
  });

  it("hasFeedback=both provides error message and sgds-input hasFeedback will be set as style", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="both" invalid invalidFeedback="test"></sgds-quantity-toggle>`
    );

    expect(el.shadowRoot?.querySelector(".invalid-feedback")?.textContent).to.contain("test");
    expect(el.shadowRoot?.querySelector<SgdsInput>("sgds-input")?.hasFeedback).to.equal("style");
  });

  it("hasFeedback=text provides error message and sgds-input hasFeedback will be set as style", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="text" invalid invalidFeedback="test"></sgds-quantity-toggle>`
    );

    expect(el.shadowRoot?.querySelector(".invalid-feedback")?.textContent).to.contain("test");
    expect(el.shadowRoot?.querySelector<SgdsInput>("sgds-input")?.getAttribute("hasfeedback")).to.be.null;
  });

  it("hasFeedback=style provides error message and sgds-input hasFeedback will be set as style", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="style" invalid invalidFeedback="test"></sgds-quantity-toggle>`
    );

    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
    expect(el.shadowRoot?.querySelector<SgdsInput>("sgds-input")?.getAttribute("hasfeedback")).to.equal("style");
  });

  it("when disabled, invalid state is removed", async () => {
    const el = await fixture<SgdsInput>(
      html` <sgds-quantity-toggle invalid invalidFeedback="" hasFeedback="both"></sgds-quantity-toggle> `
    );
    expect(el.invalid).to.be.true;
    el.disabled = true;
    await el.updateComplete;
    expect(el.invalid).to.be.false;
    el.disabled = false;
    expect(el.invalid).to.be.false;
  });
});

describe("noValidate disables native and sgds validation behaviours", () => {
  it("form submission proceeds with noValidate even when min constraint is violated", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle noValidate name="qty" min="3" value="1"></sgds-quantity-toggle>
        <sgds-button type="submit">Submit</sgds-button>
      </form>
    `);
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    form.addEventListener("submit", submitHandler);

    const button = form.querySelector("sgds-button");
    button?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });

  it("clicking +/- buttons does not show invalid state when noValidate is set", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle noValidate hasFeedback="both" min="3" value="0"></sgds-quantity-toggle>`
    );
    const plusBtn = el.shadowRoot?.querySelectorAll("sgds-icon-button")[1] as SgdsIconButton;
    plusBtn?.click();
    await el.updateComplete;
    expect(el.invalid).to.be.false;
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
  });

  it("direct input change does not trigger validation when noValidate is set", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle noValidate hasFeedback="both" min="5"></sgds-quantity-toggle>`
    );
    const input = el.shadowRoot?.querySelector<SgdsInput>("sgds-input");
    input?.focus();
    await sendKeys({ press: "2" });
    input?.blur();
    await el.updateComplete;
    expect(el.invalid).to.be.false;
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
  });
});

describe("with noValidate, setInvalid(true) still works for programmatic control", () => {
  it("setInvalid(true) sets invalid state", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`
      <sgds-quantity-toggle noValidate hasFeedback="both"></sgds-quantity-toggle>
    `);
    el.setInvalid(true);
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });

  it("setInvalid(false) clears invalid state", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`
      <sgds-quantity-toggle noValidate hasFeedback="both"></sgds-quantity-toggle>
    `);
    el.setInvalid(true);
    await el.updateComplete;
    expect(el.invalid).to.be.true;

    el.setInvalid(false);
    await el.updateComplete;
    expect(el.invalid).to.be.false;
  });
});

describe("form novalidate for sgds-quantity-toggle", () => {
  it("when form has novalidate, form submission proceeds even when min constraint is violated", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-quantity-toggle name="qty" min="3" value="1"></sgds-quantity-toggle>
        <sgds-button type="submit">Submit</sgds-button>
      </form>
    `);
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    expect(form.reportValidity()).to.equal(true);
    form.addEventListener("submit", submitHandler);
    const button = form.querySelector("sgds-button");
    button?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });

  it("when form has novalidate, quantity-toggle does not show invalid state on touch", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-quantity-toggle hasFeedback="both" min="3" value="1"></sgds-quantity-toggle>
      </form>
    `);
    const el = form.querySelector<SgdsQuantityToggle>("sgds-quantity-toggle");
    const input = el?.shadowRoot?.querySelector<SgdsInput>("sgds-input");
    input?.focus();
    input?.blur();
    await el?.updateComplete;
    expect(el?.invalid).to.be.false;
  });
});

describe("reset clears invalid state when noValidate is true", () => {
  it("reset clears programmatic invalid state when component has noValidate", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle noValidate name="qty"></sgds-quantity-toggle>
        <sgds-button type="reset">Reset</sgds-button>
      </form>
    `);
    const el = form.querySelector<SgdsQuantityToggle>("sgds-quantity-toggle");
    el?.setInvalid(true);
    await el?.updateComplete;
    expect(el?.invalid).to.be.true;

    setTimeout(() => form.querySelector("sgds-button")?.click());
    await waitUntil(() => el?.invalid === false);
    expect(el?.invalid).to.be.false;
  });

  it("reset clears programmatic invalid state when form has novalidate", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form novalidate>
        <sgds-quantity-toggle name="qty"></sgds-quantity-toggle>
        <sgds-button type="reset">Reset</sgds-button>
      </form>
    `);
    const el = form.querySelector<SgdsQuantityToggle>("sgds-quantity-toggle");
    el?.setInvalid(true);
    await el?.updateComplete;
    expect(el?.invalid).to.be.true;

    setTimeout(() => form.querySelector("sgds-button")?.click());
    await waitUntil(() => el?.invalid === false);
    expect(el?.invalid).to.be.false;
  });
});

describe("setInvalid emits sgds-invalid and sgds-valid events", () => {
  it("setInvalid(true) emits sgds-invalid event", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`
      <sgds-quantity-toggle noValidate></sgds-quantity-toggle>
    `);
    const handler = sinon.spy();
    el.addEventListener("sgds-invalid", handler);

    el.setInvalid(true);
    await el.updateComplete;
    expect(handler).to.have.been.calledOnce;
  });

  it("setInvalid(false) emits sgds-valid event", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`
      <sgds-quantity-toggle noValidate></sgds-quantity-toggle>
    `);
    const handler = sinon.spy();
    el.addEventListener("sgds-valid", handler);

    el.setInvalid(false);
    await el.updateComplete;
    expect(handler).to.have.been.calledOnce;
  });

  it("setInvalid(true) followed by setInvalid(false) emits both events in order", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`
      <sgds-quantity-toggle noValidate></sgds-quantity-toggle>
    `);
    const invalidHandler = sinon.spy();
    const validHandler = sinon.spy();
    el.addEventListener("sgds-invalid", invalidHandler);
    el.addEventListener("sgds-valid", validHandler);

    el.setInvalid(true);
    await el.updateComplete;
    expect(invalidHandler).to.have.been.calledOnce;
    expect(validHandler).not.to.have.been.called;

    el.setInvalid(false);
    await el.updateComplete;
    expect(validHandler).to.have.been.calledOnce;
  });
});

describe("should still populate FormData when noValidate is enabled", () => {
  it("FormData contains the quantity-toggle value with noValidate", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle noValidate name="qty" value="7"></sgds-quantity-toggle>
        <sgds-button type="submit">Submit</sgds-button>
      </form>
    `);
    const submitHandler = sinon.spy((event: SubmitEvent) => {
      event.preventDefault();
      const formData = new FormData(form);
      expect(formData.get("qty")).to.equal("7");
    });

    form.addEventListener("submit", submitHandler);
    form.querySelector("sgds-button")?.click();
    await waitUntil(() => submitHandler.calledOnce);
    expect(submitHandler).to.have.been.calledOnce;
  });
});
