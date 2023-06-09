import { assert, elementUpdated, expect, fixture, html, waitUntil } from "@open-wc/testing";
import "../src/components/Button";
import { SgdsButton } from "../src/components/Button/sgds-button";
import "../src/components/Stepper";
import { SgdsStepper } from "../src/components/Stepper/sgds-stepper";
import sinon from "sinon";
import { sendKeys } from "@web/test-runner-commands";

describe("sgds-stepper", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-stepper");
    assert.instanceOf(el, SgdsStepper);
  });
  it("by default should render 3 steps within component", async () => {
    const el = await fixture(
      html` <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3"]'></sgds-stepper> `
    );
    const stepperItems = el.shadowRoot?.querySelectorAll(".stepper-item");
    expect(stepperItems?.length).to.equal(3);
  });
  it("should render the correct number of steps when passed in steps prop", async () => {
    const el = await fixture(html`
      <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3", "Marker title 4"]'></sgds-stepper>
    `);
    const stepperItems = el.shadowRoot?.querySelectorAll(".stepper-item");
    expect(stepperItems?.length).to.equal(4);
  });
  it("should have default activeStep=0", async () => {
    const el = await fixture<SgdsStepper>(
      html` <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3"]'></sgds-stepper> `
    );
    expect(el.activeStep).to.equal(0);
  });

  it("should have the is-active class on step 1 when activeStep set to 0", async () => {
    const el = await fixture(
      html`
        <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3"]' activeStep="0"></sgds-stepper>
      `
    );

    expect(el.shadowRoot?.children[0].querySelector(".stepper-item")?.classList.value).to.contain("is-active");
  });

  it("when activeStep set to 2, should update the `is-active` to the previous step when clicked", async () => {
    const el = await fixture(
      html`
        <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3"]' activeStep="2"></sgds-stepper>
      `
    );

    const stepperItemTwo = el.shadowRoot?.querySelectorAll(".stepper-item")[1] as SgdsStepper;
    const stepperItemThree = el.shadowRoot?.querySelectorAll(".stepper-item")[2] as SgdsStepper;

    stepperItemTwo.click();
    await elementUpdated(el);
    expect(stepperItemTwo.classList.contains("is-active")).to.be.true;
    expect(stepperItemThree.classList.contains("is-active")).to.be.false;
  });
});

