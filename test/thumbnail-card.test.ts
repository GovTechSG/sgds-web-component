import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import { SgdsThumbnailCard } from "../src/components";
import "../src/index";

describe("sgds-thumbnail-card", () => {
  it("renders by default", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`<sgds-thumbnail-card></sgds-thumbnail-card>`);
    expect(el).to.be.accessible;
    expect(el.shadowRoot?.querySelector(".card")).to.exist;
  });

  it("renders title and subtitle properly", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-icon-card>
        <span slot="subtitle">Subtitle text</span>
        <span slot="title">Title text</span>
      </sgds-icon-card>
    `);
    const subtitle = el.shadowRoot?.querySelector("slot[name=subtitle]");
    const title = el.shadowRoot?.querySelector("slot[name=title]");
    expect(subtitle).to.exist;
    expect(title).to.exist;
  });

  it("supports noPadding prop (removes padding and tint)", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`<sgds-thumbnail-card noPadding></sgds-thumbnail-card>`);
    expect(el.noPadding).to.be.true;
    const body = el.shadowRoot?.querySelector(".card-body") as HTMLElement;
    expect(getComputedStyle(body).padding).to.equal("0px");
  });

  it("renders upper slot when slotted", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card orientation="vertical">
        <span slot="upper">Badge</span>
      </sgds-thumbnail-card>
    `);
    const upper = el.shadowRoot?.querySelector("slot[name=upper]");
    expect(upper).to.exist;
  });

  it("renders link slot with stretchedLink", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="link" href="#">Read More</a>
      </sgds-thumbnail-card>
    `);
    const tag = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(tag.tagName.toLowerCase()).to.equal("a");
  });

  it("sets tabindex correctly when stretchedLink + disabled", async () => {
    const el = await fixture<SgdsThumbnailCard>(
      html`<sgds-thumbnail-card stretchedLink disabled></sgds-thumbnail-card>`
    );
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("tabindex")).to.equal("-1");
  });

  it("renders tinted background unless noPadding is true", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`<sgds-thumbnail-card tinted></sgds-thumbnail-card>`);
    const tintedBg = el.shadowRoot?.querySelector(".card-tinted-bg");
    expect(tintedBg).to.exist;

    const el2 = await fixture<SgdsThumbnailCard>(html`<sgds-thumbnail-card tinted noPadding></sgds-thumbnail-card>`);
    const tintedBg2 = el2.shadowRoot?.querySelector(".card-tinted-bg");
    expect(tintedBg2).to.not.exist;
  });
});
