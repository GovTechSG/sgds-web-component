import "./sgds-web-component";
import { assert, expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import { SgdsTooltip, SgdsButton } from "../src/components";
import { sendMouse } from "@web/test-runner-commands";
import sinon from "sinon";

describe("sgds-tooltip", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-tooltip");
    assert.instanceOf(el, SgdsTooltip);
  });

  // it("can be semantically compare with shadowDom trees", async () => {
  //   const el = await fixture(html`<sgds-tooltip></sgds-tooltip>`);
  //   assert.shadowDom.equal(
  //     el,
  //     `  <div data-bs-original-title="" title="">
  //       <slot>
  //       </slot>
  //      </div>
  //   `
  //   );
  // });

  it("tooltip is triggered via hover by default", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    //hovering the button
    await sendMouse({ type: "move", position: [50, 10] });
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector("div.tooltip"));
    expect(el.shadowRoot?.querySelector("div.tooltip-inner")).to.have.text("hello");
    // default placement is top
    expect(el.shadowRoot?.querySelector("div.tooltip")).to.have.attribute("data-popper-placement", "top");
  });

  it("when trigger=click, clicking outside of the element will trigger it to close", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip trigger="click" content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip-inner"));
    expect(el.shadowRoot?.querySelector("div.tooltip-inner")).to.have.text("hello");

    await sendMouse({ type: "click", position: [0, 0] });
    await el.updateComplete;
    await waitUntil(() => !el.shadowRoot?.querySelector(".tooltip-inner"));
    expect(el.shadowRoot?.querySelector(".tooltip-inner")).to.be.null;
  });

  it("placement props updates tooltipConfig", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip trigger="click" content="hello" placement="bottom"
        ><sgds-button>Hover me</sgds-button></sgds-tooltip
      >`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip-inner"));
    expect(el.shadowRoot?.querySelector("div.tooltip")).to.have.attribute("data-popper-placement", "bottom");
  });

  it("when tooltip is shown, sgds-show followed by sgds-after-show events are emitted", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );

    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();
    el.addEventListener("sgds-show", showHandler);
    el.addEventListener("sgds-after-show", afterShowHandler);
    //hovering the button
    await sendMouse({ type: "move", position: [50, 10] });
    await el.updateComplete;
    expect(showHandler).to.be.calledOnce;
    await waitUntil(() => afterShowHandler.called);
    expect(afterShowHandler).to.be.calledAfter(showHandler);
  });
  it("when tooltip is hidden, sgds-hide followed by sgds-after-hide events are emitted", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );

    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();
    el.addEventListener("sgds-hide", hideHandler);
    el.addEventListener("sgds-after-hide", afterHideHandler);
    //hovering the button
    await sendMouse({ type: "move", position: [50, 10] });
    await el.updateComplete;
    // remove mouse hover
    await sendMouse({ type: "move", position: [0, 0] });
    await el.updateComplete;

    expect(hideHandler).to.be.calledOnce;
    await waitUntil(() => afterHideHandler.called);
    expect(afterHideHandler).to.be.calledAfter(hideHandler);
  });
});

describe("Tooltip a11y", () => {
  it("data-sgds-tooltip is added to element passed to default slot of tooltip", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    expect(el.querySelector("sgds-button")).to.have.attribute("data-sgds-tooltip", "hello");
  });
  it("data-sgds-tooltip is added to all elements passed to default slot of tooltip", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello">
        <sgds-button>Hover me</sgds-button>
        <span></span>
      </sgds-tooltip>`
    );
    expect(el.querySelector("sgds-button")).to.have.attribute("data-sgds-tooltip", "hello");
    expect(el.querySelector("span")).to.have.attribute("data-sgds-tooltip", "hello");
  });
});

describe("Tooltip methods", () => {
  it("show method makes tooltip appear in document", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    el.show();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip-inner"));
    expect(el.shadowRoot?.querySelector(".tooltip-inner")).not.to.be.null;
  });
  it("hide method makes tooltip disappear in document", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    el.show();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip-inner"));
    expect(el.shadowRoot?.querySelector(".tooltip-inner")).not.to.be.null;
    el.hide();
    await el.updateComplete;
    await waitUntil(() => !el.shadowRoot?.querySelector(".tooltip-inner"));
    expect(el.shadowRoot?.querySelector(".tooltip-inner")).to.be.null;
  });
});
