import "./sgds-web-component";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { html } from "lit";
import sinon from "sinon";
import { SgdsIconButton, SgdsInput, SgdsQuantityToggle } from "../src/components";
import Sinon from "sinon";

describe("when minusBtn or plusBtn is clicked", () => {
  it("should decrease and increase the value by 1 respectively", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='increase by']") as HTMLButtonElement;

    minusBtn.click();
    await waitUntil(() => el.value === 9);
    expect(el.value).to.equal(9);

    plusBtn.click();
    await waitUntil(() => el.value === 10);
    expect(el.value).to.equal(10);

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("minusBtn is disabled when reaches 0 without minimum value set", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="1"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;

    minusBtn.click();
    await waitUntil(() => el.value === 0);

    expect(el.value).to.equal(0);
    expect(minusBtn.hasAttribute("disabled")).to.be.true;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("minusBtn is disabled when reaches minimum value", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

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

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("minusBtn is disabled when reaches maximum value", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle value="10" max="11"></sgds-quantity-toggle>`
    );
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='increase by']") as HTMLButtonElement;

    plusBtn.click();
    await waitUntil(() => el.value === 11);

    expect(el.value).to.equal(11);
    expect(plusBtn.hasAttribute("disabled")).to.be.true;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
});

describe("when value change", () => {
  it("fires sgds-input event when value is entered", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    const inputEl = el.shadowRoot?.querySelector("sgds-input") as SgdsInput;
    const inputHandler = sinon.spy();
    inputEl.focus();
    el.addEventListener("sgds-input", inputHandler);
    await sendKeys({ press: "0" });
    waitUntil(() => inputHandler.calledOnce);
    expect(inputHandler).to.have.been.calledOnce;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("prevent from entering special characters", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

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

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("resets value to 0 when delete the value", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

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

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
});

describe("when step", () => {
  it("should decrease and increase with steps", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

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

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
});

describe("when step changes", () => {
  it("should change arialabel accordingly", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle step="5"></sgds-quantity-toggle>`);
    const minusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='decrease by']") as HTMLButtonElement;
    const plusBtn = el.shadowRoot?.querySelector("sgds-icon-button[arialabel^='increase by']") as HTMLButtonElement;

    expect(minusBtn).to.not.be.undefined;
    expect(minusBtn.getAttribute("arialabel")).to.equal("decrease by 5");

    expect(plusBtn.getAttribute("arialabel")).to.equal("increase by 5");

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
});

describe("methods", () => {
  it("plus method works to increment value of quantity-toggle", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    el.plus();
    await waitUntil(() => el.value === 11);
    expect(el.value).to.equal(11);

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("minus method works to decrement value of quantity-toggle", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(html`<sgds-quantity-toggle value="10"></sgds-quantity-toggle>`);
    el.minus();
    await waitUntil(() => el.value === 9);
    expect(el.value).to.equal(9);

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
});

describe("in form context", () => {
  it("resets to defaultValue when reset sgds-icon-button is clicked", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

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

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("valid when quantity toggle has no contraints", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle name="a" value="5"></sgds-quantity-toggle>
      </form>
    `);
    expect(form.reportValidity()).to.be.true;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("valid when passes min max validation", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle name="a" max="6" min="3" value="5"></sgds-quantity-toggle>
      </form>
    `);
    expect(form.reportValidity()).to.be.true;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("invalid when fails min max validation", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-quantity-toggle name="a" max="6" min="3" value="7"></sgds-quantity-toggle>
      </form>
    `);
    expect(form.reportValidity()).to.be.false;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("input typing validation happens on change", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

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

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("validation happens as user clicks button", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

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

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("validation happens on touch by sgds-input", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="both" min="2" value="1"></sgds-quantity-toggle>`
    );
    expect(el.invalid).to.equal(false);
    const input = el.shadowRoot?.querySelector<SgdsInput>("sgds-input");
    input?.focus();
    input?.blur();
    await input?.updateComplete;
    expect(el.invalid).to.equal(true);

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("hasFeedback=both provides error message and sgds-input hasFeedback will be set as style", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="both" invalid invalidFeedback="test"></sgds-quantity-toggle>`
    );

    expect(el.shadowRoot?.querySelector(".invalid-feedback")?.textContent).to.contain("test");
    expect(el.shadowRoot?.querySelector<SgdsInput>("sgds-input")?.hasFeedback).to.equal("style");

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("hasFeedback=text provides error message and sgds-input hasFeedback will be set as style", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="text" invalid invalidFeedback="test"></sgds-quantity-toggle>`
    );

    expect(el.shadowRoot?.querySelector(".invalid-feedback")?.textContent).to.contain("test");
    expect(el.shadowRoot?.querySelector<SgdsInput>("sgds-input")?.getAttribute("hasfeedback")).to.be.null;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("hasFeedback=style provides error message and sgds-input hasFeedback will be set as style", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsQuantityToggle>(
      html`<sgds-quantity-toggle hasFeedback="style" invalid invalidFeedback="test"></sgds-quantity-toggle>`
    );

    expect(el.shadowRoot?.querySelector(".invalid-feedback")).to.be.null;
    expect(el.shadowRoot?.querySelector<SgdsInput>("sgds-input")?.getAttribute("hasfeedback")).to.equal("style");

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("when disabled, invalid state is removed", async () => {
    // Mock fetch to prevent network requests
    const mockSvg = "<svg></svg>";
    const fetchStub = Sinon.stub(window, "fetch").callsFake(() =>
      Promise.resolve(new Response(mockSvg, { status: 200, headers: { "Content-Type": "image/svg+xml" } }))
    );

    const el = await fixture<SgdsInput>(
      html` <sgds-quantity-toggle invalid invalidFeedback="" hasFeedback></sgds-quantity-toggle> `
    );
    expect(el.invalid).to.be.true;
    el.disabled = true;
    await el.updateComplete;
    expect(el.invalid).to.be.false;
    el.disabled = false;
    expect(el.invalid).to.be.false;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
});
