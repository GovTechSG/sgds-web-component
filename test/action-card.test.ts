import {
    aTimeout,
    expect,
    fixture,
    html,
    oneEvent,
    assert,
    waitUntil,
    elementUpdated,
  } from "@open-wc/testing";
  import sinon from "sinon";
  import "../src/ActionCard";
  import { SgdsActionCard } from "../src/ActionCard";
  import "../src/Checkbox";
  import "../src/Radio";
  import { SgdsCheckbox } from "../src/Checkbox";
  import { SgdsButton } from "../src/Button";
  import { sendKeys } from "@web/test-runner-commands";
  import { CardElement } from "../src/utils/card-element";
  import { Button } from "bootstrap";
  
  describe("<sgds-action-card>", () => {
    // Card test cases
    it("is defined", () => {
      const el = document.createElement("sgds-action-card");
      assert.instanceOf(el, SgdsActionCard);
    });
  
    it("should have sgds prefix on wrapper", async () => {
      const el = await fixture(html`<sgds-action-card></sgds-action-card>`);
      const slCard = el.shadowRoot?.querySelector("div");
      expect(slCard?.classList.value).to.contain("sgds");
    });
  
    it("accepts a bg prop", async () => {
      const el = await fixture(html`<sgds-action-card></sgds-action-card>`);
      el?.setAttribute("bgColor", "primary");
      await elementUpdated(el);
      const bgColor = el.shadowRoot?.querySelector("div");
      expect(bgColor?.classList.value).to.contain("bg-primary");
    });
  
    it("accepts a text prop", async () => {
      const el = await fixture(html`<sgds-action-card></sgds-action-card>`);
      el?.setAttribute("borderColor", "primary");
      await elementUpdated(el);
      const borderColor = el.shadowRoot?.querySelector("div");
      expect(borderColor?.classList.value).to.contain("border-primary");
    });
  
    it("accepts a border prop", async () => {
      const el = await fixture(html`<sgds-action-card></sgds-action-card>`);
      el?.setAttribute("textColor", "primary");
      await elementUpdated(el);
      const bgColor = el.shadowRoot?.querySelector("div");
      expect(bgColor?.classList.value).to.contain("text-primary");
    });
  
    it("can be semantically compare with shadowDom trees", async () => {
      const el = await fixture(
        html`<sgds-action-card inputId="checkbox"></sgds-action-card>`
      );
      assert.shadowDom.equal(
        el,
        `
        <div tabindex="0" variant="card-action" class="sgds card
            
          ">
          <div class="card-body">
            <h6 class="text-muted card-subtitle">
              <div>
              
                <slot name="card-subtitle"></slot>
                </div>
              <div class="card-input">
             <sgds-checkbox checkboxid="checkbox" arialabel="checkbox"></sgds-checkbox>
            </div>
            </h6>
            <h5 class="card-title"><slot name="card-title"></slot></h5>
            <p class="card-text"><slot name="card-text"></slot></p>
          </div>
        </div>
      `
      );
    });
  
    it("it should have type checkbox and variant card-action by default", async () => {
      const el = await fixture(html`<sgds-action-card></sgds-action-card>`);
      expect(el?.getAttribute("type")).to.equal("checkbox");
      expect(el?.getAttribute("variant")).to.equal("card-action");
    });
  
    it("it should have type radio when specified", async () => {
      const el = await fixture(
        html`<sgds-action-card type="radio"></sgds-action-card>`
      );
      expect(el?.getAttribute("type")).to.equal("radio");
    });
  
    it("when card is clicked, card should contain class is-active", async () => {
      const el = await fixture<SgdsActionCard>(
        html`<sgds-action-card></sgds-action-card>`
      );
  
      expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class(
        "is-active"
      );
      const cardBody = el.shadowRoot?.querySelector(
        "div.card-body"
      ) as HTMLInputElement;
      cardBody.click();
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector("div.sgds.card")).to.have.class(
        "is-active"
      );
    });
  
    it("when card is disabled, card should be clickable and does not contain class is-active", async () => {
      const el = await fixture<SgdsActionCard>(
        html`<sgds-action-card disabled></sgds-action-card>`
      );
  
      expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class(
        "is-active"
      );
      const cardBody = el.shadowRoot?.querySelector(
        "div.card-body"
      ) as HTMLInputElement;
      cardBody.click();
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class(
        "is-active"
      );
    });
  
    it("when card is focus, card should be able to be checked with key Enter and contains class is-active", async () => {
      const el = await fixture<SgdsActionCard>(
        html`<sgds-action-card></sgds-action-card>`
      );
  
      expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class(
        "is-active"
      );
      // const cardBody = el.shadowRoot?.querySelector(
      //   "div.card-body"
      // ) as HTMLInputElement;
      const card = el.shadowRoot?.querySelector(
        "div.sgds.card"
      ) as HTMLInputElement;
      card.focus();
      await sendKeys({ press: "Enter" });
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector("div.sgds.card")).to.have.class(
        "is-active"
      );
    });
  });
  
  