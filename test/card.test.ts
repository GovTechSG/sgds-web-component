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
            <p class="card-text">
              <slot name="description"></slot>
            </p>
            <slot name="lower"></slot>
            <slot name="link"></slot>
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
            <p class="card-text">
              <slot name="description"></slot>
            </p>
            <slot name="lower"></slot>
            <slot name="link"></slot>
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
            <p class="card-text">
              <slot name="description"></slot>
            </p>
            <slot name="lower"></slot>
            <slot name="link"></slot>
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
            <p class="card-text">
              <slot name="description"></slot>
            </p>
            <slot name="lower"></slot>
            <slot name="link"></slot>
          </div>
        </div>
      `
    );
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
