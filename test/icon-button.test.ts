import { html } from "lit";
import { assert, expect, fixture } from "@open-wc/testing";
import { SgdsIconButton } from "../src/components";
import "../src/index";

describe("<sgds-icon-button>", () => {
  it("semantically matches the DOM", async () => {
    const el = await fixture<SgdsIconButton>(
      html`<sgds-icon-button><sgds-icon name="placeholder"></sgds-icon></sgds-icon-button>`
    );
    assert.shadowDom.equal(
      el,
      `
      <button
      aria-disabled="false"
      class="btn btn-icon btn-primary btn-md"
      tabindex="0"
      type="button">
        <slot></slot>
      </button>
      `
    );
  });

  it("renders an anchor tag when href is provided", async () => {
    const el = await fixture<SgdsIconButton>(
      html`<sgds-icon-button href="https://example.com"><sgds-icon name="placeholder"></sgds-icon></sgds-icon-button>`
    );
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.exist;
    expect(anchorTag).to.have.attribute("href", "https://example.com");
    expect(anchorTag).to.have.attribute("role", "button");
    expect(anchorTag).not.to.have.attribute("type", "button");
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  });

  it("applies correct attributes when rendering an anchor tag", async () => {
    const el = await fixture(
      html`<sgds-icon-button href="https://example.com" target="_blank" download="example.pdf">
        <sgds-icon name="placeholder"></sgds-icon>
      </sgds-icon-button>`
    );
    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor).to.have.attribute("href", "https://example.com");
    expect(anchor).to.have.attribute("target", "_blank");
    expect(anchor).to.have.attribute("download", "example.pdf");
    expect(anchor).to.have.attribute("rel", "noreferrer noopener");
  });

  it("applies the correct classes for size and variant", async () => {
    const el = await fixture<SgdsIconButton>(
      html`<sgds-icon-button size="lg" variant="primary"><sgds-icon name="placeholder"></sgds-icon></sgds-icon-button>`
    );
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.class("btn-icon");
    expect(button).to.have.class("btn-primary");
    expect(button).to.have.class("btn-lg");
  });

  it("sets disabled attribute correctly", async () => {
    const el = await fixture<SgdsIconButton>(
      html`<sgds-icon-button disabled><sgds-icon name="placeholder"></sgds-icon></sgds-icon-button>`
    );
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("disabled");
    expect(button).to.have.attribute("aria-disabled", "true");
  });

  it("renders slotted content correctly", async () => {
    const el = await fixture(html`<sgds-icon-button><sgds-icon name="placeholder"></sgds-icon></sgds-icon-button>`);
    const slotContent = el.querySelector("sgds-icon");
    expect(slotContent).to.exist;
  });

  it("does not allow interaction when disabled", async () => {
    const el = await fixture(
      html`<sgds-icon-button disabled><sgds-icon name="placeholder"></sgds-icon></sgds-icon-button>`
    );
    const button = el.shadowRoot?.querySelector("button");
    expect(button).attribute("tabindex").to.equal("-1");

    let clicked = false;
    el.addEventListener("click", () => (clicked = true));
    button?.click();
    expect(clicked).to.be.false;
  });

  it("handles focus and blur events", async () => {
    const el = await fixture(html`<sgds-icon-button><sgds-icon name="placeholder"></sgds-icon></sgds-icon-button>`);
    const button = el.shadowRoot?.querySelector("button");
    let focused = false;
    let blurred = false;
    el.addEventListener("sgds-focus", () => (focused = true));
    el.addEventListener("sgds-blur", () => (blurred = true));

    button?.focus();
    expect(focused).to.be.true;

    button?.blur();
    expect(blurred).to.be.true;
  });
});
