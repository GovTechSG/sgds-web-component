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
      <sgds-thumbnail-card>
        <span slot="subtitle">Subtitle text</span>
        <span slot="title">Title text</span>
      </sgds-thumbnail-card>
    `);
    const subtitle = el.shadowRoot?.querySelector("slot[name=subtitle]");
    const title = el.shadowRoot?.querySelector("slot[name=title]");
    expect(subtitle).to.exist;
    expect(title).to.exist;
  });

  it("renders content in the description slot", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card>
        <span slot="description">This is a description</span>
      </sgds-thumbnail-card>
    `);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    expect(descriptionSlot).to.exist;

    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(1);
    expect(assignedNodes[0].textContent?.trim()).to.equal("This is a description");
  });

  it("renders nothing if no description slot is provided", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`<sgds-thumbnail-card></sgds-thumbnail-card>`);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(0);
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

  /**@deprecated Remove in v4.0.0 */
  it("renders link slot with stretchedLink", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="link" href="#">Read More</a>
      </sgds-thumbnail-card>
    `);
    const tag = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(tag.tagName.toLowerCase()).to.equal("a");
  });

  it("renders footer slot with stretchedLink", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="footer" href="#">Read More</a>
      </sgds-thumbnail-card>
    `);
    const tag = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(tag.tagName.toLowerCase()).to.equal("a");
  });

  it("sets tabindex correctly based on stretchedLink and disabled", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`<sgds-thumbnail-card></sgds-thumbnail-card>`);
    el.stretchedLink = true;
    await el.updateComplete;

    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("tabindex")).to.equal("0");

    el.disabled = true;
    await el.updateComplete;
    expect(card.getAttribute("tabindex")).to.equal("-1");
  });

  it("forwards href and target from footer slot anchor when stretchedLink is true", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="footer" href="https://example.com" target="_blank">Read More</a>
      </sgds-thumbnail-card>
    `);
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("href")).to.equal("https://example.com");
    expect(card.getAttribute("target")).to.equal("_blank");
  });

  /** @deprecated Remove in v4.0.0 */
  it("forwards href and target from link slot anchor when stretchedLink is true", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="link" href="https://example.com" target="_blank">Read More</a>
      </sgds-thumbnail-card>
    `);
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("href")).to.equal("https://example.com");
    expect(card.getAttribute("target")).to.equal("_blank");
  });

  it("forwards safe attributes (rel, aria-label, data-*) from footer slot anchor", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="footer" href="https://example.com" rel="noopener noreferrer" aria-label="Read more" data-id="123"
          >Read More</a
        >
      </sgds-thumbnail-card>
    `);
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("rel")).to.equal("noopener noreferrer");
    expect(card.getAttribute("aria-label")).to.equal("Read more");
    expect(card.getAttribute("data-id")).to.equal("123");
  });

  it("does not forward class, style, id from footer slot anchor", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="footer" href="https://example.com" class="custom-link" style="color:red" id="my-link">Read More</a>
      </sgds-thumbnail-card>
    `);
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("class")).to.not.include("custom-link");
    expect(card.getAttribute("style")).to.be.null;
    expect(card.getAttribute("id")).to.be.null;
  });

  it("does not forward on* event handler attributes from footer slot anchor", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="footer" href="https://example.com" onclick="alert(1)">Read More</a>
      </sgds-thumbnail-card>
    `);
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("onclick")).to.be.null;
  });

  it("does not forward attributes when anchor href uses javascript: protocol", async () => {
    const el = await fixture<SgdsThumbnailCard>(html`
      <sgds-thumbnail-card stretchedLink>
        <a slot="footer" href="javascript:alert(1)" target="_blank">Read More</a>
      </sgds-thumbnail-card>
    `);
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("href")).to.be.null;
    expect(card.getAttribute("target")).to.be.null;
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
