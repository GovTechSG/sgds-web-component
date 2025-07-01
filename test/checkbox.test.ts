import { assert, elementUpdated, expect, fixture, html, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import sinon from "sinon";
import { SgdsButton, SgdsCheckbox, SgdsCheckboxGroup } from "../src/components";
import "./sgds-web-component";
import Sinon from "sinon";

describe("<sgds-checkbox>", () => {
  it("can be semantically compare with shadowDom trees (default)", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox name="testname" value="testvalue">label</sgds-checkbox>`
    );
    assert.shadowDom.equal(
      el,
      `
           <div class="form-check">
                  <div class="form-check-input-container">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      aria-invalid= "false"
                      aria-disabled="false"
                      aria-checked="false"
                      name="testname"
                    />
                  </div>
                  <label class="form-check-label"><slot></slot></label>
                </div>
          `,
      { ignoreAttributes: ["id", "for"] }
    );
  });
  it("can be semantically compare with shadowDom trees with error message", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox invalid hasFeedback invalidFeedback="test" value="testvalue">label</sgds-checkbox>`
    );
    assert.shadowDom.equal(
      el,
      `
           <div class="form-check">
                  <div class="form-check-input-container">
                    <input
                      class="form-check-input is-invalid"
                      type="checkbox"
                      aria-invalid= "true"
                      aria-disabled="false"
                      aria-checked="false"
                    />
                  </div>
                  <label class="form-check-label"><slot></slot></label>
                </div>
                      <div class="invalid-feedback-container">
                        <slot name="invalidIcon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                              d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                              fill="currentColor"
                            />
                          </svg>
                        </slot>
                        <div id="checkbox-feedback" tabindex="0" class="invalid-feedback">
                          test
                        </div>
                      </div>
          `,
      { ignoreAttributes: ["id", "for"] }
    );
  });
  it("value remains the same when clicked", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox value="testvalue">Test</sgds-checkbox>`);
    expect(el.checked).to.be.false;
    expect(el.value).to.equal("testvalue");
    el.click();
    expect(el.checked).to.be.true;
    expect(el.value).to.equal("testvalue");
  });
  it("should be disabled with the disabled attribute & aria-disabled to be true", async () => {
    const el = await fixture(html`<sgds-checkbox disabled></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.disabled).to.be.true;
    expect(checkbox).to.have.attribute("aria-disabled", "true");
  });

  it("when disabled, invalid state is removed", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox invalid></sgds-checkbox>`);
    expect(el.invalid).to.be.true;
    el.disabled = true;
    await el.updateComplete;
    expect(el.invalid).to.be.false;
    el.disabled = false;
    expect(el.invalid).to.be.false;
  });
  it("id attribute should equal to label for attribute", async () => {
    const el = await fixture(html`<sgds-checkbox></sgds-checkbox>`);
    const input = el.shadowRoot?.querySelector("input");
    const label = el.shadowRoot?.querySelector("label");
    expect(input?.getAttribute("id")).to.equal(label?.getAttribute("for"));
  });

  it("should have class .is-invalid when invalid state is true and hasFeedback is true", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox hasFeedback></sgds-checkbox>`);
    el.invalid = true;
    await el.updateComplete;
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.classList.value).to.contain("is-invalid");
  });
  it("should not have class .invalid when hasFeedback is false ", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    el.invalid = true;
    await el.updateComplete;
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.classList.value).not.to.contain("is-invalid");
  });

  it("should render aria-invalid to true with invalid state and required attribute", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    el.invalid = true;
    await el.updateComplete;
    expect(checkbox).to.have.attribute("aria-invalid", "true");
  });

  it("should emit sgds-change event when input is clicked", async () => {
    const el = await fixture(html`<sgds-checkbox></sgds-checkbox>`);
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-change", toggleHandler);
    el.shadowRoot?.querySelector("input")?.click();
    expect(toggleHandler).to.have.been.calledOnce;
  });

  it("should emit sgds-change event when label is clicked", async () => {
    const el = await fixture(html`<sgds-checkbox></sgds-checkbox>`);
    const toggleHandler = sinon.spy();
    el.addEventListener("sgds-change", toggleHandler);
    el.shadowRoot?.querySelector("label")?.click();
    expect(toggleHandler).to.have.been.calledOnce;
  });

  it("should have input aria-checked false by default", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");

    expect(checkbox).to.have.attribute("aria-checked", "false");
  });

  it("should show aria-checked to be true when checked is true", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    const clickSpy = sinon.spy();

    checkbox?.addEventListener("click", clickSpy, { once: true });

    el.click();
    await el.updateComplete;

    expect(clickSpy.called).to.equal(true);
    expect(el.checked).to.equal(true);
    expect(checkbox).to.have.attribute("aria-checked", "true");
  });

  it("should be invalid when the input is empty and form.reportValidity() is called", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox required value=""></sgds-checkbox>
      </form>
    `);

    expect(form.reportValidity()).to.be.false;
  });

  // it("should bypass validity when the input is not checked, reportValidity() is called, and the form has novalidate", async () => {
  //   const form = await fixture<HTMLFormElement>(html`
  //     <form novalidate>
  //       <sgds-checkbox required value="hello"></sgds-checkbox>
  //     </form>
  //   `);

  //   expect(form.reportValidity()).to.be.true;
  // });

  it("should not show checked by default", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    expect(el.checked).to.be.false;
  });

  it("should show checked to be true when click", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");
    const clickSpy = sinon.spy();

    checkbox?.addEventListener("click", clickSpy, { once: true });

    el.click();
    await el.updateComplete;

    expect(clickSpy.called).to.equal(true);
    expect(el.checked).to.equal(true);
  });

  it("When required attr is passed in, it should not show invalid on first load", async () => {
    const el = await fixture<SgdsCheckbox>(html` <sgds-checkbox required></sgds-checkbox> `);
    expect(el.invalid).to.be.false;
  });

  it("When required attr is passed in, it should show invalid on submit", async () => {
    const el = await fixture<SgdsCheckbox>(html` <sgds-checkbox required></sgds-checkbox> `);
    expect(el.invalid).to.be.false;
  });

  it("when required attr is passed in, should show invalid state upon submission", async () => {
    const form = await fixture<HTMLFormElement>(
      html` <form><sgds-checkbox required></sgds-checkbox><sgds-button type="submit"></sgds-button></form> `
    );
    const button = form.querySelector<SgdsButton>("sgds-button");
    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");

    const clickSpy = sinon.spy();

    button?.addEventListener("click", clickSpy, { once: true });
    if (checkbox) await elementUpdated(checkbox);
    expect(checkbox?.invalid).to.exist;
  });

  it("By default, should be able to check and uncheck using enter key", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    el.shadowRoot?.querySelector("input")?.focus();
    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.checked).to.be.true;

    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it("when required attr is passed in, should show invalid state on unchecked by clicking", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox required></sgds-checkbox>`);
    el.shadowRoot?.querySelector("input")?.focus();
    el.shadowRoot?.querySelector("input")?.click();
    await elementUpdated(el);
    expect(el.checked).to.be.true;
    el.shadowRoot?.querySelector("input")?.click();
    await elementUpdated(el);
    expect(el.invalid).to.be.true;
  });

  it("when required is true, blurring from checkbox should trigger invalid ot be true", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox required></sgds-checkbox>`);
    expect(el.invalid).to.be.false;
    el.shadowRoot?.querySelector("input")?.focus();
    el.shadowRoot?.querySelector("input")?.blur();
    await elementUpdated(el);
    expect(el.invalid).to.be.true;
  });
  it("when required attr is passed in, should show invalid state on unchecked using enter key", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox required></sgds-checkbox>`);
    el.shadowRoot?.querySelector("input")?.focus();
    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.checked).to.be.true;

    await sendKeys({ press: "Enter" });
    await el.updateComplete;
    expect(el.invalid).to.be.true;
  });

  it("focus method makes input focused, blur method makes input lose focus", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    expect(el.shadowRoot?.querySelector("input:focus")).to.be.null;
    el.focus();
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("input:focus")).not.to.be.null;
    el.blur();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("input:focus")).to.be.null;
  });

  it("should apply the 'is-invalid' class to a checkbox when it's invalid and hasFeedback is true", async () => {
    const el = await fixture<SgdsCheckbox>(
      html`<sgds-checkbox hasFeedback invalid invalidFeedback="invalid feedback"></sgds-checkbox>`
    );
    el.invalid = true;
    await elementUpdated(el);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.classList.contains("is-invalid")).to.be.true;
  });

  it("should not apply the 'is-invalid' class to a checkbox when it's invalid and hasFeedback is false", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox invalid></sgds-checkbox>`);
    el.invalid = true;
    await elementUpdated(el);
    const checkbox = el.shadowRoot?.querySelector("input");
    expect(checkbox?.classList.contains("is-invalid")).to.be.false;
  });

  it("should display feedback if the group has hasFeedback and at least one checkbox is invalid", async () => {
    const group = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group hasFeedback invalidFeedback="Group error">
        <sgds-checkbox required></sgds-checkbox>
      </sgds-checkbox-group>
    `);

    const checkbox = group.querySelector<SgdsCheckbox>("sgds-checkbox");
    if (checkbox) {
      checkbox.invalid = true;
      await elementUpdated(checkbox);
    }
    const feedback = group.shadowRoot?.querySelector(".invalid-feedback-container");
    expect(feedback).to.exist;
  });

  it("should not display feedback if no child checkbox is invalid even with hasFeedback", async () => {
    const group = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group hasFeedback invalidFeedback="Group error">
        <sgds-checkbox required></sgds-checkbox>
      </sgds-checkbox-group>
    `);

    const checkbox = group.querySelector<SgdsCheckbox>("sgds-checkbox");
    if (checkbox) {
      checkbox.invalid = false;
      await elementUpdated(checkbox);
    }

    const feedback = group.shadowRoot?.querySelector(".error-message-container");
    expect(feedback).not.to.exist;
  });

  it("should not display feedback if the group does not have hasFeedback and at least one checkbox is invalid", async () => {
    const group = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group>
        <sgds-checkbox invalid required></sgds-checkbox>
      </sgds-checkbox-group>
    `);

    const checkbox = group.querySelector<SgdsCheckbox>("sgds-checkbox");
    if (checkbox) {
      checkbox.invalid = true;
      await elementUpdated(checkbox);
    }

    const feedback = group.shadowRoot?.querySelector(".error-message-container");
    expect(feedback).not.to.exist;
  });

  it("should mark the checkbox as invalid when required and not checked upon form submission", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox required></sgds-checkbox>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);

    form.addEventListener("submit", event => {
      event.preventDefault(); // Prevent page navigation
    });

    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");
    const button = form.querySelector<SgdsButton>("sgds-button");

    if (checkbox) {
      checkbox.checked = false;
      await elementUpdated(checkbox);
      button?.click();
      expect(checkbox.invalid).to.be.true;
    }
  });

  it("should not mark the checkbox as invalid when not required and not checked upon form submission", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox></sgds-checkbox>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);

    form.addEventListener("submit", event => {
      event.preventDefault(); // Prevent page navigation
    });

    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");
    const button = form.querySelector<SgdsButton>("sgds-button");

    if (checkbox) {
      checkbox.checked = false;
      await elementUpdated(checkbox);
      button?.click();
      expect(checkbox.invalid).to.be.false;
    }
  });
  it("form submission success when checkbox is required and checked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox required checked></sgds-checkbox>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    form.addEventListener("submit", submitHandler);
    expect(form.reportValidity()).to.equal(true);

    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");
    const button = form.querySelector<SgdsButton>("sgds-button");

    if (checkbox) {
      await elementUpdated(checkbox);
      button?.click();
      expect(submitHandler).to.have.been.calledOnce;
      expect(checkbox.invalid).to.be.false;
    }
  });
  it("form submission prevented when checkbox is required and not checked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox required></sgds-checkbox>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    form.addEventListener("submit", submitHandler);
    expect(form.reportValidity()).to.equal(false);

    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");
    const button = form.querySelector<SgdsButton>("sgds-button");

    if (checkbox) {
      await elementUpdated(checkbox);
      button?.click();
      expect(submitHandler).not.to.have.been.calledOnce;
      expect(checkbox.invalid).to.be.true;
    }
  });
  it("form submission successful when checkbox is disabled, despite required", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox required disabled></sgds-checkbox>
        <sgds-button type="submit"></sgds-button>
      </form>
    `);
    const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
    form.addEventListener("submit", submitHandler);
    expect(form.reportValidity()).to.equal(true);

    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");
    const button = form.querySelector<SgdsButton>("sgds-button");

    if (checkbox) {
      await elementUpdated(checkbox);
      button?.click();
      expect(submitHandler).to.have.been.calledOnce;
      expect(checkbox.invalid).to.be.false;
    }
  });
  it("form reset unchecks box", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox></sgds-checkbox>
      </form>
    `);
    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");
    checkbox?.click();
    await checkbox?.updateComplete;
    expect(checkbox?.checked).to.be.true;

    form.reset();
    await checkbox?.updateComplete;
    expect(checkbox?.checked).to.be.false;
  });
  it("form reset, resets validity of check box", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <sgds-checkbox required></sgds-checkbox>
      </form>
    `);
    const checkbox = form.querySelector<SgdsCheckbox>("sgds-checkbox");
    await checkbox?.updateComplete;
    checkbox?.reportValidity();
    expect(checkbox?.invalid).to.be.true;

    form.reset();
    await checkbox?.updateComplete;
    expect(checkbox?.invalid).to.be.false;
  });

  it("indeterminate required checkbox should be invalid", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox indeterminate required></sgds-checkbox>`);
    // const checkbox = el.shadowRoot?.querySelector("input");
    expect(el.reportValidity()).to.be.false;
    expect(el?.invalid).to.be.true;
  });
  it("indeterminate checkbox should not affected validity and be valid by default", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox indeterminate></sgds-checkbox>`);
    // const checkbox = el.shadowRoot?.querySelector("input");
    expect(el.reportValidity()).to.be.true;
    expect(el?.invalid).to.be.false;
  });
  it("should apply the 'indeterminate' property to a checkbox when it's set", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox indeterminate></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");

    expect(checkbox?.getAttribute("indeterminate")).to.exist;
  });

  it("should not apply the 'indeterminate' property to a checkbox when it's not set", async () => {
    const el = await fixture<SgdsCheckbox>(html`<sgds-checkbox></sgds-checkbox>`);
    const checkbox = el.shadowRoot?.querySelector("input");

    expect(checkbox?.getAttribute("indeterminate")).to.not.exist;
  });
});

