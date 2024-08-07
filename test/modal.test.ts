import "./sgds-web-component";
import type { SgdsModal } from "../src/components";
import { expect, fixture, waitUntil, assert } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import { html } from "lit";

describe("<sgds-modal>", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsModal>(html`<sgds-modal></sgds-moadl>`);
    assert.shadowDom.equal(
      el,
      `
   <div
       class="modal"
       hidden=""
       part="base"
     >
        <div
          class="modal-overlay"
          part="overlay"
        >
        </div>
        <div
          aria-hidden="true"
          aria-labelledby="title"
          aria-modal="true"
          class="modal-panel"
          part="panel"
          role="dialog"
          tabindex="-1"
        >
          <div
            class="modal-header"
            part="header"
          >
            <h3
              class="modal-title"
              id="title"
              part="title"
              tabindex="-1"
            >
            </h3>
            <button
              aria-label="close modal"
              class="btn-close btn-sm modal-close"
            >
            </button>
          </div>
          <div
            class="modal-body"
            part="body"
          >
            <slot>
            </slot>
          </div>
          <footer
            class="modal-footer"
            part="footer"
          >
            <slot name="footer">
            </slot>
          </footer>
        </div>
      </div>
    `
    );
  });
  it("should be visible with the open attribute", async () => {
    const el = await fixture<SgdsModal>(html`
      <sgds-modal open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sgds-modal>
    `);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[part="base"]');

    expect(base?.hidden).to.be.false;
  });

  it("should not be visible without the open attribute", async () => {
    const el = await fixture<SgdsModal>(
      html` <sgds-modal>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sgds-modal> `
    );
    const base = el.shadowRoot?.querySelector<HTMLElement>('[part="base"]');

    expect(base?.hidden).to.be.true;
  });

  it("should emit sgds-show and sgds-after-show when calling show()", async () => {
    const el = await fixture<SgdsModal>(html`
      <sgds-modal>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sgds-modal>
    `);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[part="base"]');
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", afterShowHandler);
    el.show();

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(base?.hidden).to.be.false;
  });

  it("should emit sgds-hide and sgds-after-hide when calling hide()", async () => {
    const el = await fixture<SgdsModal>(html`
      <sgds-modal open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sgds-modal>
    `);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[part="base"]');
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", afterHideHandler);
    el.hide();

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(base?.hidden).to.be.true;
  });

  it("should emit sgds-show and sgds-after-show when setting open = true", async () => {
    const el = await fixture<SgdsModal>(html`
      <sgds-modal>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sgds-modal>
    `);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[part="base"]');
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(base?.hidden).to.be.false;
  });

  it("should emit sgds-hide and sgds-after-hide when setting open = false", async () => {
    const el = await fixture<SgdsModal>(html`
      <sgds-modal open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sgds-modal>
    `);
    const base = el.shadowRoot?.querySelector<HTMLElement>('[part="base"]');
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(base?.hidden).to.be.true;
  });

  it("should not close when sgds-close is prevented", async () => {
    const el = await fixture<SgdsModal>(html`
      <sgds-modal open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</sgds-modal>
    `);
    const overlay = el.shadowRoot?.querySelector<HTMLElement>('[part="overlay"]');

    el.addEventListener("sgds-close", event => {
      event.preventDefault();
    });
    overlay?.click();

    expect(el.open).to.be.true;
  });

  it("should close when pressing Escape", async () => {
    const el = await fixture<SgdsModal>(html` <sgds-modal open></sgds-modal> `);
    const hideHandler = sinon.spy();

    el.addEventListener("sgds-hide", hideHandler);

    await sendKeys({ press: "Escape" });
    await waitUntil(() => hideHandler.calledOnce);

    expect(el.open).to.be.false;
  });

  it("centered prop adds .centered to .modal", async () => {
    const el = await fixture<SgdsModal>(html` <sgds-modal centered></sgds-modal> `);
    expect(el.shadowRoot?.querySelector(".modal")).to.have.class("centered");
  });

  it("noCloseButton prop removes button from modal", async () => {
    const el = await fixture<SgdsModal>(html`<sgds-modal noCloseButton></sgds-modal>`);
    expect(el.shadowRoot.querySelector("button.btn-close")).to.be.null;
  });
});
