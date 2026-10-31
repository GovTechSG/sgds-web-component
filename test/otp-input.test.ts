import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";
import { SgdsOtpInput } from "../src/components/OtpInput/sgds-otp-input";
import "../src/components/OtpInput";

describe("<sgds-otp-input>", () => {
  it("renders six unmasked numeric boxes and a label slot", async () => {
    const el = await fixture<SgdsOtpInput>(
      html`<sgds-otp-input><span slot="label">Verification code</span></sgds-otp-input>`
    );
    expect(el.shadowRoot.querySelectorAll("input").length).to.equal(6);
    expect(el.shadowRoot.querySelector('slot[name="label"]')).to.exist;
    expect(el.shadowRoot.querySelector("input").type).to.equal("text");
  });
  it("supports four to eight boxes", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input length="4"></sgds-otp-input>`);
    expect(el.shadowRoot.querySelectorAll("input").length).to.equal(4);
    el.setAttribute("length", "8");
    await el.updateComplete;
    expect(el.shadowRoot.querySelectorAll("input").length).to.equal(8);
  });
  it("renders a single input with prefix", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input variant="with-prefix" prefix="OTP"></sgds-otp-input>`);
    expect(el.shadowRoot.querySelectorAll("input").length).to.equal(1);
    expect(el.shadowRoot.querySelector(".form-control-prefix").textContent).to.equal("OTP");
  });
});

describe("OTP interactions", () => {
  it("moves focus, keeps leading zeros, and submits the value", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form><sgds-otp-input name="otp" required></sgds-otp-input></form>`
    );
    const el = form.querySelector<SgdsOtpInput>("sgds-otp-input");
    const input = el.shadowRoot.querySelector("input");
    input.value = "012345";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await el.updateComplete;
    expect(new FormData(form).get("otp")).to.equal("012345");
    expect(el.shadowRoot.activeElement).to.equal(el.shadowRoot.querySelectorAll("input")[5]);
  });
  it("shows errors only on submit and clears them on a successful resubmit", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form><sgds-otp-input required></sgds-otp-input><button>Submit</button></form>`
    );
    form.addEventListener("submit", e => e.preventDefault());
    const el = form.querySelector<SgdsOtpInput>("sgds-otp-input");
    const input = el.shadowRoot.querySelector("input");
    input.value = "12";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    input.dispatchEvent(new FocusEvent("blur"));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).to.equal(null);
    form.requestSubmit();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).to.exist;
    input.value = "123456";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await el.updateComplete;
    form.requestSubmit();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).to.equal(null);
    form.reset();
    await el.updateComplete;
    expect(input.value).to.equal("");
  });
  it("pastes only digits and excludes disabled values from forms", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form><sgds-otp-input name="otp" length="4"></sgds-otp-input></form>`
    );
    const el = form.querySelector<SgdsOtpInput>("sgds-otp-input");
    const data = new DataTransfer();
    data.setData("text", "0a1 23-45");
    const paste = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(paste, "clipboardData", { value: data });
    el.shadowRoot.querySelector("input").dispatchEvent(paste);
    await el.updateComplete;
    expect(new FormData(form).get("otp")).to.equal("0123");
    el.setAttribute("disabled", "");
    await el.updateComplete;
    expect(new FormData(form).has("otp")).to.equal(false);
    expect(el.shadowRoot.querySelector("input").disabled).to.equal(true);
  });
});

describe("OTP editing", () => {
  it("preserves neighbouring digits when deleting and replacing a middle digit", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input value="012345" required></sgds-otp-input>`);
    const inputs = el.shadowRoot.querySelectorAll("input");
    inputs[2].dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }));
    await el.updateComplete;
    expect(inputs[2].value).to.equal("");
    expect(inputs[3].value).to.equal("3");
    expect(el.checkValidity()).to.equal(false);
    expect(el.invalid).to.equal(false);
    inputs[2].value = "9";
    inputs[2].dispatchEvent(new InputEvent("input", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal("019345");
    expect(el.checkValidity()).to.equal(true);
    inputs[3].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
    expect(el.shadowRoot.activeElement).to.equal(inputs[2]);
  });
  it("validates the single input and clamps unsupported lengths", async () => {
    const el = await fixture<SgdsOtpInput>(
      html`<sgds-otp-input variant="with-prefix" length="2" required></sgds-otp-input>`
    );
    const input = el.shadowRoot.querySelector("input");
    input.value = "012345";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal("0123");
    expect(el.reportValidity()).to.equal(true);
    el.length = 20;
    await el.updateComplete;
    expect(el.reportValidity()).to.equal(false);
    expect(el.validationMessage).to.equal("Enter a 8-digit code.");
  });
});

