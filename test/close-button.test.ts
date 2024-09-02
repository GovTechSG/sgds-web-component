import { html } from "lit";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { SgdsCloseButton } from "../src/internals/CloseButton/sgds-close-button";
import "../src/internals/CloseButton";
import * as sinon from "sinon";

describe("<sgds-close-button>", () => {
  it("emits click when clicked on", async () => {
    const el = await fixture<SgdsCloseButton>(html`<sgds-close-button></sgds-close-button>`);
    const clickHandler = sinon.spy();
    el.addEventListener("click", clickHandler);
    el.click();
    await waitUntil(() => clickHandler.calledOnce);

    expect(clickHandler).to.have.been.calledOnce;
  });
});
