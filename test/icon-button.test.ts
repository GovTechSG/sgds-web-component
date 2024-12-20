import { html } from "lit";
import { assert, expect, fixture } from "@open-wc/testing";
import { SgdsIcon, SgdsIconButton } from "../src/components";
import "../src/index";
import Sinon from "sinon";

describe("<sgds-icon-button>", () => {
  it("semantically matches the DOM", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture<SgdsIconButton>(html`<sgds-icon-button name="placeholder"></sgds-icon-button>`);
    assert.shadowDom.equal(
      el,
      `
      <button
      aria-disabled="false"
      class="btn btn-icon btn-primary btn-md"
      tabindex="0"
      type="button">
        <sgds-icon name="placeholder" style="display: none;" size="lg"></sgds-icon>
      </button>
      `
    );

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  const mappedSize = [
    { btnSize: "sm", iconSize: "md" },
    { btnSize: "md", iconSize: "lg" },
    { btnSize: "lg", iconSize: "xl" }
  ];
  mappedSize.forEach(({ btnSize, iconSize }) => {
    it(`when icon button size is ${btnSize}, expected icon size is ${iconSize}`, async () => {
      const el = await fixture<SgdsIconButton>(
        html`<sgds-icon-button size=${btnSize} name="placeholder"></sgds-icon-button>`
      );
      const icon = el.shadowRoot?.querySelector("sgds-icon") as SgdsIcon;
      expect(icon.size).to.equal(iconSize);
    });
  });
  it("renders an anchor tag when href is provided", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture<SgdsIconButton>(
      html`<sgds-icon-button href="https://example.com" name="placeholder"></sgds-icon-button>`
    );
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.exist;
    expect(anchorTag).to.have.attribute("href", "https://example.com");
    expect(anchorTag).to.have.attribute("role", "button");
    expect(anchorTag).not.to.have.attribute("type", "button");
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("applies correct attributes when rendering an anchor tag", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture(
      html`<sgds-icon-button href="https://example.com" target="_blank" download="example.pdf" name="placeholder">
      </sgds-icon-button>`
    );
    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor).to.have.attribute("href", "https://example.com");
    expect(anchor).to.have.attribute("target", "_blank");
    expect(anchor).to.have.attribute("download", "example.pdf");
    expect(anchor).to.have.attribute("rel", "noreferrer noopener");

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("applies the correct classes for size and variant", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture<SgdsIconButton>(
      html`<sgds-icon-button size="lg" variant="primary" name="placeholder"></sgds-icon-button>`
    );
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.class("btn-icon");
    expect(button).to.have.class("btn-primary");
    expect(button).to.have.class("btn-lg");

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("sets disabled attribute correctly", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture<SgdsIconButton>(html`<sgds-icon-button disabled name="placeholder"></sgds-icon-button>`);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("disabled");
    expect(button).to.have.attribute("aria-disabled", "true");

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("does not allow interaction when disabled", async () => {
    const el = await fixture(html`<sgds-icon-button disabled name="placeholder"></sgds-icon-button>`);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).attribute("tabindex").to.equal("-1");

    let clicked = false;
    el.addEventListener("click", () => (clicked = true));
    button?.click();
    expect(clicked).to.be.false;
  });

  it("handles focus and blur events", async () => {
    const el = await fixture(html`<sgds-icon-button name="placeholder"></sgds-icon-button>`);
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
