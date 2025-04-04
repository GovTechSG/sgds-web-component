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
    await elementUpdated(el);
    const titleElement = el.shadowRoot?.querySelector(".title");
    expect(titleElement).to.exist;
  });

  it("should not render title element when title is not provided", async () => {
    const el = await fixture<SgdsDescriptionListGroup>(html`
      <sgds-description-list-group></sgds-description-list-group>
    `);
    await elementUpdated(el);
    const titleElement = el.shadowRoot?.querySelector(".title");
    expect(titleElement).to.not.exist;
  });

  it("should render description element when description is provided", async () => {
    const el = await fixture<SgdsDescriptionListGroup>(html`
      <sgds-description-list-group>
        <div slot="description">Description</div>
      </sgds-description-list-group>
    `);
    await elementUpdated(el);
    const descriptionElement = el.shadowRoot?.querySelector(".description");
    expect(descriptionElement).to.exist;
  });

  it("should not render description element when description is not provided", async () => {
    const el = await fixture<SgdsDescriptionListGroup>(html`
      <sgds-description-list-group></sgds-description-list-group>
    `);
    await elementUpdated(el);
    const descriptionElement = el.shadowRoot?.querySelector(".description");
    expect(descriptionElement).to.not.exist;
  });
});
