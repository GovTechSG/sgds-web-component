import { SideNavElement, SideNavItem, SideNavLink } from "../src/SideNav";
import "../src/SideNav";
import {
  fixture,
  assert,
  oneEvent,
  expect,
  waitUntil,
  elementUpdated,
  fixtureCleanup,
} from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import { EventEmitter } from "events";
describe("sidenav-element", () => {
  afterEach(() => {
    sinon.restore();
    fixtureCleanup();
  });
  it("is defined", () => {
    const el = document.createElement("sidenav-element");
    assert.instanceOf(el, SideNavElement);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sidenav-element></sidenav-element>`);
    assert.shadowDom.equal(
      el,
      ` <nav class="sidenav">
        <slot></slot>
      </nav>`
    );
  });

  //   it("when alwaysOpen is false, it has an event listern openEventOnClick", async (done) => {
  //    try{

  //     // const spyListener =  sinon.spy(document, 'addEventListener')
  //     const el = await fixture(html`<sidenav-element>
  //       <!-- <sidenav-item active></sidenav-item>
  //       <sidenav-item></sidenav-item> -->
  //   </sidenav-element>`);
  //   const spy = sinon.spy()
  // const emitter = new EventEmitter()
  // emitter.on('openEventOnClick', spy)
  // emitter.emit('openEventOnClick')
  // sinon.assert.calledOnce(spy)
  //     // const itemBtn = el.querySelectorAll('sidenav-item')[1]?.shadowRoot?.querySelector('button')

  //     // itemBtn?.click()
  //     // await waitUntil(() => {
  //     //   // spyListener.calledOnce
  //     //   expect(spyListener).to.have.been.calledOnce
  //     // } )
  //   }catch (e) {
  //     done(e)
  //     console.log(e,'inerror')
  //   }
  //     // expect(el.querySelector('sidenav-item')?.shadowRoot?.querySelector('button')?.classList).to.contain('active')
  // });
});

describe("sidenav-item", () => {
  it("is defined", () => {
    const el = document.createElement("sidenav-item");
    assert.instanceOf(el, SideNavItem);
  });
  it("without href, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sidenav-item></sidenav-item>`);
    assert.shadowDom.equal(
      el,
      `  <li class="sidenav-item">
       <button class="collapsed sidenav-btn">
         <slot name="title">
         </slot>
       </button>
       <div class="collapse">
         <ul class="sidenav-list">
           <slot>
           </slot>
         </ul>
       </div>
     </li>`
    );
  });
  it("with href, can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sidenav-item href="#"></sidenav-item>`);
    assert.shadowDom.equal(
      el,
      `    <li class="sidenav-item">
       <a
         class="sidenav-btn"
         href="#"
       >
           <slot name="title">
           </slot>
       </a>`
    );
  });
  it("when active is true, it conveys active class to .sidenav-btn", async () => {
    const el = await fixture(html`<sidenav-item active></sidenav-item>`);
    const sideNavBtn = el.shadowRoot?.querySelector(".sidenav-btn");
    expect(sideNavBtn?.classList.value).to.contain("active");
  });
  it("when active is true, with href defined, it conveys active class to .sidenav-btn", async () => {
    const el = await fixture(
      html`<sidenav-item active href="#"></sidenav-item>`
    );
    const sideNavBtn = el.shadowRoot?.querySelector(".sidenav-btn");
    expect(sideNavBtn?.classList.value).to.contain("active");
  });
  it("should emit toggle-onclick event when button is clicked", async () => {
    const el = await fixture(html`<sidenav-item></sidenav-item>`);
    const toggleHandler = sinon.spy();
    el.addEventListener("toggle-onclick", toggleHandler);
    el.shadowRoot?.querySelector("button")?.click();
    // await elementUpdated(el)
    // await waitUntil(() => {
    //    return toggleHandler.calledOnce
    //   // done()
    // })
    expect(toggleHandler).to.have.been.calledOnce;
  });
  it("as a link (href defined), should emit toggle-onclick event when button is clicked", async () => {
    const el = await fixture<SideNavItem>(
      html`<sidenav-item href="#"></sidenav-item>`
    );
    const toggleHandler = sinon.spy();
    el.addEventListener("toggle-onclick", toggleHandler);

    el.shadowRoot?.querySelector("a")?.click();
    expect(toggleHandler).to.have.been.calledOnce;

    // expect(bsCollapseShowHandler).to.have.been.calledOnce;
  });
  it("openItem and closeItem methods changes active class of sidenav button", async () => {
    const el = await fixture<SideNavItem>(html`<sidenav-item></sidenav-item>`);
    expect(
      el.shadowRoot?.querySelector("button")?.classList.value
    ).not.to.contain("active");
    el.openItem();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("button")?.classList.value).to.contain(
      "active"
    );
    el.closeItem();
    await elementUpdated(el);
    expect(
      el.shadowRoot?.querySelector("button")?.classList.value
    ).not.to.contain("active");
  });
  it("openItem and closeItem methods changes active class of sidenav button when href defined", async () => {
    const el = await fixture<SideNavItem>(
      html`<sidenav-item href="#"></sidenav-item>`
    );
    expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain(
      "active"
    );
    el.openItem();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).to.contain(
      "active"
    );
    el.closeItem();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain(
      "active"
    );
  });
  it("when clicked on an inactive sidenav-btn, turns it into active", async () => {
    const el = await fixture<SideNavItem>(html`<sidenav-item></sidenav-item>`);
    expect(
      el.shadowRoot?.querySelector("button")?.classList.value
    ).not.to.contain("active");
    el.shadowRoot?.querySelector("button")?.click();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("button")).to.have.class("active");
  });
  it("when clicked on an inactive sidenav-btn link, turns it into active", async () => {
    const el = await fixture<SideNavItem>(
      html`<sidenav-item href="#"></sidenav-item>`
    );
    expect(el.shadowRoot?.querySelector("a")?.classList.value).not.to.contain(
      "active"
    );
    el.shadowRoot?.querySelector("a")?.click();
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
    // el.shadowRoot?.querySelector("a")?.click();
    // await elementUpdated(el);
    // expect(el.shadowRoot?.querySelector("a")).not.to.have.class("active");
  });
  //TODO: DOES NOT WORK
  // it("when clicked on an active sidenav-btn, turns it into inactive", async () => {
  //   const el = await fixture<SideNavItem>(
  //     html`<sidenav-item active></sidenav-item>`
  //   );
  //   expect(el.shadowRoot?.querySelector("button")?.classList.value).to.contain(
  //     "active"
  //   );
  //   el.shadowRoot?.querySelector("button")?.click();
  //   await elementUpdated(el);
  //   expect(el.shadowRoot?.querySelector("button")).not.to.have.class("active");
  // });
});

