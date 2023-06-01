import { assert, fixture } from "@open-wc/testing";
import { html } from "lit";
import { SgdsBreadcrumb } from "../src/components/Breadcrumb/sgds-breadcrumb";
import { SgdsBreadcrumbItem } from "../src/components/Breadcrumb/sgds-breadcrumb-item";

describe("sgds-breadcrumb", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-breadcrumb");
    assert.instanceOf(el, SgdsBreadcrumb);
  });
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-breadcrumb></sgds-breadcrumb>`);
    assert.shadowDom.equal(
      el,
      `<nav part="base" class="sgds breadcrumb" aria-label="breadcrumb">
          <slot></slot>
        </nav>
        <slot name="separator" hidden="" aria-hidden="true">
          <span class="sgds-breadcrumb-seperator"></span>
        </slot>
        `
    );
  });
});

describe("sgds-breadcrumb-item", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-breadcrumb-item");
    assert.instanceOf(el, SgdsBreadcrumbItem);
  });
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-breadcrumb-item></sgds-breadcrumb-item>`);
    assert.shadowDom.equal(
      el,
      ` <div part="base" class=" breadcrumb-item ">
            <span part="label"><slot></slot></span>
            <slot name="separator" part="separator" class="breadcrumb-item__separator" aria-hidden="true"></slot>
          </div>
        `
    );
  });

  it("should convert to a tag if href attribute is added", async () => {
    const el = await fixture(html`<sgds-breadcrumb-item href="#a"></sgds-breadcrumb-item>`);
    assert.shadowDom.equal(
      el,
      ` <div part="base" class=" breadcrumb-item ">
            <a href="#a" part="label"><slot></slot></a>
            <slot name="separator" part="separator" class="breadcrumb-item__separator" aria-hidden="true"></slot>
          </div>
        `
    );
  });
});
