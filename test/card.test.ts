import { assert, expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsCard } from "../src/components";
import "./sgds-web-component";
import Sinon from "sinon";

describe("<sgds-card>", () => {
  it("by default, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card></sgds-card>`);
    assert.shadowDom.equal(
      el,
      `
        <div
          class="card"
        >
          <slot name="menu"></slot>
          <div>
            <slot name="upper">
              <slot name="image"></slot>
              <slot name="icon"></slot>
            </slot>
          </div>
          <div class="card-body">
            <div class="card-header-container">
              <div class="card-header">
                <slot name="subtitle"></slot>
                <h3 class="card-title"><slot name="title"></slot></h3>
              </div>
              <slot></slot>
            </div>
            <slot name="description"></slot>
            <slot name="lower"></slot>
            <slot name="footer">
              <slot name="link"></slot>
            </slot>
          </div>
        </div>
      `
    );
  });
  it("when image slot is specified, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card><img slot="image" /></sgds-card>`);
    assert.shadowDom.equal(
      el,
      `
        <div
          class="card"
        >
          <slot name="menu"></slot>
          <div class="card-image">
            <slot name="upper">
              <slot name="image"></slot>
              <slot name="icon"></slot>
            </slot>
          </div>
          <div class="card-body">
            <div class="card-header-container">
              <div class="card-header">
                <slot name="subtitle"></slot>
                <h3 class="card-title"><slot name="title"></slot></h3>
              </div>
              <slot></slot>
            </div>
            <slot name="description"></slot>
            <slot name="lower"></slot>
            <slot name="footer">
              <slot name="link"></slot>
            </slot>
          </div>
        </div>
      `
    );
  });
  it("when icon slot is specified, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsCard>(
      html`<sgds-card><sgds-icon slot="icon" name="box-seam"></sgds-icon></sgds-card>`
    );
    assert.shadowDom.equal(
      el,
      `
         <div
          class="card"
        >
          <slot name="menu"></slot>
          <div class="card-media">
            <slot name="upper">
              <slot name="image"></slot>
              <slot name="icon"></slot>
            </slot>
          </div>
          <div class="card-body">
            <div class="card-header-container">
              <div class="card-header">
                <slot name="subtitle"></slot>
                <h3 class="card-title"><slot name="title"></slot></h3>
              </div>
              <slot></slot>
            </div>
            <slot name="description"></slot>
            <slot name="lower"></slot>
            <slot name="footer">
              <slot name="link"></slot>
            </slot>
          </div>
        </div>
      `
    );
  });
  it("when menu slot is specified, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card><div slot="menu" name="box-seam"></div></sgds-card>`);
    assert.shadowDom.equal(
      el,
      `
         <div
          class="card"
        >
          <slot name="menu"></slot>
          <div>
            <slot name="upper">
              <slot name="image"></slot>
              <slot name="icon"></slot>
            </slot>
          </div>
          <div class="card-body">
            <div class="card-header-container">
              <div class="card-header">
                <slot name="subtitle"></slot>
                <h3 class="card-title"><slot name="title"></slot></h3>
              </div>
              <slot></slot>
            </div>
            <slot name="description"></slot>
            <slot name="lower"></slot>
            <slot name="footer">
              <slot name="link"></slot>
            </slot>
          </div>
        </div>
      `
    );
  });

  it("renders content in the description slot", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card>
        <span slot="description">This is a description</span>
      </sgds-card>
    `);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    expect(descriptionSlot).to.exist;

    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(1);
    expect(assignedNodes[0].textContent?.trim()).to.equal("This is a description");
  });

  it("renders nothing if no description slot is provided", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card></sgds-card>`);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(0);
  });

  it("renders card as div (not anchor) when stretchedLink is true", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink>
        <a slot="footer" href="#">Read More</a>
      </sgds-card>
    `);
    const tag = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(tag.tagName.toLowerCase()).to.equal("div");
  });

  it("sets role=link and tabindex=0 on host when stretchedLink with valid href", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink>
        <a slot="footer" href="https://example.com">Read More</a>
      </sgds-card>
    `);
    expect(el.getAttribute("role")).to.equal("link");
    expect(el.getAttribute("tabindex")).to.equal("0");
  });

  it("delegates click to the footer anchor when stretchedLink is true", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink>
        <a slot="footer" href="https://example.com">Read More</a>
      </sgds-card>
    `);
    const anchor = el.querySelector("a") as HTMLAnchorElement;
    const clickSpy = Sinon.spy(anchor, "click");
    el.click();
    expect(clickSpy.calledOnce).to.be.true;
    clickSpy.restore();
  });

  it("delegates Enter keydown to the footer anchor when stretchedLink is true", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink>
        <a slot="footer" href="https://example.com">Read More</a>
      </sgds-card>
    `);
    const anchor = el.querySelector("a") as HTMLAnchorElement;
    const clickSpy = Sinon.spy(anchor, "click");
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(clickSpy.calledOnce).to.be.true;
    clickSpy.restore();
  });

  it("does not delegate click when disabled", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink disabled>
        <a slot="footer" href="https://example.com">Read More</a>
      </sgds-card>
    `);
    const anchor = el.querySelector("a") as HTMLAnchorElement;
    const clickSpy = Sinon.spy(anchor, "click");
    el.click();
    expect(clickSpy.called).to.be.false;
    clickSpy.restore();
  });

  it("does not set role=link when anchor href uses javascript: protocol", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink>
        <a slot="footer" href="javascript:alert(1)">Read More</a>
      </sgds-card>
    `);
    expect(el.getAttribute("role")).to.be.null;
    expect(el.getAttribute("tabindex")).to.be.null;
  });

  it("does not set role=link when anchor href uses data: protocol", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink>
        <a slot="footer" href="data:text/html,<h1>test</h1>">Read More</a>
      </sgds-card>
    `);
    expect(el.getAttribute("role")).to.be.null;
  });
});

describe("<sgds-card> noPadding", () => {
  it("noPadding property defaults to false", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card></sgds-card>`);
    expect(el.noPadding).to.be.false;
  });

  it("renders tinted background when tinted and not noPadding", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card tinted></sgds-card>`);
    const tinted = el.shadowRoot?.querySelector(".card-tinted-bg");
    expect(tinted).to.exist;
  });

  it("does not render tinted background when noPadding is true", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card tinted noPadding></sgds-card>`);
    const tinted = el.shadowRoot?.querySelector(".card-tinted-bg");
    expect(tinted).to.not.exist;
  });

  it("does not render tinted background when not tinted regardless of noPadding", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card noPadding></sgds-card>`);
    const tinted = el.shadowRoot?.querySelector(".card-tinted-bg");
    expect(tinted).to.not.exist;
  });

  it("reflects noPadding attribute", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card noPadding></sgds-card>`);
    expect(el.hasAttribute("noPadding")).to.be.true;
  });

  it("sets card-body padding to 0px when noPadding and no media slots", async () => {
    const el = await fixture<SgdsCard>(html`<sgds-card noPadding>
      <span slot="title">Title</span>
    </sgds-card>`);
    const body = el.shadowRoot?.querySelector(".card-body") as HTMLDivElement;
    expect(body.style.padding).to.equal("0px");
  });
});

describe("SgdsCard error logging", () => {
  const consoleStub = Sinon.stub(console, "error");

  afterEach(() => {
    consoleStub.restore();
  });
  it("console error thrown when both image and icon slots are present", async () => {
    await fixture<SgdsCard>(
      html`<sgds-card><img slot="image" /><sgds-icon slot="icon" name="box-seam"></sgds-icon></sgds-card>`
    );
    await waitUntil(() => consoleStub.calledOnce);
    expect(consoleStub.calledOnce).to.be.true;
  });
  it("console error thrown when more than one images are present", async () => {
    await fixture<SgdsCard>(html`<sgds-card><img slot="image" /><img slot="image" /></sgds-card>`);
    await waitUntil(() => consoleStub.calledOnce);
    expect(consoleStub.calledOnce).to.be.true;
  });
});
