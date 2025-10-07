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
          tabindex="-1"
        >
          <div class="card-tinted-bg"></div>
          <div><slot name="upper"></slot></div>
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
          tabindex="-1"
        >
          <div class="card-tinted-bg"></div>
          <div class="card-image">
            <slot name="upper">
              <slot name="image"></slot>
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
          tabindex="-1"
        >
          <div class="card-tinted-bg"></div>
          <div class="card-media">
            <slot name="upper">
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
          tabindex="-1"
        >
          <div class="card-tinted-bg"></div>
          <slot name="menu"></slot>
          <div>
            <slot name="upper"></slot>
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

  it("renders footer slot with stretchedLink", async () => {
    const el = await fixture<SgdsCard>(html`
      <sgds-card stretchedLink>
        <a slot="footer" href="#">Read More</a>
      </sgds-card>
    `);
    const tag = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(tag.tagName.toLowerCase()).to.equal("a");
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
