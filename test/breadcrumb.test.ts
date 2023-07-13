import { assert, fixture } from "@open-wc/testing";
import { html } from "lit";
import { SgdsBreadcrumb } from "../src/components/Breadcrumb/sgds-breadcrumb";
import { SgdsBreadcrumbItem } from "../src/components/Breadcrumb/sgds-breadcrumb-item";

customElements.define("sgds-breadcrumb", SgdsBreadcrumb)
customElements.define("sgds-breadcrumb-item", SgdsBreadcrumbItem)

describe("sgds-breadcrumb", () => {
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-breadcrumb></sgds-breadcrumb>`);
    assert.shadowDom.equal(
      el,
      `<nav
      part="base"
    >
      <ol class="breadcrumb">
        <slot></slot>
        <slot name="separator" hidden aria-hidden="true">
         <span>/</span>
        </slot>
      </ol>
    </nav>
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
      ` <li part="base" class="breadcrumb-item active">
            <span part="label"><slot></slot></span>
            <slot name="separator" class="breadcrumb-item__separator" aria-hidden="true"></slot>
          </li>
        `
    );
  });

  it("should convert to a tag if href attribute is added", async () => {
    const el = await fixture(html`<sgds-breadcrumb-item href="#a"></sgds-breadcrumb-item>`);
    assert.shadowDom.equal(
      el,
      ` <li part="base" class=" breadcrumb-item">
            <a href="#a" part="label"><slot></slot></a>
            <slot name="separator" class="breadcrumb-item__separator" aria-hidden="true"></slot>
          </li>
        `
    );
  });
});
