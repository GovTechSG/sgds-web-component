import "./sgds-web-component";
import { html } from "lit";
import { fixture, assert } from "@open-wc/testing";
import type { SgdsProgressBar } from "../src/components/ProgressBar/sgds-progress-bar";

describe("<sgds-progress-bar>", () => {
  it("renders with default values", async () => {
    const el = await fixture<SgdsProgressBar>(html` <sgds-progress-bar value="50"></sgds-progress-bar> `);
    assert.shadowDom.equal(
      el,
      `<div class="progress-container">
      <div class="progress">
        <div
          aria-label=""
          aria-valuemax=""
          aria-valuemin=""
          aria-valuenow="50"
          class="progress-bar"
          role="progressbar"
          style="width:50%;"
        >
        </div>
      </div>`
    );
  });
});
