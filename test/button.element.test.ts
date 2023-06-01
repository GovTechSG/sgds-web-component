import SgdsButton from "../src/components/Button/sgds-button";
import "../src/components/Button/sgds-button";
import { fixture, assert, expect, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";

describe("sgds-button", () => {
  it("is defined", () => {
    const el = document.createElement("sgds-button");
    assert.instanceOf(el, SgdsButton);
  });
  it("renders with default values", async () => {
    const el = await fixture(html`<sgds-button></sgds-button>`);
    assert.shadowDom.equal(
      el,
      `<button class="btn btn-primary sgds" type="button" aria-disabled="false" tabindex="0">
      <slot class="align-items-center d-flex gap-2"></slot>
      </button>
    `
    );
  });

  it("should convert from button tag to anchor tag if href is defined", async () => {
    const el = await fixture(html`<sgds-button href="#"></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute("href", "#");
    expect(anchorTag).to.have.attribute("role", "button");
    expect(anchorTag).not.to.have.attribute("type", "button");
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  });

  it("should convert to anchor tag if download and href attributes are defined, button tag", async () => {
    const el = await fixture(html`<sgds-button download="logo.svg" href="folder/subfolder/logo.svg"></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute("download", "logo.svg");
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  });

  it('anchor tag should contain rel="noreferrer noopener" attribute if href and target="_blank" attributes are defined', async () => {
    const el = await fixture(html`<sgds-button href="#" target="_blank"></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.attribute("rel", "noreferrer noopener");
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  });

  it("should contain disabled if is an anchor tag and disabled attributes are defined", async () => {
    const el = await fixture(html`<sgds-button href="#" disabled></sgds-button>`);
    const anchorTag = el.shadowRoot?.querySelector("a");
    expect(anchorTag).to.have.class("disabled");
    expect(anchorTag).to.have.attribute("aria-disabled", "true");
    expect(anchorTag).to.have.attribute("tabindex", "-1");
    expect(anchorTag).not.to.have.attribute("disabled", "");
    expect(el.shadowRoot?.querySelector("button")).not.to.exist;
  });

  it("should emit a click event when calling click()", async () => {
    const el = await fixture<SgdsButton>(html` <sgds-button></sgds-button> `);
    const clickHandler = sinon.spy();

    el.addEventListener("click", clickHandler);
    el.click();
    await waitUntil(() => clickHandler.calledOnce);

    expect(clickHandler).to.have.been.calledOnce;
  });
});

describe("when submitting a form", () => {
  it("should submit when the button is inside the form", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form action="" method="post">
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const button = form.querySelector<SgdsButton>("sgds-button");
    const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

    form.addEventListener("submit", handleSubmit);
    button?.click();
    expect(handleSubmit).to.have.been.calledOnce;
  });

  it("should submit when the button is outside the form and has a form attribute", async () => {
    const el = await fixture(html`
      <div>
        <form id="a" action="" method="post"></form>
        <sgds-button type="submit" form="a">Submit</sgds-button>
      </div>
    `);
    const form = el.querySelector<HTMLFormElement>("form");
    const button = el.querySelector<SgdsButton>("sgds-button");
    const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

    form?.addEventListener("submit", handleSubmit);
    button?.click();

    expect(handleSubmit).to.have.been.calledOnce;
  });

  it("should override form attributes when formaction, formmethod, formnovalidate, and formtarget are used inside a form", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form id="a" action="foo" method="post" target="_self">
        <sgds-button type="submit" form="a" formaction="bar" formmethod="get" formtarget="_blank" formnovalidate>
          Submit
        </sgds-button>
      </form>
    `);
    const button = form.querySelector<SgdsButton>("sgds-button");
    let submitter: HTMLButtonElement;
    const handleSubmit = sinon.spy((event: SubmitEvent) => {
      submitter = event.submitter as HTMLButtonElement;
      event.preventDefault();
      expect(submitter.formAction.endsWith("/bar")).to.be.true;
      expect(submitter.formMethod).to.equal("get");
      expect(submitter.formTarget).to.equal("_blank");
      expect(submitter.formNoValidate).to.be.true;
    });

    form.addEventListener("submit", handleSubmit);
    button?.click();

    expect(handleSubmit).to.have.been.calledOnce;
  });

  it("should override form attributes when formaction, formmethod, formnovalidate, and formtarget are used outside a form", async () => {
    const el = await fixture(html`
      <div>
        <form id="a" action="foo" method="post" target="_self"></form>
        <sgds-button type="submit" form="a" formaction="bar" formmethod="get" formtarget="_blank" formnovalidate>
          Submit
        </sgds-button>
      </div>
    `);
    const form = el.querySelector<HTMLFormElement>("form");
    const button = el.querySelector<SgdsButton>("sgds-button");

    let submitter: HTMLButtonElement;
    const handleSubmit = sinon.spy((event: SubmitEvent) => {
      submitter = event.submitter as HTMLButtonElement;
      event.preventDefault();
      expect(submitter.formAction.endsWith("/bar")).to.be.true;
      expect(submitter.formMethod).to.equal("get");
      expect(submitter.formTarget).to.equal("_blank");
      expect(submitter.formNoValidate).to.be.true;
    });

    form?.addEventListener("submit", handleSubmit);
    button?.click();

    expect(handleSubmit).to.have.been.calledOnce;
  });
});

describe("when using methods", () => {
  it("should emit sgds-focus and sgds-blur when the button is focused and blurred", async () => {
    const el = await fixture<SgdsButton>(html` <sgds-button>Button</sgds-button> `);
    const focusHandler = sinon.spy();
    const blurHandler = sinon.spy();

    el.addEventListener("sgds-focus", focusHandler);
    el.addEventListener("sgds-blur", blurHandler);

    el.focus();
    await waitUntil(() => focusHandler.calledOnce);

    el.blur();
    await waitUntil(() => blurHandler.calledOnce);

    expect(focusHandler).to.have.been.calledOnce;
    expect(blurHandler).to.have.been.calledOnce;
  });

  it("should emit a click event when calling click()", async () => {
    const el = await fixture<SgdsButton>(html` <sgds-button></sgds-button> `);
    const clickHandler = sinon.spy();

    el.addEventListener("click", clickHandler);
    el.click();
    await waitUntil(() => clickHandler.calledOnce);

    expect(clickHandler).to.have.been.calledOnce;
  });
});
