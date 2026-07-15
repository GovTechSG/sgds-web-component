import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
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
});