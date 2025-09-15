import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import { SgdsImageCard } from "../src/components";
import "../src/index";

describe("sgds-image-card", () => {
  it("renders with default properties", async () => {
    const el = await fixture<SgdsImageCard>(html`<sgds-image-card></sgds-image-card>`);
    expect(el).to.exist;
    expect(el.imagePosition).to.equal("before");
    expect(el.imageAdjustment).to.equal("default");
  });

  it("hides image container when no image slot is provided", async () => {
    const el = await fixture<SgdsImageCard>(html`<sgds-image-card></sgds-image-card>`);
    const image = el.shadowRoot?.querySelector(".card-image") as HTMLElement;
    expect(image.style.display).to.equal("none");
  });

  it("renders image when slotted", async () => {
    const el = await fixture<SgdsImageCard>(html`
      <sgds-image-card>
        <img
          slot="image"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="test"
        />
      </sgds-image-card>
    `);
    const slot = el.shadowRoot?.querySelector("slot[name=image]") as HTMLSlotElement;
    const nodes = slot.assignedNodes();
    expect(nodes.length).to.equal(1);
    expect((nodes[0] as HTMLImageElement).getAttribute("src")).to.equal(
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    );
  });

  it("renders title and subtitle slots", async () => {
    const el = await fixture<SgdsImageCard>(html`
      <sgds-image-card>
        <span slot="subtitle">Subtitle here</span>
        <span slot="title">Title here</span>
      </sgds-image-card>
    `);

    const subtitle = el.shadowRoot?.querySelector("slot[name=subtitle]");
    const title = el.shadowRoot?.querySelector("slot[name=title]");

    expect(subtitle).dom.to.equal(`<slot name="subtitle"></slot>`);
    expect(title).dom.to.equal(`<slot name="title"></slot>`);
  });

  it("renders content in the description slot", async () => {
    const el = await fixture<SgdsImageCard>(html`
      <sgds-image-card>
        <span slot="description">This is a description</span>
      </sgds-image-card>
    `);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    expect(descriptionSlot).to.exist;

    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(1);
    expect(assignedNodes[0].textContent?.trim()).to.equal("This is a description");
  });

  it("renders nothing if no description slot is provided", async () => {
    const el = await fixture<SgdsImageCard>(html`<sgds-image-card></sgds-image-card>`);

    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    const assignedNodes = descriptionSlot.assignedNodes({ flatten: true });
    expect(assignedNodes.length).to.equal(0);
  });

  it("sets tabindex correctly based on stretchedLink and disabled", async () => {
    const el = await fixture<SgdsImageCard>(html`<sgds-image-card></sgds-image-card>`);
    el.stretchedLink = true;
    await el.updateComplete;

    const card = el.shadowRoot?.querySelector(".card") as HTMLElement;
    expect(card.getAttribute("tabindex")).to.equal("0");

    el.disabled = true;
    await el.updateComplete;
    expect(card.getAttribute("tabindex")).to.equal("-1");
  });

  it("applies tinted background when tinted is true and noPadding is false", async () => {
    const el = await fixture<SgdsImageCard>(html`<sgds-image-card></sgds-image-card>`);
    el.tinted = true;
    el.noPadding = false;
    await el.updateComplete;

    const tinted = el.shadowRoot?.querySelector(".card-tinted-bg");
    expect(tinted).to.exist;
  });
});
