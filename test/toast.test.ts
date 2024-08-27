import "./sgds-web-component";
import { expect, fixture, elementUpdated } from "@open-wc/testing";
import { html } from "lit";
import type { SgdsToast } from "../src/components";

describe("SgdsToast component", () => {
  it("should render the close button when dismissable is true", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show dismissable></sgds-toast>`);
    el.dismissable = true;
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.exist;
  });

  it("should not render the close button when dismissable is false", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    el.dismissable = false;
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector("sgds-close-button")).to.not.exist;
  });
});

describe("SgdsToast component", () => {
  it("should render the action slot when action is true", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show action><span slot="action">Action</span></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast-action")).to.exist;
  });

  it("should not render the action slot when action is false", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast-action")).to.not.exist;
  });
});

describe("SgdsToast component", () => {
  it("should render when show is true", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast show></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast")).to.exist;
  });

  it("should not render when show is false", async () => {
    const el = await fixture<SgdsToast>(html`<sgds-toast .show=${false}></sgds-toast>`);
    await elementUpdated(el);
    expect(el.shadowRoot?.querySelector(".toast")).to.not.exist;
  });
});
