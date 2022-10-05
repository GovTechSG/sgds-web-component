import {
  aTimeout,
  expect,
  fixture,
  html,
  oneEvent,
  assert,
  waitUntil,
} from "@open-wc/testing";
import sinon from "sinon";
import "../src/Checkbox/";
import { SgdsCheckbox } from "../src/Checkbox/";

describe("<sgds-checkbox>", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-checkbox");
    assert.instanceOf(el, SgdsCheckbox);
  });

  it("should have aria-checked false by default", async () => {
    const el = await fixture(html`<sgds-checkbox></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.getAttribute("aria-checked")).to.equal(false);
  });

  it("should be disabled with the disabled attribute", async () => {
    const el = await fixture(html`<sgds-checkbox disabled></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.disabled).to.be.true;
  });

  it("should support inline", async () => {
    const el = await fixture(html`<sgds-checkbox isInline></sgds-checkbox>`);
    const container = el.shadowRoot?.querySelector("label");
    expect(container?.classList.value).to.contain("form-check-inline");
  });

  it("should click the inner input", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot!.querySelector("input")!;
    const clickSpy = sinon.spy();

    checkbox.addEventListener("click", clickSpy, { once: true });

    el.click();
    await el.updateComplete;

    expect(clickSpy.called).to.equal(true);
    expect(el.checked).to.equal(true);
  });

  //   it("should focus the inner input", async () => {
  //     const el = await fixture<SgdsCheckbox>(html`<sl-checkbox></sl-checkbox>`);
  //     const checkbox = el.shadowRoot!.querySelector("input")!;
  //     const focusSpy = sinon.spy();

  //     checkbox.addEventListener("focus", focusSpy, { once: true });

  //     el.focus();
  //     await el.updateComplete;

  //     expect(focusSpy.called).to.equal(true);
  //     expect(el.shadowRoot!.activeElement).to.equal(checkbox);
  //   });
});
