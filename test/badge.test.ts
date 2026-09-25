import { elementUpdated, expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as Sinon from "sinon";
import type { SgdsBadge } from "../src/components";
import SgdsCloseButton from "../src/components/CloseButton/sgds-close-button";
import "./sgds-web-component";
import { sendMouse } from "@web/test-runner-commands";

describe("SgdsBadge component", () => {
  it("should render when show is true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".badge")).to.exist;
  });

  it("should render a close button when dismissible is true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.exist;
  });

  it("should render the icon slot", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture<SgdsBadge>(
      html`<sgds-badge show>
        <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
        Badge
      </sgds-badge>`
    );
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("slot[name='icon']")).to.exist;

    // Restore the stubbed fetch method
    fetchStub.restore();
  });

  it("should not render a close button when dismissible is false", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.not.exist;
  });

  it("should render with the 'outlined' class when outlined is true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show outlined></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".badge")).to.have.class("outlined");
  });

  it("should not render with the 'outlined' class when outlined is false", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show></sgds-badge>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".badge")).to.not.have.class("outlined");
  });

  it("close public method invoke, removes badge from the document", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    el.close();
    await waitUntil(() => !el.show);
    expect(el.shadowRoot?.querySelector("div.badge")).not.to.exist;
  });

  it("default prevented in sgds-hide will prevent dismissible badge from closing", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    el.addEventListener("sgds-hide", e => e.preventDefault());
    el.close();
    expect(el.shadowRoot?.querySelector("div.badge")).to.exist;
  });

  it("mouse click badge close button emits sgds-hide and removes shadowDom contents of badge", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    const spyHide = Sinon.spy();
    el.addEventListener("sgds-hide", spyHide);
    const closeBtn = el.shadowRoot?.querySelector<SgdsCloseButton>("sgds-close-button");
    closeBtn?.click();
    await waitUntil(() => spyHide.calledOnce);
    expect(spyHide).to.be.calledOnce;
    await waitUntil(() => !el.show);
    expect(el.shadowRoot?.querySelector("div.badge")).not.to.exist;
  });

  it("when show is true, emits sgds-show event", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge dismissible></sgds-badge>`);
    const spyShow = Sinon.spy();
    el.addEventListener("sgds-show", spyShow);
    el.show = true;
    await el.updateComplete;
    expect(spyShow).to.be.calledOnce;
    expect(el.shadowRoot?.querySelector("div.badge")).to.exist;
  });

  it("when default prevented for sgds-show, sgds-after-show is emitted and show cannot be set to true", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge dismissible></sgds-badge>`);
    const afterShowSpy = Sinon.spy();
    el.addEventListener("sgds-show", e => e.preventDefault());
    el.addEventListener("sgds-after-show", afterShowSpy);
    el.show = true;
    await el.updateComplete;
    expect(afterShowSpy).not.to.be.called;
    expect(el.show).to.be.false;
  });

  it("when default prevented, sgds-after-hide toggling and show cannot be set to false ", async () => {
    const el = await fixture<SgdsBadge>(html`<sgds-badge show dismissible></sgds-badge>`);
    const afterHideSpy = Sinon.spy();

    el.addEventListener("sgds-hide", e => e.preventDefault());
    el.addEventListener("sgds-after-hide", afterHideSpy);

    el.show = false;
    await el.updateComplete;
    expect(afterHideSpy).not.to.be.called;
    expect(el.show).to.be.true;
  });

  it("should not render with the 'truncated' class when badge content fits parent width", async () => {
    const parentNode = document.createElement("div");
    parentNode.style.width = "1";

    const el = await fixture<SgdsBadge>(html`<sgds-badge> Short text </sgds-badge>`, { parentNode });

    await elementUpdated(el);

    const badge = el.shadowRoot?.querySelector(".badge");
    expect(badge).to.exist;

    const tooltip = el.shadowRoot?.querySelector("sgds-tooltip");
    expect(tooltip).to.not.exist;
  });

  it("should render with the sgds-tooltip when badge content exceeds max width", async () => {
    const el = await fixture<SgdsBadge>(
      html`<sgds-badge> A very long badge name without limitation of parent width </sgds-badge>`
    );

    await el.updateComplete;

    const badge = el.shadowRoot?.querySelector(".badge");
    expect(badge).to.exist;

    const tooltip = el.shadowRoot?.querySelector("sgds-tooltip");
    expect(tooltip).to.exist;
  });

  it("should not trigger sgds-hide when tooltip is hidden", async () => {
    const parentNode = document.createElement("div");
    parentNode.style.width = "100px";
    parentNode.style.padding = "24px";

    const el = await fixture<SgdsBadge>(
      html`<sgds-badge> A very long badge name without limitation of parent width </sgds-badge>`,
      { parentNode }
    );

    const spyHide = Sinon.spy();
    el.addEventListener("sgds-hide", spyHide);

    await elementUpdated(el);

    const badge = el.shadowRoot?.querySelector(".badge");
    expect(badge).to.exist;

    const tooltip = el.shadowRoot?.querySelector("sgds-tooltip");

    expect(tooltip).to.exist;

    await sendMouse({ type: "move", position: [50, 50] });
    await el.updateComplete;

    // when tooltip is shown
    expect(tooltip?.shadowRoot?.querySelector(".tooltip")).to.exist;

    await sendMouse({ type: "move", position: [0, 0] });
    await el.updateComplete;

    expect(spyHide).not.to.be.called;
  });
});

