import "./sgds-web-component";
import { assert, fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import { SgdsBreadcrumb, SgdsBreadcrumbItem } from "../src/components";
import Sinon from "sinon";

describe("sgds-breadcrumb", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`<sgds-breadcrumb></sgds-breadcrumb>`);
    assert.shadowDom.equal(
      el,
      ` <div aria-label="breadcrumb">
        <div class="breadcrumb">
          <slot></slot>
        </div>
      </div>
        `
    );
  });
  it("when items are less than 5 , matches shadowDOM semantically ", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`<sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">About</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="https://www.google.com/">Contacts</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="https://www.google.com/">Info</a></sgds-breadcrumb-item>
    </sgds-breadcrumb>`);
    assert.shadowDom.equal(
      el,
      ` <div aria-label="breadcrumb">
        <div class="breadcrumb">
          <slot></slot>
        </div>
      </div>
        `
    );
  });
  it("when items are more than 4 , matches shadowDOM semantically ", async () => {
    // Mock fetch to prevent network requests
    const fetchStub = Sinon.stub(window, "fetch").resolves(
      new Response("<svg></svg>", { status: 200, headers: { "Content-Type": "image/svg+xml" } })
    );

    const el = await fixture<SgdsBreadcrumb>(html`<sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">About</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="https://www.google.com/">Contacts</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="https://www.google.com/">Info</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="https://www.google.com/">Last</a></sgds-breadcrumb-item>
    </sgds-breadcrumb>`);
    assert.shadowDom.equal(
      el,
      ` <div aria-label="breadcrumb">
        <div class="breadcrumb">
              <sgds-breadcrumb-item
          >
            <a href="#">
              Home
            </a>
          </sgds-breadcrumb-item>
         <sgds-breadcrumb-item class="overflow-menu">
           <sgds-overflow-menu aria-haspopup="menu" size="sm">
             <sgds-dropdown-item
               aria-disabled="false"
               role="menuitem"
             >
               <a href="#">
                 About
               </a>
             </sgds-dropdown-item>
             <sgds-dropdown-item
               aria-disabled="false"
               role="menuitem"
             >
               <a href="https://www.google.com/">
                 Contacts
               </a>
             </sgds-dropdown-item>
           </sgds-overflow-menu>
         </sgds-breadcrumb-item>
         <sgds-breadcrumb-item
         >
           <a href="https://www.google.com/">
             Info
           </a>
         </sgds-breadcrumb-item>
         <sgds-breadcrumb-item
           active=""
           aria-current="page"
         >
          <a
            href="https://www.google.com/"
            tabindex="-1"
          >
            Last
           </a>
         </sgds-breadcrumb-item>
        </div>
      </div>
        `
    );

    // Restore the stubbed fetch method
    fetchStub.restore();
  });
  it("the last breadcrumb-item in breadcrumb gets active true auto assigned", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`<sgds-breadcrumb>
      <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="#">About</a></sgds-breadcrumb-item>
      <sgds-breadcrumb-item><a href="https://www.google.com/">Contacts</a></sgds-breadcrumb-item>
    </sgds-breadcrumb>`);

    const lastItem = el.querySelectorAll("sgds-breadcrumb-item")[2];
    expect(lastItem.active).to.equal(true);
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
      `<sgds-link
        size="md"
        tone="primary"
        variant="primary"
      >
      <slot class="nav-link"></slot>
      </sgds-link>
      <div class="separator">
        <sgds-icon name="chevron-right" size="sm"></sgds-icon>
      </div>
        `
    );
  });

  it("sets tabindex=-1 on the slotted anchor of the active item", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`
      <sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Current</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>
    `);
    const lastItem = el.querySelectorAll("sgds-breadcrumb-item")[1];
    expect(lastItem.querySelector("a")?.getAttribute("tabindex")).to.equal("-1");
  });
  it("does not set tabindex=-1 on non-active item anchors", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`
      <sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Current</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>
    `);
    const firstItem = el.querySelectorAll("sgds-breadcrumb-item")[0];
    expect(firstItem.querySelector("a")?.getAttribute("tabindex")).to.not.equal("-1");
  });
  it("prevents mouse click navigation on the active anchor", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`
      <sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Current</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>
    `);
    const lastItem = el.querySelectorAll("sgds-breadcrumb-item")[1];
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    lastItem.querySelector("a")?.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).to.be.true;
  });
  it("prevents keyboard Enter navigation on the active anchor", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`
      <sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Current</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>
    `);
    const lastItem = el.querySelectorAll("sgds-breadcrumb-item")[1];
    // browsers fire a click event on a focused anchor when Enter is pressed
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    lastItem.querySelector("a")?.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).to.be.true;
  });
  it("does not prevent click navigation on non-active item anchors", async () => {
    const el = await fixture<SgdsBreadcrumb>(html`
      <sgds-breadcrumb>
        <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
        <sgds-breadcrumb-item><a href="#">Current</a></sgds-breadcrumb-item>
      </sgds-breadcrumb>
    `);
    const firstItem = el.querySelectorAll("sgds-breadcrumb-item")[0];
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    firstItem.querySelector("a")?.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).to.be.false;
  });
});
