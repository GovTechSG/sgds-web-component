import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import sinon from "sinon";
import { SgdsTile } from "../src/components";
import "../src/index";

describe("<sgds-tile>", () => {
  it("renders a tile with the base structure", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile>
      <span slot="icon">icon</span>
      <span slot="title">Title</span>
      <span slot="description">Description</span>
    </sgds-tile>`);

    const tile = el.shadowRoot!.querySelector(".tile");
    expect(tile).to.exist;

    const container = tile!.querySelector(".tile-container");
    expect(container).to.exist;

    const textGroup = container!.querySelector(".tile-text");
    expect(textGroup).to.exist;
  });

  it("has an icon slot", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile>
      <span slot="icon">icon</span>
    </sgds-tile>`);

    const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
    expect(iconSlot).to.exist;
  });

  it("has a title slot", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile>
      <span slot="title">Title</span>
    </sgds-tile>`);

    const titleSlot = el.shadowRoot!.querySelector('slot[name="title"]');
    expect(titleSlot).to.exist;
  });

  it("applies disabled class when disabled is true", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile disabled></sgds-tile>`);

    const tile = el.shadowRoot!.querySelector(".tile");
    expect(tile).to.have.class("disabled");
  });

  it("does not have disabled class by default", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile></sgds-tile>`);

    const tile = el.shadowRoot!.querySelector(".tile");
    expect(tile).to.not.have.class("disabled");
  });

  it("renders sgds-checkbox when variant is checkbox", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox"></sgds-tile>`);

    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox");
    expect(checkbox).to.exist;
  });

  it("renders sgds-radio when variant is radio", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="radio"></sgds-tile>`);

    const radio = el.shadowRoot!.querySelector("sgds-radio");
    expect(radio).to.exist;
  });

  it("does not render an input by default", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile></sgds-tile>`);

    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox");
    const radio = el.shadowRoot!.querySelector("sgds-radio");
    expect(checkbox).to.not.exist;
    expect(radio).to.not.exist;
  });

  it("has a description slot", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile>
      <span slot="description">Desc</span>
    </sgds-tile>`);

    const descSlot = el.shadowRoot!.querySelector('slot[name="description"]');
    expect(descSlot).to.exist;
  });

  it("clicking the tile toggles the checkbox", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox"></sgds-tile>`);
    await el.updateComplete;

    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox") as any;
    await checkbox.updateComplete;

    expect(checkbox.checked).to.be.false;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    tile.click();
    await el.updateComplete;
    await checkbox.updateComplete;

    expect(checkbox.checked).to.be.true;
  });

  it("clicking the tile toggles the radio", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="radio"></sgds-tile>`);
    await el.updateComplete;

    const radio = el.shadowRoot!.querySelector("sgds-radio") as any;
    await radio.updateComplete;

    expect(radio.checked).to.be.false;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    tile.click();
    await el.updateComplete;
    await radio.updateComplete;

    expect(radio.checked).to.be.true;
  });

  it("forwards checked prop to checkbox on first load", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox" checked></sgds-tile>`);
    await el.updateComplete;

    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox") as any;
    await checkbox.updateComplete;

    expect(checkbox.checked).to.be.true;
  });

  it("forwards checked prop to radio on first load", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="radio" checked></sgds-tile>`);
    await el.updateComplete;

    const radio = el.shadowRoot!.querySelector("sgds-radio") as any;
    await radio.updateComplete;

    expect(radio.checked).to.be.true;
  });

  it("clicking a disabled tile does not toggle the checkbox", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox" disabled></sgds-tile>`);
    await el.updateComplete;

    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox") as any;
    await checkbox.updateComplete;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    tile.click();
    await el.updateComplete;
    await checkbox.updateComplete;

    expect(checkbox.checked).to.be.false;
  });

  // Keyboard navigation tests
  it("tile is focusable with tabindex 0", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox"></sgds-tile>`);
    await el.updateComplete;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    expect(tile.getAttribute("tabindex")).to.equal("0");
  });

  it("disabled tile has tabindex -1", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox" disabled></sgds-tile>`);
    await el.updateComplete;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    expect(tile.getAttribute("tabindex")).to.equal("-1");
  });

  it("internal checkbox has tabindex -1", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox"></sgds-tile>`);
    await el.updateComplete;

    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox") as any;
    await checkbox.updateComplete;

    expect(checkbox.getAttribute("tabindex")).to.equal("-1");
  });

  it("internal radio has tabindex -1", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="radio"></sgds-tile>`);
    await el.updateComplete;

    const radio = el.shadowRoot!.querySelector("sgds-radio") as any;
    await radio.updateComplete;

    expect(radio.getAttribute("tabindex")).to.equal("-1");
  });

  it("pressing Enter toggles the checkbox", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox"></sgds-tile>`);
    await el.updateComplete;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox") as any;
    await checkbox.updateComplete;

    tile.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await el.updateComplete;
    await checkbox.updateComplete;

    expect(checkbox.checked).to.be.true;
  });

  it("pressing Enter toggles the radio", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="radio"></sgds-tile>`);
    await el.updateComplete;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    const radio = el.shadowRoot!.querySelector("sgds-radio") as any;
    await radio.updateComplete;

    tile.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await el.updateComplete;
    await radio.updateComplete;

    expect(radio.checked).to.be.true;
  });

  it("pressing Enter on a disabled tile does not toggle the checkbox", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="checkbox" disabled></sgds-tile>`);
    await el.updateComplete;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    const checkbox = el.shadowRoot!.querySelector("sgds-checkbox") as any;
    await checkbox.updateComplete;

    tile.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    await el.updateComplete;
    await checkbox.updateComplete;

    expect(checkbox.checked).to.be.false;
  });

  // Stacked layout tests
  it("applies stacked class when stacked is true", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile stacked></sgds-tile>`);
    await el.updateComplete;

    const container = el.shadowRoot!.querySelector(".tile-container");
    expect(container).to.have.class("stacked");
  });

  it("does not have stacked class by default", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile></sgds-tile>`);
    await el.updateComplete;

    const container = el.shadowRoot!.querySelector(".tile-container");
    expect(container).to.not.have.class("stacked");
  });

  // Switch variant tests
  it("renders sgds-switch when variant is switch", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="switch"></sgds-tile>`);
    await el.updateComplete;

    const sw = el.shadowRoot!.querySelector("sgds-switch");
    expect(sw).to.exist;
  });

  it("clicking the tile toggles the switch", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="switch"></sgds-tile>`);
    await el.updateComplete;

    const sw = el.shadowRoot!.querySelector("sgds-switch") as any;
    await sw.updateComplete;

    expect(el.checked).to.be.false;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    tile.click();
    await el.updateComplete;
    await sw.updateComplete;

    expect(el.checked).to.be.true;
  });

  it("switch tile emits sgds-change with checked detail", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="switch"></sgds-tile>`);
    await el.updateComplete;

    const handler = sinon.spy();
    el.addEventListener("sgds-change", handler);

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    tile.click();
    await el.updateComplete;

    expect(handler).to.have.been.calledOnce;
    expect(handler.firstCall.args[0].detail.checked).to.be.true;
  });

  it("clicking a disabled switch tile does not toggle", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="switch" disabled></sgds-tile>`);
    await el.updateComplete;

    const tile = el.shadowRoot!.querySelector(".tile") as HTMLElement;
    tile.click();
    await el.updateComplete;

    expect(el.checked).to.be.false;
  });

  it("forwards checked prop to switch on first load", async () => {
    const el = await fixture<SgdsTile>(html`<sgds-tile variant="switch" checked></sgds-tile>`);
    await el.updateComplete;

    const sw = el.shadowRoot!.querySelector("sgds-switch") as any;
    await sw.updateComplete;

    expect(sw.checked).to.be.true;
  });

  it("does not show dev warning for standalone switch tile", async () => {
    const warnSpy = sinon.spy(console, "warn");
    await fixture<SgdsTile>(html`<sgds-tile variant="switch"></sgds-tile>`);
    expect(warnSpy).to.not.have.been.called;
    warnSpy.restore();
  });
});
