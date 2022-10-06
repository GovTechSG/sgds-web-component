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

  it("should be disabled with the disabled attribute", async () => {
    const el = await fixture(html`<sgds-checkbox disabled></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.disabled).to.be.true;
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

  it("should have input aria-checked false by default", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox></sgds-checkbox>`
    );
    const checkbox = el.shadowRoot!.querySelector("input");

    expect(checkbox!).to.have.attribute("aria-checked", "false");
  });

  it("should show aria-checked to be true when checked is true", async () => {
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
    expect(checkbox).to.have.attribute("aria-checked", "true");
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
