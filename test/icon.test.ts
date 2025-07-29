import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import Sinon from "sinon";
import { SgdsIcon } from "../src/components";
import "./sgds-web-component";

describe("<sgds-icon>", () => {
  it("has default properties", async () => {
    const el = await fixture<SgdsIcon>(html`<sgds-icon></sgds-icon>`);
    expect(el.getAttribute("size")).to.equal("lg");
    expect(el.getAttribute("name")).to.be.null;
    expect(el.shadowRoot).not.to.be.null;
  });

  it("should not render icon when name is not passed", async () => {
    const el = await fixture<SgdsIcon>(html`<sgds-icon></sgds-icon>`);
    await el.updateComplete;
    expect(el.shadowRoot?.innerHTML).not.to.contain("<svg");
  });

  it("handles invalid icon name gracefully", async () => {
    // Mock console to check if error is called
    const warnStub = Sinon.stub(console, "warn");

    const el = await fixture<SgdsIcon>(html`<sgds-icon name="invalid-icon"></sgds-icon>`);
    await el.updateComplete;

    expect(warnStub.calledOnce).to.be.true;
    expect(warnStub.firstCall.args[0]).to.include("Icon not found: invalid-icon");

    // Since invalid icon, shadowRoot should be empty or not contain <svg>
    const svg = el.shadowRoot?.querySelector("svg");
    expect(svg).to.not.exist;

    warnStub.restore();
  });

  it("should render icon when icon is available", async () => {
    const calendarSvgD =
      "M8 2c.332 0 .6.32.6.714V4h6.8V2.714c0-.394.269-.714.6-.714.332 0 .6.32.6.714V4c1.418.002 2.173.027 2.762.327a3 3 0 0 1 1.311 1.311C21 6.28 21 7.12 21 8.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 22 17.88 22 16.2 22H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 19.72 3 18.88 3 17.2V8.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311c.589-.3 1.344-.325 2.762-.327V2.714C7.4 2.32 7.67 2 8 2Zm-.6 3.2a19.76 19.76 0 0 0-1.473.037c-.426.035-.62.096-.744.16a1.8 1.8 0 0 0-.787.786c-.063.123-.124.318-.16.744C4.202 7.367 4.2 7.94 4.2 8.8v.6h15.6v-.6c0-.86 0-1.433-.037-1.873-.035-.426-.096-.62-.16-.744a1.8 1.8 0 0 0-.786-.787c-.123-.063-.318-.124-.744-.16A19.86 19.86 0 0 0 16.6 5.2v1.086c0 .394-.268.714-.6.714-.331 0-.6-.32-.6-.714V5.2H8.6v1.086C8.6 6.68 8.332 7 8 7c-.331 0-.6-.32-.6-.714V5.2Zm12.4 5.4H4.2v6.6c0 .86 0 1.433.037 1.873.035.426.096.62.16.744a1.8 1.8 0 0 0 .786.787c.123.063.318.124.744.16.44.035 1.013.036 1.873.036h8.4c.86 0 1.433 0 1.873-.037.426-.035.62-.096.744-.16a1.8 1.8 0 0 0 .787-.786c.063-.123.124-.318.16-.744.035-.44.036-1.013.036-1.873v-6.6Z";
    const el = await fixture<SgdsIcon>(html`<sgds-icon name="calendar"></sgds-icon>`);

    await waitUntil(() => el.shadowRoot?.querySelector("svg"));

    expect(el.shadowRoot?.querySelector("svg")).to.exist;
    expect(el.shadowRoot?.querySelector("svg > path")?.getAttribute("d")).to.equal(calendarSvgD);
  });
});