describe("outlined Badge theme colours", () => {
  const links: HTMLLinkElement[] = [];
  before(async () => {
    for (const theme of ["day", "night"]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `/src/themes/${theme}.css`;
      links.push(link);
      await new Promise<void>((resolve, reject) => {
        link.onload = () => resolve();
        link.onerror = reject;
        document.head.append(link);
      });
    }
  });
  afterEach(() => document.documentElement.classList.remove("sgds-night-theme"));
  after(() => links.forEach(link => link.remove()));

  const rgb = (hex: string) =>
    `rgb(${hex
      .match(/../g)
      ?.map(value => parseInt(value, 16))
      .join(", ")})`;
  // Theme colours follow the Badge design.
  const variants = [
    ["primary", "f4f2fe", "6b4feb", "2a1e61", "a999f3", "523abc"],
    ["info", "f4f2fe", "6b4feb", "2a1e61", "a999f3", "523abc"],
    ["accent", "ecf5fe", "0269d0", "012a54", "60aaf4", "0151a0"],
    ["success", "e3f9ed", "0e7c3d", "063119", "16bd5e", "0b5e2f"],
    ["danger", "fcf1f1", "cf2323", "550e0e", "e98b8b", "a11b1b"],
    ["warning", "fef4cb", "7e6917", "322909", "e5bf29", "605111"],
    ["cyan", "e0f7fc", "00758d", "002f38", "00b4da", "005a6d"],
    ["purple", "fbf0fe", "ac1cdb", "460c5a", "d983f6", "8516a9"],
    ["neutral", "f3f3f3", "525252", "2a2a2a", "a5a5a5", "525252"],
    ["white", "ffffff", "1a1a1a", "ffffff", "1a1a1a", ""]
  ];
  for (const [variant] of variants) {
    it(`${variant} respects its semantic background and border tokens`, async () => {
      const tokenVariant = variant === "info" ? "primary" : variant;
      const el = await fixture<SgdsBadge>(html`<sgds-badge outlined variant=${variant}>Badge</sgds-badge>`);
      el.style.setProperty(
        tokenVariant === "white" ? "--sgds-surface-fixed-light" : `--sgds-${tokenVariant}-surface-muted`,
        "rgb(12, 34, 56)"
      );
      el.style.setProperty(
        tokenVariant === "white" ? "--sgds-border-color-translucent" : `--sgds-${tokenVariant}-border-color-muted`,
        "rgb(65, 43, 21)"
      );
      const badge = el.shadowRoot?.querySelector(".badge") as HTMLElement;
      expect(getComputedStyle(badge).backgroundColor).to.equal("rgb(12, 34, 56)");
      expect(getComputedStyle(badge).borderTopColor).to.equal("rgb(65, 43, 21)");
    });
  }
  for (const [variant, dayBg, dayText, nightBg, nightText, nightBorder] of variants) {
    for (const dark of [false, true]) {
      it(`${variant} uses the expected ${dark ? "night" : "day"} colours`, async () => {
        document.documentElement.classList.toggle("sgds-night-theme", dark);
        const el = await fixture<SgdsBadge>(
          html`<sgds-badge show outlined dismissible variant=${variant}>Badge</sgds-badge>`
        );
        const badge = el.shadowRoot?.querySelector(".badge") as HTMLElement;
        const style = getComputedStyle(badge);
        expect(style.backgroundColor).to.equal(rgb(dark ? nightBg : dayBg));
        expect(style.color).to.equal(rgb(dark ? nightText : dayText));
        if (dark && nightBorder) expect(style.borderTopColor).to.equal(rgb(nightBorder));
        if (dark && variant === "white") {
          // Browsers serialize this relative colour in OKLCH; compare rendered RGBA values.
          const context = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
          context.fillStyle = style.borderTopColor;
          context.fillRect(0, 0, 1, 1);
          expect(Array.from(context.getImageData(0, 0, 1, 1).data)).to.deep.equal([255, 255, 255, 26]);
        }
        const close = el.shadowRoot?.querySelector("sgds-close-button") as SgdsCloseButton;
        await close.updateComplete;
        expect(close).to.have.attribute("tone", variant === "white" ? "fixed-dark" : "default");
        el.dismissible = false;
        el.innerHTML = '<span slot="icon">Icon</span>Badge';
        await elementUpdated(el);
        const icon = el.querySelector("[slot=icon]") as HTMLElement;
        expect(getComputedStyle(icon).color).to.equal(style.color);
      });
    }
  }
});
