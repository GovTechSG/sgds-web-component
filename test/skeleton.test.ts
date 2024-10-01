import { html } from "lit";
import { expect, assert, fixture, elementUpdated } from "@open-wc/testing";
import { SgdsSkeleton } from "../src/components";
import "../src/index";

describe("<sgds-skeleton>", () => {
  it("matches semantic shadowDOM", async () => {
    const el = await fixture(html`<sgds-skeleton></sgds-skeleton>`);
    assert.shadowDom.equal(
      el,
      `
          <div class="skeleton"></div>
        `
    );
  });
  it("matches semantic shadowDOM when rows are defined", async () => {
    const el = await fixture(html`<sgds-skeleton rows="3"></sgds-skeleton>`);
    assert.shadowDom.equal(
      el,
      `
          <div class="skeleton skeleton-paragraph auto-size-rows">
          <div class="skeleton-row-0"></div>
          <div class="skeleton-row-1"></div>
          <div class="skeleton-row-2"></div>
          </div>
        `
    );
  });
  it("matches semantic shadowDOM when sheen is defined", async () => {
    const el = await fixture(html`<sgds-skeleton sheen></sgds-skeleton>`);
    assert.shadowDom.equal(
      el,
      `
          <div class="skeleton sheen">
          </div>
        `
    );
  });
  it("matches semantic shadowDOM when sheen and rows are defined", async () => {
    const el = await fixture(html`<sgds-skeleton sheen rows="3"></sgds-skeleton>`);
    assert.shadowDom.equal(
      el,
      `
          <div class="skeleton auto-size-rows skeleton-paragraph">
          <div class="skeleton-row-0 sheen"></div>
          <div class="skeleton-row-1 sheen"></div>
          <div class="skeleton-row-2 sheen"></div>
          </div>
        `
    );
  });
  it("width, height and borderRadius are forwarded to style of .skeleton element", async () => {
    const el = await fixture(html`<sgds-skeleton width="100px" height="100px" borderRadius="5px"></sgds-skeleton>`);
    const skeletonDiv = el.shadowRoot?.querySelector(".skeleton");
    const skeletonStyles = skeletonDiv?.getAttribute("style")?.split(";");
    expect(skeletonStyles?.[0]).to.contain("width: 100px");
    expect(skeletonStyles?.[1]).to.contain("height: 100px");
    expect(skeletonStyles?.[2]).to.contain("border-radius: 5px");
  });
  it("borderRadius is forwarded to style of .skeleton-row elements when row is defined", async () => {
    const el = await fixture<SgdsSkeleton>(
      html`<sgds-skeleton rows="3" width="100px" height="100px" borderRadius="5px"></sgds-skeleton>`
    );
    await elementUpdated(el);
    const skeletonRowDivs = [
      el.shadowRoot?.querySelector(".skeleton-row-0"),
      el.shadowRoot?.querySelector(".skeleton-row-1"),
      el.shadowRoot?.querySelector(".skeleton-row-2")
    ];
    const skeletonRowStyles = skeletonRowDivs.map(s => s?.getAttribute("style"));
    skeletonRowStyles.forEach(s => expect(s).to.contain("border-radius: 5px"));
  });
});