describe("sidenav-link", () => {
  it("is defined", () => {
    const el = document.createElement("sidenav-link");
    assert.instanceOf(el, SideNavLink);
  });
  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<sidenav-link></sidenav-link>`);
    assert.shadowDom.equal(
      el,
      `  <li>
        <a
          class="nav-link"
          href=""
        >
          <slot>
          </slot>
        </a>
      </li>`
    );
  });
  it("href prop is forwarded to a tag href attr", async () => {
    const el = await fixture(html`<sidenav-link href="#">test</sidenav-link>`);
    expect(el.shadowRoot?.querySelector("a")).to.have.attribute("href", "#");
  });
  it("active prop is forwarded to <a> class", async () => {
    const el = await fixture(html`<sidenav-link active>test</sidenav-link>`);
    expect(el.shadowRoot?.querySelector("a")).to.have.class("active");
  });
});

describe("sidenav-element, -item, -link interactions", () => {
  it("test", async () => {
    const el = await fixture(html` <sidenav-element>
    <sidenav-item active>
        <span slot="title">Title 1</span>
        <sidenav-link href="https://google.com" active>1</sidenav-link>
        <sidenav-link href="https://google.com" >2</sidenav-link>
        <sidenav-link href="https://google.com" >3</sidenav-link>
    </sidenav-item>
    <sidenav-item>
        <span slot="title">Title 2</span>
        <sidenav-link href="https://google.com">4</sidenav-link>
        <sidenav-link href="https://google.com" >5</sidenav-link>
        <sidenav-link href="https://google.com" >6</sidenav-link>
    </sidenav-item>
    <sidenav-item href="#">
        <span slot="title">Title 3</span>
    </sidenav-item>
</sidenav-element>`);
assert.shadowDom.equal('test')
  });

});
