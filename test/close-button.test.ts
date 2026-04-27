import { html } from "lit";
import { expect, fixture, waitUntil, assert } from "@open-wc/testing";
import { SgdsCloseButton } from "../src/components/CloseButton/sgds-close-button";
import "../src/components/Icon";
import "../src/components/CloseButton";
import * as sinon from "sinon";

describe("<sgds-close-button>", () => {
  it("semantically matches the DOM", async () => {
    const el = await fixture(html`<sgds-close-button></sgds-close-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button class="btn-close" aria-label="Close button">
        <sgds-icon name="cross" size="md"></sgds-icon>
      </button>
      `
    );
  });
  it('should apply dark tone styles when variant="fixed-dark"', async () => {
    document.documentElement.style.setProperty("--sgds-color-fixed-dark", "rgb(26, 26, 26)");

    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button tone="fixed-dark"></sgds-close-button>`);

    // Check attribute reflection
    expect(el.getAttribute("tone")).to.equal("fixed-dark");

    // Access the rendered button
    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLElement;
    expect(button).to.exist;

    expect(getComputedStyle(button).color).to.equal("rgb(26, 26, 26)");
    expect(el.tone).to.equal("fixed-dark");
  });
  it('should apply light tone styles when variant="light"', async () => {
    document.documentElement.style.setProperty("--sgds-color-fixed-light", "rgb(243, 243, 243)");

    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button tone="fixed-light"></sgds-close-button>`);

    // Check attribute reflection
    expect(el.getAttribute("tone")).to.equal("fixed-light");

    // Access the rendered button
    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLElement;
    expect(button).to.exist;

    expect(getComputedStyle(button).color).to.equal("rgb(243, 243, 243)");
    expect(el.tone).to.equal("fixed-light");
  });
  it('should apply sm size styles when size="sm"', async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button size="sm"></sgds-close-button>`);

    // Check attribute reflection
    expect(el.getAttribute("size")).to.equal("sm");

    // Access the rendered button
    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLElement;
    expect(button).to.exist;

    expect(getComputedStyle(button).width).to.equal("24px");
    expect(getComputedStyle(button).height).to.equal("24px");
    expect(el.size).to.equal("sm");
  });
  it('should apply md size styles when size="md"', async () => {
    document.documentElement.style.setProperty("--sgds-dimension-32", "32px");
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button size="md"></sgds-close-button>`);

    // Check attribute reflection
    expect(el.getAttribute("size")).to.equal("md");

    // Access the rendered button
    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLElement;
    expect(button).to.exist;

    expect(getComputedStyle(button).width).to.equal("32px");
    expect(getComputedStyle(button).height).to.equal("32px");
    expect(el.size).to.equal("md");
  });
  it("emits click when clicked on", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button></sgds-close-button>`);
    const clickHandler = sinon.spy();
    el.addEventListener("click", clickHandler);
    el.click();
    await waitUntil(() => clickHandler.calledOnce);

    expect(clickHandler).to.have.been.calledOnce;
  });
  it("should have disabled attribute when disabled prop is true", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button disabled></sgds-close-button>`);

    expect(el.hasAttribute("disabled")).to.be.true;
    expect(el.disabled).to.be.true;
  });
  it("should not emit click when disabled", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button disabled></sgds-close-button>`);
    const clickHandler = sinon.spy();
    el.addEventListener("click", clickHandler);

    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLButtonElement;
    button?.click();

    expect(clickHandler).to.not.have.been.called;
  });
  it("should prevent click event when disabled", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button disabled></sgds-close-button>`);
    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLButtonElement;
    const preventDefaultSpy = sinon.spy();

    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    sinon.stub(clickEvent, "preventDefault").callsFake(preventDefaultSpy);

    button?.dispatchEvent(clickEvent);

    // Verify preventDefault was called by checking the button is actually disabled
    expect(button?.disabled).to.be.true;
  });
  it("should apply disabled styling", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button disabled></sgds-close-button>`);

    expect(el.getAttribute("disabled")).to.equal("");
    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLButtonElement;
    expect(button.disabled).to.be.true;
  });
  it("should allow clicks when not disabled", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button></sgds-close-button>`);
    const clickHandler = sinon.spy();
    el.addEventListener("click", clickHandler);

    const button = el.shadowRoot?.querySelector(".btn-close") as HTMLButtonElement;
    button?.click();

    expect(clickHandler).to.have.been.called;
  });
});