describe("sgds-checkbox-group", () => {
  // it("shadowDOm matches semantically", async() => {
  //   const el = await fixture<SgdsCheckboxGroup>(html`
  //     <sgds-checkbox-group>
  //     </sgds-checkbox-group>
  //     `)
  //     assert(el, `

  //       `)
  // })

  // it("shadowDom matches semantically for invalid state", async() => {

  // })

  // it("when required and hasFeedback is true")
  it("on initial render, if any checkboxes are checked, value is saved in checkboxgroup", async () => {
    const el = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group>
        <sgds-checkbox value="he" checked>he</sgds-checkbox>
        <sgds-checkbox value="him" checked>him</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    await elementUpdated(el);
    expect(el.value).to.equal("he;him");
  });

  it("on initial render, if disabled is true, all children are disabled", async () => {
    const el = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group disabled>
        <sgds-checkbox value="he">he</sgds-checkbox>
        <sgds-checkbox value="him">him</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    const checkboxes = el.querySelectorAll("sgds-checkbox");
    checkboxes.forEach(c => expect(c.disabled).to.be.true);
  });
  it("on initial render, if a child has required set to true, delete the checkbox and send console error", async () => {
    const consoleStub = Sinon.stub(console, "error");
    const el = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group>
        <sgds-checkbox value="he" required>he</sgds-checkbox>
        <sgds-checkbox value="him">him</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    await el.updateComplete;
    await waitUntil(() => consoleStub.calledOnce);
    expect(consoleStub.calledOnce).to.be.true;
    expect(el.querySelectorAll("sgds-checkbox").length).to.equal(1);
  });
  it("programatically setting value checkboxgroup will be reflected on the checkboxes child", async () => {
    const el = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group>
        <sgds-checkbox value="he">he</sgds-checkbox>
        <sgds-checkbox value="him">him</sgds-checkbox>
      </sgds-checkbox-group>
    `);

    el.value = "he";
    await el.updateComplete;
    const heCheckbox = el.querySelector<SgdsCheckbox>("sgds-checkbox[value='he']");
    expect(heCheckbox?.checked).to.be.true;
  });
  it("value prop should properly reflect checked children in initial render", async () => {
    const el = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group value="he;him;">
        <sgds-checkbox value="he">he</sgds-checkbox>
        <sgds-checkbox value="him">him</sgds-checkbox>
        <sgds-checkbox value="she">she</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    await el.updateComplete;
    const [one, two, three] = el.querySelectorAll<SgdsCheckbox>("sgds-checkbox") as NodeListOf<SgdsCheckbox>;
    expect(one.checked).to.be.true;
    expect(two.checked).to.be.true;
    expect(three.checked).to.be.false;
  });
  it("when checked and unchecked, checkboxgroup value should be updated", async () => {
    const el = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group>
        <sgds-checkbox value="he">he</sgds-checkbox>
        <sgds-checkbox value="him">him</sgds-checkbox>
        <sgds-checkbox value="she">she</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    expect(el.value).to.equal('');
    const [one, two, three] = el.querySelectorAll<SgdsCheckbox>("sgds-checkbox") as NodeListOf<SgdsCheckbox>;
    //checking
    one.click();
    await elementUpdated(el);
    expect(el.value).to.equal("he");
    two.click();
    await elementUpdated(el);
    expect(el.value).to.equal("he;him");
    //unchecking
    two.click();
    await elementUpdated(el);
    expect(el.value).to.equal("he");
  });
  it("at initial render, checked children will be reflected on checkbox group value", async() => {
       const el = await fixture<SgdsCheckboxGroup>(html`
      <sgds-checkbox-group>
        <sgds-checkbox value="he" checked>he</sgds-checkbox>
        <sgds-checkbox value="him" checked >him</sgds-checkbox>
        <sgds-checkbox value="she">she</sgds-checkbox>
      </sgds-checkbox-group>
    `);
    expect(el.value).to.equal("he;him")
  })
  //form testings
});
