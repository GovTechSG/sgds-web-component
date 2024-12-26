import { html } from "lit";
import { expect, fixture, waitUntil, assert } from "@open-wc/testing";
import { SgdsCloseButton } from "../src/internals/CloseButton/sgds-close-button";
import "../src/internals/CloseButton";
import * as sinon from "sinon";

describe("<sgds-close-button>", () => {
  it("semantically matches the DOM", async () => {
    const el = await fixture(html`<sgds-close-button></sgds-close-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button class="btn-close btn-close-md" aria-label="Close button">
        <sgds-icon name="cross" size="md"></sgds-icon>
      </button>
      `
    );
  });
  it("variant=dark adds a .btn-close-dark ", async () => {
    const el = await fixture(html`<sgds-close-button variant="dark"></sgds-close-button>`);
    const btnClose = el.shadowRoot?.querySelector(".btn-close");
    expect(btnClose?.classList.value).to.contain("btn-close-dark");
  });
  it("variant=light adds a .btn-close-dark ", async () => {
    const el = await fixture(html`<sgds-close-button variant="light"></sgds-close-button>`);
    const btnClose = el.shadowRoot?.querySelector(".btn-close");
    expect(btnClose?.classList.value).to.contain("btn-close-light");
  });
  it("size=sm adds a .btn-close-sm ", async () => {
    const el = await fixture(html`<sgds-close-button size="sm"></sgds-close-button>`);
    const btnClose = el.shadowRoot?.querySelector(".btn-close");
    expect(btnClose?.classList.value).to.contain("btn-close-sm");
  });
  it("emits click when clicked on", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button></sgds-close-button>`);
    const clickHandler = sinon.spy();
    el.addEventListener("click", clickHandler);
    el.click();
    await waitUntil(() => clickHandler.calledOnce);

    expect(clickHandler).to.have.been.calledOnce;
  });
});
