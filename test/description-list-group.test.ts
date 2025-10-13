import { html } from "lit";
import { fixture, expect, elementUpdated } from "@open-wc/testing";
import "../src/index"; // Adjust the path as necessary
import { SgdsDescriptionListGroup } from "../src/components";

describe("<sgds-description-list-group>", () => {
  it("should render title element when title is provided", async () => {
    const el = await fixture<SgdsDescriptionListGroup>(html`
      <sgds-description-list-group>
        <div slot="title">Title Text</div>
      </sgds-description-list-group>
    `);

    await el.updateComplete;

    expect(el.hasTitleSlot).to.be.true;
    const titleSlot = el.shadowRoot?.querySelector('slot[name="title"]') as HTMLSlotElement;
    expect(titleSlot).to.exist;

    const assigned = titleSlot.assignedElements();
    expect(assigned.length).to.equal(1);
    expect(assigned[0].textContent).to.equal("Title Text");
  });

  it("should not render title element when title is not provided", async () => {
    const el = await fixture<SgdsDescriptionListGroup>(html`
      <sgds-description-list-group></sgds-description-list-group>
    `);

    await el.updateComplete;

    expect(el.hasTitleSlot).to.be.false;
    const titleSlot = el.shadowRoot?.querySelector('slot[name="title"]') as HTMLSlotElement;
    expect(titleSlot).to.exist;

    const assigned = titleSlot.assignedElements();
    expect(assigned.length).to.equal(0);
  });

  it("should render description element when description is provided", async () => {
    const el = await fixture<SgdsDescriptionListGroup>(html`
      <sgds-description-list-group>
        <div slot="description">Description</div>
      </sgds-description-list-group>
    `);

    await el.updateComplete;

    expect(el.hasDescriptionSlot).to.be.true;
    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    expect(descriptionSlot).to.exist;

    const assigned = descriptionSlot.assignedElements();
    expect(assigned.length).to.equal(1);
    expect(assigned[0].textContent).to.equal("Description");
  });

  it("should not render description element when description is not provided", async () => {
    const el = await fixture<SgdsDescriptionListGroup>(html`
      <sgds-description-list-group></sgds-description-list-group>
    `);

    await el.updateComplete;

    expect(el.hasDescriptionSlot).to.be.false;
    const descriptionSlot = el.shadowRoot?.querySelector('slot[name="description"]') as HTMLSlotElement;
    expect(descriptionSlot).to.exist;

    const assigned = descriptionSlot.assignedElements();
    expect(assigned.length).to.equal(0);
  });
});
