import { SgdsSidenav, SgdsSidenavItem, SgdsSidenavLink } from "../src/components";
import "../src/index";
import { fixture, assert, expect, waitUntil, elementUpdated, aTimeout } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";

describe("sgds-sidenav", () => {
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-sidenav></sgds-sidenav>`);
    assert.shadowDom.equal(
      el,
      ` <nav class="sidenav">
         <ul>
          <slot></slot>
        </ul>
      </nav>`
    );
  });
});

describe("sgds-sidenav-item", () => {
  it("without href, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    assert.shadowDom.equal(
      el,
      `  <li class="sidenav-item" aria-haspopup="true">
       <button class="collapsed sidenav-btn" aria-expanded="false" aria-selected="false" aria-disabled="false">
       <slot name="icon">
          </slot> 
       <slot name="title">
         </slot>
       </button>
       <div class="collapse">
         <ul class="sidenav-list">
           <slot>
           </slot>
         </ul>
       </div>
     </li>`,
      { ignoreAttributes: ["id", "aria-labelledby", "aria-controls"] }
    );
  });
  it("button id should equal to ul's aria-labelledBy attr", async () => {
    const el = await fixture(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    const button = el.shadowRoot?.querySelector("button");
    const ul = el.shadowRoot?.querySelector("ul");
    expect(button?.getAttribute("id")).to.equal(ul?.getAttribute("aria-labelledby"));
  });
  it("div.collapse id should equal to button's aria-controls attr", async () => {
    const el = await fixture(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    const button = el.shadowRoot?.querySelector("button");
    const collapse = el.shadowRoot?.querySelector("div.collapse");
    expect(collapse?.getAttribute("id")).to.equal(button?.getAttribute("aria-controls"));
  });
  it("with href, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-sidenav-item href="#"></sgds-sidenav-item>`);
    assert.shadowDom.equal(
      el,
      `    <li class="sidenav-item" aria-haspopup="false">
       <a
         class="sidenav-btn"
         href="#"
         aria-selected="false"
         aria-disabled="false"
       >
          <slot name="icon"></slot>
          <slot name="title"></slot>
       </a>`
    );
  });
  it("when active is true, it conveys active class to .sidenav-btn", async () => {
    const el = await fixture(html`<sgds-sidenav-item active></sgds-sidenav-item>`);
    const sideNavBtn = el.shadowRoot?.querySelector(".sidenav-btn");
    expect(sideNavBtn?.classList.value).to.contain("active");
  });
  it("when active is true, with href defined, it conveys active class to .sidenav-btn", async () => {
    const el = await fixture(html`<sgds-sidenav-item active href="#"></sgds-sidenav-item>`);
    const sideNavBtn = el.shadowRoot?.querySelector(".sidenav-btn");
    expect(sideNavBtn?.classList.value).to.contain("active");
  });
  it("when disabled is true it conveys disabled class to .sidenav-btn and attributes", async () => {
    const el = await fixture(html`<sgds-sidenav-item disabled></sgds-sidenav-item>`);
    const sideNavBtn = el.shadowRoot?.querySelector(".sidenav-btn");
    expect(sideNavBtn?.classList.value).to.contain("disabled");
    expect(sideNavBtn).to.have.attribute("disabled");
    expect(sideNavBtn).to.have.attribute("aria-disabled", "true");
  });
  it("should emit sgds-toggle event when button is clicked", async () => {
    const el = await fixture(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-toggle", toggleHandler);
    el.shadowRoot?.querySelector("button")?.click();
    expect(toggleHandler).to.have.been.calledOnce;
  });
  it("as a link (href defined), should emit sgds-toggle event when button is clicked", async () => {
    const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item href="#"></sgds-sidenav-item>`);

    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-toggle", toggleHandler);

    el.shadowRoot?.querySelector("a")?.click();
    expect(toggleHandler).to.have.been.calledOnce;
  });
  it("openItem and closeItem methods changes active class of sidenav button", async () => {
    const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).not.to.contain("active");
    el.openItem();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).to.contain("active");
    el.closeItem();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).not.to.contain("active");
  });
  it("openItem and closeItem methods changes active class of sidenav button when href defined", async () => {
    const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item href="#"></sgds-sidenav-item>`);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain("active");
    el.openItem();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).to.contain("active");
    el.closeItem();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain("active");
  });
  it("when clicked on an inactive sidenav-btn, turns it into active", async () => {
    const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).not.to.contain("active");
    el.shadowRoot?.querySelector("button")?.click();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("button")).to.have.class("active");
  });
  it("when clicked on an inactive sidenav-btn link, turns it into active", async () => {
    const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item href="#"></sgds-sidenav-item>`);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain("active");
    el.shadowRoot?.querySelector("a")?.click();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
  });
});

describe("sgds-sidenav, -item, -link interactions", () => {
  it("by default when click on another item (link or button) should close opened sidenav", async () => {
    const el = await fixture(html` <sgds-sidenav>
      <sgds-sidenav-item active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item>
        <span slot="title">Title 2</span>
        <sgds-sidenav-link href="https://google.com">4</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">5</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">6</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item href="#">
        <span slot="title">Title 3</span>
      </sgds-sidenav-item>
    </sgds-sidenav>`);
    // assert.shadowDom.equal(el, 'test')
    expect(el.querySelectorAll("sgds-sidenav-item").length).to.equal(3);
    const SgdsSidenavItemOne = el.querySelectorAll("sgds-sidenav-item")[0];
    const SgdsSidenavItemTwo = el.querySelectorAll("sgds-sidenav-item")[1];
    const SgdsSidenavItemThree = el.querySelectorAll("sgds-sidenav-item")[2];

    expect(SgdsSidenavItemThree.shadowRoot?.querySelector("div")).to.be.null;
    await waitUntil(() => SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse"));
    await waitUntil(() => SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse"));
    expect(SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse")).to.have.class("show");
    expect(SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse")).not.to.have.class("show");

    //onclick SgdsSidenavItemTwo button, should remove show from first
    SgdsSidenavItemTwo?.shadowRoot?.querySelector("button")?.click();

    await waitUntil(() => SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse.show"));
    expect(SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse")).not.to.have.class("show");
    expect(SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse")).to.have.class("show");

    // click on link should collapse the other two side navs
    SgdsSidenavItemThree?.shadowRoot?.querySelector("a")?.click();

    // wait sometime for collapse to take place
    await aTimeout(500);
    expect(SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse")).not.to.have.class("show");
    expect(SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse")).not.to.have.class("show");
    expect(SgdsSidenavItemThree.shadowRoot?.querySelector("a.sidenav-btn")).to.have.class("active");
  });
  it("when alwaysOpen is true, click on another item (link or button) should NOT close other opened sidenav", async () => {
    const el = await fixture(html` <sgds-sidenav alwaysOpen>
      <sgds-sidenav-item active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item>
        <span slot="title">Title 2</span>
        <sgds-sidenav-link href="https://google.com">4</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">5</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">6</sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item href="#">
        <span slot="title">Title 3</span>
      </sgds-sidenav-item>
    </sgds-sidenav>`);

    expect(el.querySelectorAll("sgds-sidenav-item").length).to.equal(3);
    const SgdsSidenavItemOne = el.querySelectorAll("sgds-sidenav-item")[0];
    const SgdsSidenavItemTwo = el.querySelectorAll("sgds-sidenav-item")[1];
    const SgdsSidenavItemThree = el.querySelectorAll("sgds-sidenav-item")[2];

    expect(SgdsSidenavItemThree.shadowRoot?.querySelector("div")).to.be.null;
    await waitUntil(() => SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse"));
    await waitUntil(() => SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse"));
    expect(SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse")).to.have.class("show");
    expect(SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse")).not.to.have.class("show");

    //onclick SgdsSidenavItemTwo button, should NOT remove show from first
    SgdsSidenavItemTwo?.shadowRoot?.querySelector("button")?.click();

    await waitUntil(() => SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse.show"));
    expect(SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse")).to.have.class("show");
    expect(SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse")).to.have.class("show");

    // click on link should NOT collapse the other two side navs
    SgdsSidenavItemThree?.shadowRoot?.querySelector("a")?.click();

    // wait sometime for collapse to take place
    await aTimeout(500);
    expect(SgdsSidenavItemOne.shadowRoot?.querySelector("div.collapse")).to.have.class("show");
    expect(SgdsSidenavItemTwo.shadowRoot?.querySelector("div.collapse")).to.have.class("show");
    expect(SgdsSidenavItemThree.shadowRoot?.querySelector("a.sidenav-btn")).to.have.class("active");
  });
});
describe("a11y - sgds-sidenav-item", () => {
  it("button have aria-expanded=true when active", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("aria-expanded", "true");
  });
  it("button to have aria-expanded=false when not active", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("aria-expanded", "false");
  });
  it("button to have a default aria-controls pointing to id of div.collapse element", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    const buttonAriaControlAttr = button?.getAttribute("aria-controls");
    const collapseId = el.shadowRoot?.querySelector("div.collapse")?.getAttribute("id");
    expect(collapseId).to.contain("sidenav");
    expect(collapseId).to.contain("collapse");
    expect(buttonAriaControlAttr).to.equal(collapseId);
  });
  it("ul.sidenav-list el to have a default aria-labelledby pointing to id of button element", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    const buttonId = button?.getAttribute("id");
    expect(buttonId).to.contain("button");
    expect(buttonId).to.contain("sidenav");
    const ulSideNavListAttr = el.shadowRoot?.querySelector("ul.sidenav-list")?.getAttribute("aria-labelledby");
    expect(buttonId).to.equal(ulSideNavListAttr);
  });
  it("when active, button should have aria-selected=true ", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("aria-selected", "true");
  });
  it("when active, anchor should have aria-selected=true ", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item href="#" active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link href="https://google.com" active>1</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">2</sgds-sidenav-link>
        <sgds-sidenav-link href="https://google.com">3</sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor).to.have.attribute("aria-selected", "true");
  });
});
