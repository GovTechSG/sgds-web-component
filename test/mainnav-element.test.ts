import { MainNavElement, MainNavItem } from "../src/MainNav";
import "../src/MainNav";
import {
  fixture,
  assert,
  expect,
  waitUntil,
  elementUpdated,
  aTimeout,
} from "@open-wc/testing";
import { html } from "lit";
import sinon from "sinon";

describe("sidenav-element", () => {
  it("is defined", () => {
    const el = document.createElement("mainnav-element");
    assert.instanceOf(el, MainNavElement);
  });

  it("can be semantically compare with shadowDom trees", async () => {
    const el = await fixture(html`<mainnav-element></mainnav-element>`);
    assert.shadowDom.equal(
      el,
      ` <nav class="sidenav">
         <ul>
          <slot></slot>
        </ul>
      </nav>`
    );
  });

})