import "./sgds-web-component";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import type { SgdsIconButton, SgdsInput, SgdsQuantityToggle } from "../src/components";

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
    expect(inputEl.value).to.equal("15");
  });

  it("resets value to 0 when delete the value", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="15"></sgds-quantity-toggle>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const inputHandler = sinon.spy();
    inputEl.focus();
    el.addEventListener("sgds-input", inputHandler);
    await sendKeys({ press: "Backspace" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputEl.value).to.equal("1");

    await sendKeys({ press: "Backspace" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputEl.value).to.equal("0");
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
  it("resets to defaultValue when reset sgds-button is clicked", async () => {
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
  it("input typing validation happens on change", async() => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle hasFeedback="both" min="3"></sgds-quantity-toggle>`);
    const input = el.shadowRoot?.querySelector<SgdsInput>("sgds-input")
    input?.focus()
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null
    await sendKeys({ press: "2"})
    input?.blur()

    await waitUntil(() => el.shadowRoot?.querySelector(".invalid-feedback"))
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.exist
  })
  it("validation happens as user clicks button", async() => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle hasFeedback="both"  min="2"></sgds-quantity-toggle>`);
    const plusBtn = el.shadowRoot?.querySelectorAll("sgds-icon-button")[1] as SgdsIconButton
    expect(el.value).to.equal(0)
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null
    plusBtn?.click()
    await waitUntil(() => el.shadowRoot?.querySelector(".invalid-feedback"))
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.exist
    expect(el.value).to.equal(1)
    plusBtn?.click()
    await el.updateComplete
    await waitUntil(() => !el.shadowRoot?.querySelector(".invalid-feedback"))

    expect(el.value).to.equal(2)
    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null
  })
});