describe("OTP presentation", () => {
  for (const variant of ["numbers-only", "with-prefix"]) {
    it(`always shows border and message without a placeholder for ${variant}`, async () => {
      const el = await fixture<SgdsOtpInput>(
        html`<sgds-otp-input
          variant=${variant}
          invalid
          hasFeedback="text"
          placeholder="0"
          invalidFeedback="Code expired"
        ></sgds-otp-input>`
      );
      expect(el.shadowRoot.querySelector(".is-invalid")).to.exist;
      expect(el.shadowRoot.querySelector('[role="alert"]').textContent).to.equal("Code expired");
      expect(el.shadowRoot.querySelector("input").placeholder).to.equal("");
    });
  }
});

describe("OTP public API parity", () => {
  for (const variant of ["numbers-only", "with-prefix"]) {
    it(`emits focus and blur only at the ${variant} boundary without validating`, async () => {
      const wrapper = await fixture<HTMLDivElement>(
        html`<div><sgds-otp-input variant=${variant} required></sgds-otp-input><button>Outside</button></div>`
      );
      const el = wrapper.querySelector<SgdsOtpInput>("sgds-otp-input");
      let focuses = 0;
      let blurs = 0;
      let invalids = 0;
      el.addEventListener("sgds-focus", () => focuses++);
      el.addEventListener("sgds-blur", () => blurs++);
      el.addEventListener("sgds-invalid", () => invalids++);
      el.focus();
      expect(focuses).to.equal(1);
      const inputs = el.shadowRoot.querySelectorAll("input");
      inputs[inputs.length - 1].focus();
      expect(focuses).to.equal(1);
      expect(blurs).to.equal(0);
      el.blur();
      expect(el.shadowRoot.activeElement).to.equal(null);
      expect(blurs).to.equal(1);
      el.focus();
      wrapper.querySelector("button").focus();
      expect(focuses).to.equal(2);
      expect(blurs).to.equal(2);
      await el.updateComplete;
      expect(invalids).to.equal(0);
      expect(el.invalid).to.equal(false);
    });
  }
  it("emits validation events from setInvalid without changing the entered code", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input value="123456"></sgds-otp-input>`);
    const events: string[] = [];
    el.addEventListener("sgds-invalid", () => events.push("invalid"));
    el.addEventListener("sgds-valid", () => events.push("valid"));
    el.setInvalid(true);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).to.exist;
    el.setInvalid(false);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).to.equal(null);
    expect(events).to.deep.equal(["invalid", "valid"]);
    expect(el.value).to.equal("123456");
  });
  it("keeps custom validity through rendering, blocks submit, and supports clearing", async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form><sgds-otp-input value="123456" required></sgds-otp-input></form>`
    );
    const el = form.querySelector<SgdsOtpInput>("sgds-otp-input");
    let submits = 0;
    form.addEventListener("submit", e => {
      e.preventDefault();
      submits++;
    });
    el.setValidity({ customError: true }, "This code has expired.");
    el.prefix = "ABC-";
    await el.updateComplete;
    expect(el.checkValidity()).to.equal(false);
    expect(el.validationMessage).to.equal("This code has expired.");
    expect(el.invalid).to.equal(false);
    form.requestSubmit();
    await el.updateComplete;
    expect(submits).to.equal(0);
    expect(el.shadowRoot.querySelector('[role="alert"]').textContent).to.equal("This code has expired.");
    el.setValidity({});
    expect(el.reportValidity()).to.equal(true);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('[role="alert"]')).to.equal(null);
    form.requestSubmit();
    expect(submits).to.equal(1);
    el.setValidity({ customError: true }, "Try another code.");
    form.reset();
    await el.updateComplete;
    expect(el.checkValidity()).to.equal(true);
    expect(el.invalid).to.equal(false);
  });
  it("respects noValidate and restores required validation after clearing custom errors", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input required noValidate></sgds-otp-input>`);
    el.setValidity({ customError: true }, "Custom error");
    expect(el.checkValidity()).to.equal(true);
    el.noValidate = false;
    await el.updateComplete;
    el.setValidity({ customError: true }, "Custom error");
    expect(el.validity.customError).to.equal(true);
    el.setValidity();
    expect(el.validity.customError).to.equal(false);
    expect(el.validity.valueMissing).to.equal(true);
  });
});

describe("OTP form conventions", () => {
  it("uses the shared error icon and feedback container", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input invalid></sgds-otp-input>`);
    const feedback = el.shadowRoot.querySelector(".invalid-feedback-container");
    expect(feedback).to.exist;
    expect(feedback.querySelector("sgds-icon")).to.have.attribute("name", "exclamation-circle-fill");
    expect(feedback.querySelector('[role="alert"]')).to.have.id("otp-error");
    expect(el.shadowRoot.querySelector("input")).to.have.attribute("aria-describedby", "otp-error");
  });
  for (const mode of ["component", "form"]) {
    it(`preserves custom feedback when ${mode} validation is opted out`, async () => {
      const form = await fixture<HTMLFormElement>(html`<form><sgds-otp-input required></sgds-otp-input></form>`);
      const el = form.querySelector<SgdsOtpInput>("sgds-otp-input");
      if (mode === "component") el.noValidate = true;
      else form.noValidate = true;
      el.invalidFeedback = "The code has expired.";
      el.setInvalid(true);
      await el.updateComplete;
      const events: string[] = [];
      el.addEventListener("sgds-valid", () => events.push("valid"));
      el.addEventListener("sgds-invalid", () => events.push("invalid"));
      expect(el.reportValidity()).to.equal(true);
      form.addEventListener("submit", event => event.preventDefault());
      form.requestSubmit();
      await el.updateComplete;
      expect(el.shadowRoot.querySelector('[role="alert"]').textContent).to.equal("The code has expired.");
      expect(events).to.deep.equal([]);
      form.reset();
      await el.updateComplete;
      expect(el.shadowRoot.querySelector('[role="alert"]')).to.equal(null);
    });
  }
  it("allows input cancellation to prevent automatic focus movement while retaining the value", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input></sgds-otp-input>`);
    el.addEventListener("sgds-input", event => event.preventDefault());
    const input = el.shadowRoot.querySelector("input");
    input.focus();
    input.value = "1";
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
    await el.updateComplete;
    expect(el.value).to.equal("1");
    expect(el.shadowRoot.activeElement).to.equal(input);
    expect(el.shadowRoot.querySelector('[role="alert"]')).to.equal(null);
  });
  it("emits cancelable change events like Input without showing feedback", async () => {
    const el = await fixture<SgdsOtpInput>(html`<sgds-otp-input required></sgds-otp-input>`);
    let change: Event;
    el.addEventListener("sgds-change", event => {
      change = event;
      event.preventDefault();
    });
    el.shadowRoot.querySelector("input").dispatchEvent(new Event("change", { bubbles: true }));
    expect(change.cancelable).to.equal(true);
    expect(change.defaultPrevented).to.equal(true);
    expect(el.invalid).to.equal(false);
  });
});
