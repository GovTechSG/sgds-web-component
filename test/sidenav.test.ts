import { aTimeout, assert, elementUpdated, expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import { SgdsSidenavItem, SgdsSidenavLink } from "../src/components";
import "./sgds-web-component";

describe("sgds-sidenav", () => {
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-sidenav></sgds-sidenav>`);
    assert.shadowDom.equal(
      el,
      ` <nav>
         <div>
          <slot></slot>
        </div>
      </nav>`
    );
  });
  it("when sticky=true, adds a sticky class to nav", async () => {
    const el = await fixture(html`<sgds-sidenav sticky></sgds-sidenav>`);
    assert.shadowDom.equal(
      el,
      ` <nav class="sticky">
         <div>
          <slot></slot>
        </div>
      </nav>`
    );
  });
});

describe("sgds-sidenav-item", () => {
  it("without href, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    assert.shadowDom.equal(
      el,
      `  <div class="sidenav-item" aria-haspopup="true">
       <button class="sidenav-btn" aria-expanded="false" aria-current="false" aria-disabled="false">
       <slot name="icon">
          </slot> 
       <slot name="title">
         </slot>
        <slot name="caret-icon">
          <sgds-icon name="chevron-down" size="lg" class="caret-icon"></sgds-icon>
        </slot>
       </button>
       <div class="sidenav-body"
        hidden=""
        style="height: 0px;"
        >
         <div class="sidenav-list">
           <slot class="default">
           </slot>
         </div>
       </div>
     </div>`,
      { ignoreAttributes: ["id", "aria-labelledby", "aria-controls"] }
    );
  });
  it("button id should equal to ul's aria-labelledBy attr", async () => {
    const el = await fixture(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    const button = el.shadowRoot?.querySelector("button");
    const ul = el.shadowRoot?.querySelector(".sidenav-list");
    expect(button?.getAttribute("id")).to.equal(ul?.getAttribute("aria-labelledby"));
  });
  it("div.sidenav-body id should equal to button's aria-controls attr", async () => {
    const el = await fixture(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    const button = el.shadowRoot?.querySelector("button");
    const collapse = el.shadowRoot?.querySelector("div.sidenav-body");
    expect(collapse?.getAttribute("id")).to.equal(button?.getAttribute("aria-controls"));
  });
  it("with href, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sgds-sidenav-item href="#"></sgds-sidenav-item>`);
    assert.shadowDom.equal(
      el,
      `    <div class="sidenav-item" aria-haspopup="false">
       <a
         class="sidenav-btn"
         href="#"
         aria-current="false"
         aria-disabled="false"
       >
          <slot name="icon"></slot>
          <slot name="title"></slot>
       </a>
       </div
       `
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
  it("show and hide methods changes active class of sidenav button", async () => {
    const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item></sgds-sidenav-item>`);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).not.to.contain("active");
    el.show();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).to.contain("active");
    el.hide();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).not.to.contain("active");
  });
  it("show and hide methods changes active class of sidenav button when href defined", async () => {
    const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item href="#"></sgds-sidenav-item>`);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain("active");
    el.show();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).to.contain("active");
    el.hide();
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
  // it("when clicked on an inactive sidenav-btn link, turns it into active", async () => {
  //   const el = await fixture<SgdsSidenavItem>(html`<sgds-sidenav-item href="#"></sgds-sidenav-item>`);
  //   expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain("active");
  //   el.shadowRoot?.querySelector("a")?.click();
  //   await elementUpdated(el);
  //   expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
  // });
});

describe("sgds-sidenav, -item, -link interactions", () => {
  it("if 1st level child link is active, sidenav-item parent is active", async () => {
    const el = await fixture(html`<sgds-sidenav>
      <sgds-sidenav-item class="first-level">
        <div slot="title">Level 1 item</div>
        <sgds-sidenav-link active>
          <a href="#">Level 2 link</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link>
          <a href="#">Level 2 link</a>
        </sgds-sidenav-link>
        <sgds-sidenav-item class="second-level">
          <div slot="title">Level 2 item</div>
          <sgds-sidenav-link>
            <a href="#">Level 3 link</a>
          </sgds-sidenav-link>
          <sgds-sidenav-link>
            <a href="#">Level 3 link</a>
          </sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav-item>
    </sgds-sidenav>`);

    expect(el.querySelector("sgds-sidenav-item.first-level")?.hasAttribute("active")).to.be.true;
    expect(el.querySelector("sgds-sidenav-item.second-level")?.hasAttribute("active")).to.be.false;
  });
  it("if 2nd level child link is active, sidenav-item parent is active", async () => {
    const el = await fixture(html`<sgds-sidenav>
      <sgds-sidenav-item class="first-level">
        <div slot="title">Level 1 item</div>
        <sgds-sidenav-link>
          <a href="#">Level 2 link</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link>
          <a href="#">Level 2 link</a>
        </sgds-sidenav-link>
        <sgds-sidenav-item class="second-level">
          <div slot="title">Level 2 item</div>
          <sgds-sidenav-link active><a href="#">Level 3 link</a> </sgds-sidenav-link>
          <sgds-sidenav-link>
            <a href="#">Level 3 link</a>
          </sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav-item>
    </sgds-sidenav>`);

    expect(el.querySelector("sgds-sidenav-item.first-level")?.hasAttribute("active")).to.be.true;
    expect(el.querySelector("sgds-sidenav-item.second-level")?.hasAttribute("active")).to.be.true;
  });
  it("when clicking on sidenav-link, active sidenav-item remains open", async () => {
    const hideHandler = sinon.spy();
    const el = await fixture(html`<sgds-sidenav>
      <sgds-sidenav-item active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link data-test="link"><a href="#">Level 1 link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">Level 1 link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">Level 1 link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item>
        <span slot="title">Title 2</span>
        <sgds-sidenav-link><a href="#">Level 2 link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">Level 2 link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">Level 2 link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item href="#">
        <span slot="title">Title 3</span>
      </sgds-sidenav-item>
    </sgds-sidenav>`);
    el.addEventListener("sgds-hide", hideHandler);
    const SgdsSidenavItemOne = el.querySelectorAll("sgds-sidenav-item")[0];
    const sidenavLinkOne = el.querySelector<SgdsSidenavLink>("sgds-sidenav-link[data-test='link']");
    sidenavLinkOne?.click();
    await aTimeout(500);
    expect(hideHandler).not.to.be.called;
    expect(SgdsSidenavItemOne.shadowRoot?.querySelector("div.sidenav-body")).not.to.have.attribute("hidden");
  });
});

describe("SgdsSidenavLink", () => {
  it("matches semantic shadowdom", async () => {
    const el = await fixture(html`<sgds-sidenav-link></sgds-sidenav-link>`);
    assert.shadowDom.equal(el, ` <slot></slot>`);
  });
  it("when disabled is change to true , slot anchor has tabindex=-1", async () => {
    const el = await fixture<SgdsSidenavLink>(
      html`<sgds-sidenav-link disabled><a href="#">link</a></sgds-sidenav-link>`
    );

    const anchor = el.querySelector("a");
    expect(anchor).to.have.attribute("tabindex", "-1");

    el.disabled = false;
    await waitUntil(() => !anchor?.hasAttribute("tabindex"));
    expect(anchor?.hasAttribute("tabindex")).to.be.false;
  });
  it("when disabled true , slot anchor and sidenav-link itself have aria-disabled=true", async () => {
    const el = await fixture<SgdsSidenavLink>(
      html`<sgds-sidenav-link disabled><a href="#">link</a></sgds-sidenav-link>`
    );

    const anchor = el.querySelector("a");
    expect(anchor).to.have.attribute("aria-disabled", "true");
    expect(el).to.have.attribute("aria-disabled", "true");
    el.disabled = false;
    await waitUntil(() => anchor?.getAttribute("aria-disabled") === "false");
    expect(el).to.have.attribute("aria-disabled", "false");
  });
});
describe("a11y - sgds-sidenav-item", () => {
  it("button have aria-expanded=true when active", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link active><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("aria-expanded", "true");
  });
  it("button to have aria-expanded=true when child is active", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link active><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("aria-expanded", "true");
  });
  it("button to have a default aria-controls pointing to id of div.sidenav-body element", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link active><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    const buttonAriaControlAttr = button?.getAttribute("aria-controls");
    const collapseId = el.shadowRoot?.querySelector("div.sidenav-body")?.getAttribute("id");
    expect(collapseId).to.contain("sidenav");
    expect(collapseId).to.contain("collapse");
    expect(buttonAriaControlAttr).to.equal(collapseId);
  });
  it("ul.sidenav-list el to have a default aria-labelledby pointing to id of button element", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link active><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    const buttonId = button?.getAttribute("id");
    expect(buttonId).to.contain("button");
    expect(buttonId).to.contain("sidenav");
    const divSideNavListAttr = el.shadowRoot?.querySelector("div.sidenav-list")?.getAttribute("aria-labelledby");
    expect(buttonId).to.equal(divSideNavListAttr);
  });
  it("when active, button should have aria-current=true ", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link active><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const button = el.shadowRoot?.querySelector("button");
    expect(button).to.have.attribute("aria-current", "true");
  });
  it("when active, anchor should have aria-current=true ", async () => {
    const el = await fixture(html`
      <sgds-sidenav-item href="#" active>
        <span slot="title">Title 1</span>
        <sgds-sidenav-link active><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
        <sgds-sidenav-link><a href="#">link</a></sgds-sidenav-link>
      </sgds-sidenav-item>
    `);
    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor).to.have.attribute("aria-current", "true");
  });
});
