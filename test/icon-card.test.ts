import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import { SgdsIconCard } from "../src/components";
import "../src/index";

describe("<sgds-icon-card>", () => {
  it("renders a default card", async () => {
    const el = await fixture<SgdsIconCard>(html`<sgds-icon-card></sgds-icon-card>`);
    expect(el).shadowDom.to.be.accessible;
    expect(el.shadowRoot?.querySelector(".card")).to.exist;
  });

  it("hides .card-media if no icon provided and orientation is horizontal", async () => {
    const el = await fixture<SgdsIconCard>(html`<sgds-icon-card orientation="horizontal"></sgds-icon-card>`);
    const media = el.shadowRoot?.querySelector(".card-media") as HTMLElement;
    expect(media.style.display).to.equal("none");
  });

  it("shows .card-media if icon is slotted", async () => {
    const el = await fixture<SgdsIconCard>(html`
      <sgds-icon-card>
        <span slot="icon">⭐</span>
      </sgds-icon-card>
    `);
    const media = el.shadowRoot?.querySelector(".card-media") as HTMLElement;
    expect(media.style.display).to.not.equal("none");
  });

  it("shows .card-media with upper slot when orientation is vertical", async () => {
    const el = await fixture<SgdsIconCard>(html`
      <sgds-icon-card orientation="vertical">
        <span slot="upper">Upper Content</span>
      </sgds-icon-card>
    `);
    const upperSlot = el.shadowRoot?.querySelector("slot[name=upper]");
    expect(upperSlot).to.exist;
  });

  it("renders title and subtitle properly", async () => {
    const el = await fixture<SgdsIconCard>(html`
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

  it("renders content in the description slot", async () => {
    const el = await fixture<SgdsIconCard>(html`
      <sgds-icon-card>
        <span slot="description">This is a description</span>
      </sgds-icon-card>
    `);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    expect(descriptionSlot).to.exist;

    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(1);
    expect(assignedNodes[0].textContent?.trim()).to.equal("This is a description");
  });

  it("renders nothing if no description slot is provided", async () => {
    const el = await fixture<SgdsIconCard>(html`<sgds-icon-card></sgds-icon-card>`);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(0);
  });

  it("applies disabled class when disabled", async () => {
    const el = await fixture<SgdsIconCard>(html`<sgds-icon-card disabled></sgds-icon-card>`);
    expect(el.shadowRoot?.querySelector(".card")?.classList.contains("disabled")).to.be.true;
  });

  it("renders tinted background when tinted and not noPadding", async () => {
    const el = await fixture<SgdsIconCard>(html`<sgds-icon-card tinted></sgds-icon-card>`);
    const tinted = el.shadowRoot?.querySelector(".card-tinted-bg");
    expect(tinted).to.exist;
  });

  it("renders stretched-link anchor in shadow DOM when stretchedLink with valid href", async () => {
    const el = await fixture<SgdsIconCard>(html`
      <sgds-icon-card stretchedLink>
        <span slot="title">Icon Title</span>
        <a slot="footer" href="https://example.com">Read More</a>
      </sgds-icon-card>
    `);
    const stretchedAnchor = el.shadowRoot?.querySelector("a.stretched-link") as HTMLAnchorElement;
    expect(stretchedAnchor).to.exist;
    expect(stretchedAnchor.getAttribute("href")).to.equal("https://example.com");
    expect(stretchedAnchor.getAttribute("aria-label")).to.equal("Icon Title");
  });

  it("keeps .card as a div when stretchedLink is true", async () => {
    const el = await fixture<SgdsIconCard>(html`
      <sgds-icon-card stretchedLink>
        <a slot="footer" href="https://example.com">Read More</a>
      </sgds-icon-card>
    `);
    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.tagName.toLowerCase()).to.equal("div");
  });

  it("falls back to anchor text for aria-label when no title slot", async () => {
    const el = await fixture<SgdsIconCard>(html`
      <sgds-icon-card stretchedLink>
        <a slot="footer" href="https://example.com">Read More</a>
      </sgds-icon-card>
    `);
    const stretchedAnchor = el.shadowRoot?.querySelector("a.stretched-link") as HTMLAnchorElement;
    expect(stretchedAnchor.getAttribute("aria-label")).to.equal("Read More");
  });

  it("does not render stretched-link when anchor href uses javascript: protocol", async () => {
    const el = await fixture<SgdsIconCard>(html`
      <sgds-icon-card stretchedLink>
        <a slot="footer" href="javascript:alert(1)">Read More</a>
      </sgds-icon-card>
    `);
    const stretchedAnchor = el.shadowRoot?.querySelector("a.stretched-link");
    expect(stretchedAnchor).to.not.exist;
  });
});
