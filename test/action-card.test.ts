import { assert, elementUpdated, expect, fixture, html, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import "../src/components/ActionCard";
import { SgdsActionCard } from "../src/components/ActionCard";
import "../src/components/Checkbox";
import "../src/components/Radio";

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
    const el = await fixture(html`<sgds-action-card inputId="checkbox"></sgds-action-card>`);
    assert.shadowDom.equal(
      el,
      `
        <div tabindex="0" variant="card-action" class="sgds card
            
          ">
          <div class="card-body">
            <h6 class="text-muted card-subtitle">
              <div>
              <slot name="icon"></slot>
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

  it("it should have type checkbox by default", async () => {
    const el = await fixture(html`<sgds-action-card></sgds-action-card>`);
    expect(el?.getAttribute("type")).to.equal("checkbox");
    expect(el.shadowRoot?.querySelector("sgds-checkbox")).to.exist;
    expect(el.shadowRoot?.querySelector("sgds-radio")).not.to.exist;
  });

  it("it should have type radio when specified", async () => {
    const el = await fixture(html`<sgds-action-card type="radio"></sgds-action-card>`);
    expect(el?.getAttribute("type")).to.equal("radio");
    expect(el.shadowRoot?.querySelector("sgds-checkbox")).not.to.exist;
    expect(el.shadowRoot?.querySelector("sgds-radio")).to.exist;
  });

  it("when card is clicked, card should contain class is-active", async () => {
    const el = await fixture<SgdsActionCard>(html`<sgds-action-card></sgds-action-card>`);

    expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class("is-active");
    const cardBody = el.shadowRoot?.querySelector("div.card-body") as HTMLInputElement;
    cardBody.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("div.sgds.card")).to.have.class("is-active");
  });

  it("when card is disabled, card should be clickable and does not contain class is-active", async () => {
    const el = await fixture<SgdsActionCard>(html`<sgds-action-card disabled></sgds-action-card>`);

    expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class("is-active");
    const cardBody = el.shadowRoot?.querySelector("div.card-body") as HTMLInputElement;
    cardBody.click();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class("is-active");
  });

  it("when card is focus, card should be able to be checked with key Enter and contains class is-active", async () => {
    const el = await fixture<SgdsActionCard>(html`<sgds-action-card></sgds-action-card>`);

    expect(el.shadowRoot?.querySelector("div.sgds.card")).to.not.have.class("is-active");
    // const cardBody = el.shadowRoot?.querySelector(
    //   "div.card-body"
    // ) as HTMLInputElement;
    const card = el.shadowRoot?.querySelector("div.sgds.card") as HTMLInputElement;
    card.focus();
    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("div.sgds.card")).to.have.class("is-active");
  });
});

describe("radio action card with form group behaviour", () => {
  it("in sgds-form-group, sgds-action-card type radio should behave like radio options (only one radio is checked at any point)", async () => {
    const el = await fixture(html` <sgds-radio-group>
      <sgds-action-card type="radio" name="apple">
        <span slot="card-subtitle">Laptop</span>
        <span slot="card-title">Apple</span>
        <span slot="card-text">Macbook Pro M1</span>
      </sgds-action-card>
      <sgds-action-card type="radio" name="microsoft">
        <span slot="card-subtitle">Laptop</span>
        <span slot="card-title">Microsoft</span>
        <span slot="card-text">Microsoft Surface Pro</span>
      </sgds-action-card>
      <sgds-action-card type="radio" name="acer">
        <span slot="card-subtitle">Laptop</span>
        <span slot="card-title">Acer</span>
        <span slot="card-text">Acer Aspired 5</span>
      </sgds-action-card>
    </sgds-radio-group>`);
    const appleCard = el.querySelector("sgds-action-card[name='apple']") as SgdsActionCard;
    const microsoftCard = el.querySelector("sgds-action-card[name='microsoft']") as SgdsActionCard;
    const acerCard = el.querySelector("sgds-action-card[name='acer']") as SgdsActionCard;
    appleCard.click();
    await waitUntil(() => appleCard.checked);
    microsoftCard.click();
    await waitUntil(() => microsoftCard.checked);
    expect(appleCard.checked).to.be.false;
    expect(acerCard.checked).to.be.false;
    expect(microsoftCard.checked).to.be.true;

    acerCard.click();
    await waitUntil(() => acerCard.checked);
    expect(appleCard.checked).to.be.false;
    expect(acerCard.checked).to.be.true;
    expect(microsoftCard.checked).to.be.false;
  });
});
