import { expect, fixture, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import { SgdsQuantityToggle } from "../src/components/QuantityToggle/sgds-quantity-toggle";

customElements.define("sgds-quantity-toggle", SgdsQuantityToggle);

describe("when minusBtn or plusBtn is clicked", () => {
  it("should decrease and increase the value by 1 respectively", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("button[aria-label^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("button[aria-label^='increase by']") as HTMLButtonElement;

    minusBtn.click();
    await el.updateComplete;

    expect(el.value).to.equal(9);

    plusBtn.click();
    await el.updateComplete;

    expect(el.value).to.equal(10);
  });
});

describe("when value change", () => {
  it("fires sgds-input event when value is entered", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    const inputEl = el.shadowRoot?.querySelector("input.form-control") as HTMLInputElement;
    const inputHandler = sinon.spy();
    inputEl.focus();
    el.addEventListener("sgds-input", inputHandler);
    await sendKeys({ press: "0" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputHandler).to.have.been.calledOnce;
  });
});

describe("when step", () => {
  it("should decrease and increase with steps", async () => {
    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle value="10" step="91"></sgds-quantity-toggle>`
    );
    const minusBtn = el.shadowRoot?.querySelector("button[aria-label^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("button[aria-label^='increase by']") as HTMLButtonElement;

    minusBtn.click();
    await el.updateComplete;

    expect(el.value).to.equal(0);

    plusBtn.click();
    await el.updateComplete;

    expect(el.value).to.equal(91);
  });
});

describe("when step changes", () => {
  it("should change aria-label accordingly", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle step="5"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("button[aria-label^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("button[aria-label^='increase by']") as HTMLButtonElement;

    expect(minusBtn).to.not.be.undefined;
    expect(minusBtn.getAttribute("aria-label")).to.equal("decrease by 5");

    expect(plusBtn.getAttribute("aria-label")).to.equal("increase by 5");
  });
});

describe("methods", () => {
  it("plus method works to increment value of quantity-toggle", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    el.plus();
    await el.updateComplete;
    expect(el.value).to.equal(11);
  });
  it("minus method works to decrement value of quantity-toggle", async () => {
    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    el.minus();
    await el.updateComplete;
    expect(el.value).to.equal(9);
  });
});

describe("in form context", () => {
  it("resets to defaultValue when reset button is clicked", async () => {
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
    await qtyToggle?.updateComplete;

    expect(qtyToggle?.value).to.equal(5);
  });
});