describe("sgds-stepper, sgds-button interactions", () => {
  it("should increment the active step when the nextStep() method is called", async () => {
    const el = await fixture(html`
      <sgds-stepper
        steps='["Marker title 1", "Marker title 2", "Marker title 3"]'
        id="myStepper"
        activeStep="0"
      ></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="increment" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>("sgds-stepper");
    const button = el.querySelector<SgdsButton>("sgds-button");

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-active");
      button.shadowRoot?.querySelector("button")?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).not.to.have.class("is-active");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).to.have.class("is-active");
    }
  });

  it("should increment the active step when the nextStep() method is called, showing the previous step 1 to have is-clickable, is-completed props, tab-index=0", async () => {
    const el = await fixture(html`
      <sgds-stepper
        steps='["Marker title 1", "Marker title 2", "Marker title 3"]'
        id="myStepper"
        activeStep="0"
      ></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="increment" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>("sgds-stepper");
    const button = el.querySelector<SgdsButton>("sgds-button");

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-active");
      button.shadowRoot?.querySelector("button")?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-completed");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-clickable");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.attribute("tabindex", "0");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).not.to.have.class("is-active");
    }
  });

  it("should decrement the active step when the previousStep() method is called", async () => {
    const el = await fixture(html`
      <sgds-stepper
        steps='["Marker title 1", "Marker title 2", "Marker title 3"]'
        id="myStepper"
        activeStep="1"
      ></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="decrement" variant="primary">Back</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>("sgds-stepper");
    const button = el.querySelector<SgdsButton>("sgds-button");

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).to.have.class("is-active");
      button.shadowRoot?.querySelector("button")?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-active");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).not.to.have.class("is-active");
    }
  });

  it("should decrement the active step when the previousStep() method is called, showing the previous step 2 to not have is-clickable, is-completed props, tabindex -1", async () => {
    const el = await fixture(html`
      <sgds-stepper
        steps='["Marker title 1", "Marker title 2", "Marker title 3"]'
        id="myStepper"
        activeStep="1"
      ></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="decrement" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>("sgds-stepper");
    const button = el.querySelector<SgdsButton>("sgds-button");

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).to.have.class("is-active");
      button.shadowRoot?.querySelector("button")?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-active");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).not.to.have.class("is-completed");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).not.to.have.class("is-clickable");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).to.have.attribute("tabindex", "-1");
    }
  });

  it("should set the active step to the last step when the lastStep() method is called", async () => {
    const el = await fixture(html`
      <sgds-stepper
        steps='["Marker title 1", "Marker title 2", "Marker title 3"]'
        id="myStepper"
        activeStep="0"
      ></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="last" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>("sgds-stepper");
    const button = el.querySelector<SgdsButton>("sgds-button");

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-active");
      button.shadowRoot?.querySelector("button")?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).not.to.have.class("is-active");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).not.to.have.class("is-active");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[2]).to.have.class("is-active");
    }
  });

  it("should set the active step to the first step when the firstStep() method is called", async () => {
    const el = await fixture(html`
      <sgds-stepper
        steps='["Marker title 1", "Marker title 2", "Marker title 3"]'
        id="myStepper"
        activeStep="2"
      ></sgds-stepper>
      <sgds-button stepperId="myStepper" methodType="first" variant="primary">Next</sgds-button>
    `);

    const stepper = el.querySelector<SgdsStepper>("sgds-stepper");
    const button = el.querySelector<SgdsButton>("sgds-button");

    if (button) {
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[2]).to.have.class("is-active");
      button.shadowRoot?.querySelector("button")?.click();
      await elementUpdated(el);
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[2]).not.to.have.class("is-active");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[1]).not.to.have.class("is-active");
      expect(stepper?.shadowRoot?.querySelectorAll(".stepper-item")[0]).to.have.class("is-active");
    }
  });

  it("when reset method is fired, activeStep is back to defaultValue", async () => {
    const el = await fixture<SgdsStepper>(
      html`
        <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3"]' activeStep="1"></sgds-stepper>
      `
    );
    expect(el.defaultActiveStep).to.equal(1);
    expect(el.activeStep).to.equal(1);

    el.nextStep();
    await el.updateComplete;
    expect(el.activeStep).to.equal(2);
    el.reset();
    await el.updateComplete;
    expect(el.activeStep).to.equal(1);
  });
});

const eventsMetadata = [
  {
    event: "sgds-next-step",
    method: "nextStep"
  },
  {
    event: "sgds-previous-step",
    method: "previousStep"
  },
  {
    event: "sgds-last-step",
    method: "lastStep"
  },
  {
    event: "sgds-first-step",
    method: "firstStep"
  }
];
describe("Stepper events", () => {
  eventsMetadata.forEach(m => {
    it(`${m.event} is fired when method ${m.method}() is called and sgds-arrived is called after`, async () => {
      const el = await fixture<SgdsStepper>(
        html`
          <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3"]' activeStep="1"></sgds-stepper>
        `
      );
      const eventHandler = sinon.spy();
      const arrivedEventHandler = sinon.spy();
      el.addEventListener(m.event, eventHandler);
      el.addEventListener("sgds-arrived", arrivedEventHandler);
      el[m.method]();
      await waitUntil(() => eventHandler.calledOnce);
      expect(eventHandler).to.have.been.calledOnce;

      await waitUntil(() => arrivedEventHandler.calledOnce);
      expect(arrivedEventHandler).to.be.calledAfter(eventHandler);
    });
  });

  it("sgds-reset is fired when reset method is called, sgds-arrived called after", async () => {
    const el = await fixture<SgdsStepper>(
      html` <sgds-stepper steps='["Marker title 1", "Marker title 2", "Marker title 3"]'></sgds-stepper> `
    );
    const eventHandler = sinon.spy();
    const arrivedEventHandler = sinon.spy();
    el.addEventListener("sgds-reset", eventHandler);
    el.addEventListener("sgds-arrived", arrivedEventHandler);

    //setting the stage
    el.nextStep();
    await el.updateComplete;

    el.reset();
    await el.updateComplete;

    await waitUntil(() => eventHandler.calledOnce);
    expect(eventHandler).to.have.been.calledOnce;
  });
});

describe("Stepper keyboard interactions", () =>{
  it("keyboard enter will simulate a click behaviour on the markers", async() => {
    const el = await fixture<SgdsStepper>(
      html` <sgds-stepper activeStep="2" steps='["Marker title 1", "Marker title 2", "Marker title 3"]'></sgds-stepper> `
    );
    const arrivedHandler = sinon.spy()
    el.addEventListener("sgds-arrived", arrivedHandler)
    const markers = el.shadowRoot?.querySelectorAll("div.stepper-item")
    expect(markers?.[0]).to.have.class("is-completed").and.have.class("is-clickable")
    expect(markers?.[0]).to.have.attribute("tabindex", "0")
    expect(markers?.[1]).to.have.class("is-completed").and.have.class("is-clickable")
    expect(markers?.[1]).to.have.attribute("tabindex", "0")

    await sendKeys({press: "Tab"})
    await sendKeys({press: "Enter"})
    await el.updateComplete
    expect(markers?.[0]).to.have.class("is-active")
    expect(arrivedHandler).to.be.calledOnce
  })
} )