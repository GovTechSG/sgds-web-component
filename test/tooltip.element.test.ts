import "./sgds-web-component";
import { assert, expect, fixture, nextFrame, oneEvent, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import { SgdsTooltip, SgdsButton } from "../src/components";
import { sendMouse } from "@web/test-runner-commands";

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

    const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;

    expect(el.shadowRoot?.querySelector(".tooltip")).not.to.be.null;
    expect(tooltip).to.have.text("hello");
  });

  it("when trigger=click, clicking outside of the element will trigger it to close", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip trigger="click" content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip"));
    expect(el.shadowRoot?.querySelector("div.tooltip")).to.have.text("hello");

    await sendMouse({ type: "click", position: [0, 0] });
    await el.updateComplete;
    await waitUntil(() => !el.shadowRoot?.querySelector(".tooltip"));
    expect(el.shadowRoot?.querySelector(".tooltip")).to.be.null;
  });

  it("placement props updates tooltipConfig", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip trigger="click" content="hello" placement="bottom"
        ><sgds-button>Hover me</sgds-button></sgds-tooltip
      >`
    );
    (el.querySelector("sgds-button") as SgdsButton).click();
    await el.updateComplete;

    const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;
    await waitUntil(() => tooltip.getAttribute("data-placement") !== null);

    expect(tooltip).to.have.attribute("data-placement", "bottom");
  });

  it("fires sgds-show and sgds-after-show when tooltip opens", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );

    setTimeout(() => el.show());
    const showEvent = await oneEvent(el, "sgds-show");
    expect(showEvent).to.exist;

    const afterShowEvent = await oneEvent(el, "sgds-after-show");
    expect(afterShowEvent).to.exist;

    const tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;
    // await waitUntil(() => tooltip.getAttribute("data-placement") !== null);

    expect(tooltip).to.have.text("hello");
    expect(tooltip).not.to.be.null;
  });

  it("fires sgds-show before sgds-after-show", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );

    const firedEvents: string[] = [];

    el.addEventListener("sgds-show", () => firedEvents.push("sgds-show"));
    el.addEventListener("sgds-after-show", () => firedEvents.push("sgds-after-show"));

    await el.show();

    // Wait a frame for events to flush
    await nextFrame();

    expect(firedEvents).to.deep.equal(["sgds-show", "sgds-after-show"]);
  });

  it("fires sgds-hide and sgds-after-hide when menu closes", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );

    await el.show();

    let tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip")?.getAttribute("data-placement") !== null);

    expect(tooltip).to.have.text("hello");
    expect(tooltip).not.to.be.null;

    setTimeout(() => el.hide());

    const hideEvent = await oneEvent(el, "sgds-hide");
    expect(hideEvent).to.exist;

    const afterHideEvent = await oneEvent(el, "sgds-after-hide");
    expect(afterHideEvent).to.exist;

    tooltip = el.shadowRoot?.querySelector(".tooltip") as HTMLElement;
    expect(tooltip).to.be.null;
  });

  it("fires sgds-hide before sgds-after-hide", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );

    await el.show();

    const firedEvents: string[] = [];
    el.addEventListener("sgds-hide", () => firedEvents.push("sgds-hide"));
    el.addEventListener("sgds-after-hide", () => firedEvents.push("sgds-after-hide"));

    el.hide();

    // wait for the setTimeout in hide()
    await new Promise(r => setTimeout(r, 0));

    expect(firedEvents).to.deep.equal(["sgds-hide", "sgds-after-hide"]);
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
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip"));
    expect(el.shadowRoot?.querySelector(".tooltip")).not.to.be.null;
  });
  it("hide method makes tooltip disappear in document", async () => {
    const el = await fixture<SgdsTooltip>(
      html`<sgds-tooltip content="hello"><sgds-button>Hover me</sgds-button></sgds-tooltip>`
    );
    el.show();
    await el.updateComplete;
    await waitUntil(() => el.shadowRoot?.querySelector(".tooltip"));
    expect(el.shadowRoot?.querySelector(".tooltip")).not.to.be.null;
    el.hide();
    await el.updateComplete;
    await waitUntil(() => !el.shadowRoot?.querySelector(".tooltip"));
    expect(el.shadowRoot?.querySelector(".tooltip")).to.be.null;
  });
});
