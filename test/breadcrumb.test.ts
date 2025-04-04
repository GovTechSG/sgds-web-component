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
         <sgds-breadcrumb-item
         >
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
           <a href="https://www.google.com/">
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
      `<slot class="nav-link"></slot>
      <div class="separator">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.90413 2.13558C4.947 2.0926 4.99793 2.0585 5.05399 2.03524C5.11006 2.01198 5.17016 2 5.23086 2C5.29157 2 5.35167 2.01198 5.40774 2.03524C5.4638 2.0585 5.51473 2.0926 5.55759 2.13558L11.0954 7.67339C11.1384 7.71626 11.1725 7.76718 11.1957 7.82325C11.219 7.87932 11.231 7.93942 11.231 8.00012C11.231 8.06082 11.219 8.12093 11.1957 8.17699C11.1725 8.23306 11.1384 8.28398 11.0954 8.32685L5.55759 13.8647C5.47094 13.9513 5.35341 14 5.23086 14C5.10832 14 4.99079 13.9513 4.90413 13.8647C4.81748 13.778 4.7688 13.6605 4.7688 13.5379C4.7688 13.4154 4.81748 13.2979 4.90413 13.2112L10.1161 8.00012L4.90413 2.78904C4.86116 2.74617 4.82706 2.69525 4.80379 2.63918C4.78053 2.58312 4.76855 2.52301 4.76855 2.46231C4.76855 2.40161 4.78053 2.3415 4.80379 2.28544C4.82706 2.22937 4.86116 2.17845 4.90413 2.13558Z"
            fill="#757575"
          />
        </svg>
      </div>
        `
    );
  });
});
