import { assert, expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";
import { SgdsAlert } from "../src/components";
import type { SgdsCloseButton } from "../src/internals/CloseButton/sgds-close-button";
import "./sgds-web-component";

describe("<sgds-alert-link>", () => {
  it("semantically matches the DOM", async () => {
    const el = await fixture(html`<sgds-alert-link></sgds-alert-link>`);
    assert.shadowDom.equal(
      el,
      `<a class="alert-link" tabindex="0"><slot></slot> </a>
        `
    );
  });
  it("href attribute forwarded to a", async () => {
    const el = await fixture(html`<sgds-alert-link href="#"></sgds-alert-link>`);
    assert.shadowDom.equal(
      el,
      `<a class="alert-link" href="#" tabindex="0"><slot></slot> </a>
        `
    );
  });
  it("target attribute forwarded to a", async () => {
    const el = await fixture(html`<sgds-alert-link target="_blank"></sgds-alert-link>`);
    assert.shadowDom.equal(
      el,
      `<a class="alert-link" target="_blank" tabindex="0"><slot></slot> </a>
        `
    );
  });
});
describe("<Alert>", () => {
  it("semantically matches the dom", async () => {
    const el = await fixture(html`<sgds-alert show></sgds-alert>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="alert show" role="alert" aria-hidden="false">
        <slot name="icon"></slot>
        <div class="alert-content">
           <slot></slot>
          </div>        
        </div>
      `
    );
  });
  it("semantically matches the dom when slot name=icon has slotted elements", async () => {
    const el = await fixture(html`<sgds-alert show>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-0-circle"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.988 12.158c-1.851 0-2.941-1.57-2.941-3.99V7.84c0-2.408 1.101-3.996 2.965-3.996 1.857 0 2.935 1.57 2.935 3.996v.328c0 2.408-1.101 3.99-2.959 3.99ZM8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895Z"
        />
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z" />
      </svg>
    </sgds-alert>`);
    assert.shadowDom.equal(
      el,
      `
        <div class="alert show" role="alert" aria-hidden="false">
           <slot name="icon"><svg slot="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-0-circle" viewBox="0 0 16 16">
                    <path
                        d="M7.988 12.158c-1.851 0-2.941-1.57-2.941-3.99V7.84c0-2.408 1.101-3.996 2.965-3.996 1.857 0 2.935 1.57 2.935 3.996v.328c0 2.408-1.101 3.99-2.959 3.99ZM8 4.951c-1.008 0-1.629 1.09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895Z" />
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z" />
                </svg>  
                </slot>
        <div class="alert-content">
           <slot></slot>
          </div>        
        </div>
      `
    );
  });
  it("Should output a alert with message", async () => {
    const message = "This is a test alert";
    const el = await fixture<SgdsAlert>(html` <sgds-alert show>${message}</sgds-alert> `);

    const alert = el.shadowRoot?.querySelector(".alert");
    assert.exists(alert, "Alert element exists");

    const slot = el.shadowRoot?.querySelectorAll("slot");
    const slotContent = slot?.[1].assignedNodes()[0]?.textContent;
    expect(slotContent).to.equal(message);
  });

  it("Should have dismissible style", async () => {
    const el = await fixture<SgdsAlert>(html` <sgds-alert show dismissible></sgds-alert> `);

    const alert = el.shadowRoot?.querySelector(".alert");
    expect(alert?.classList.value).to.contain("alert-dismissible");
  });
  it('Should default to variant="info"', async () => {
    const el = await fixture<SgdsAlert>(html` <sgds-alert show></sgds-alert> `);

    expect(el.getAttribute("variant")).to.equal("info");
  });

  it("Should emit the sgds-hide event on dismiss click of close button", async () => {
    const el = await fixture<SgdsAlert>(html`<sgds-alert show dismissible></sgds-alert>`);
    const onCloseSpy = sinon.spy();
    el.addEventListener("sgds-hide", onCloseSpy);

    const closeButton = el.shadowRoot?.querySelector("sgds-close-button") as SgdsCloseButton;
    closeButton?.click();
    await el.updateComplete;
    expect(el.show).to.be.false;
    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it("Should emit the sgds-show event when alert show state is true", async () => {
    const el = await fixture<SgdsAlert>(html`<sgds-alert></sgds-alert>`);
    const onShowSpy = sinon.spy();
    el.addEventListener("sgds-show", onShowSpy);

    el.show = true;
    await el.updateComplete;
    expect(el.show).to.be.true;
    expect(onShowSpy).to.have.been.calledOnce;
  });

  it("Should have the variant that is passed in", async () => {
    const el = await fixture<SgdsAlert>(html` <sgds-alert variant="warning" show></sgds-alert> `);
    expect(el.getAttribute("variant")).to.equal("warning");
  });

  it("when show is false and dismissible, should remove from shadow DOM", async () => {
    const el = await fixture<SgdsAlert>(html`<sgds-alert dismissible>Test alert</sgds-alert>`);
    const base = el.shadowRoot?.querySelector(".alert");
    assert.notExists(base, "Alert element not exists");
  });

  it("when show is true, alert should have show class", async () => {
    const el = await fixture<SgdsAlert>(html`<sgds-alert show>Test alert</sgds-alert>`);
    const base = el.shadowRoot?.querySelector(".alert");
    expect(base?.classList.contains("show")).to.be.true;
  });

  describe("Web Accessibility", () => {
    it("Should have alert role", async () => {
      const el = await fixture<SgdsAlert>(html`<sgds-alert show></sgds-alert>`);
      const alertEl = el.shadowRoot?.querySelector("div.alert");
      assert.equal(alertEl?.getAttribute("role"), "alert");
    });
  });
});
