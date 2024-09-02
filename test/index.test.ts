import "./sgds-web-component";

import * as Components from "../src/components";
import { assert } from "@open-wc/testing";

const tagNameConverter = (key: string) => key.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();

describe("custom element registration is correct", () => {
  for (const [key, value] of Object.entries(Components)) {
    const customElementTag = tagNameConverter(key);
    it("is defined", () => {
      const el = document.createElement(customElementTag);
      assert.instanceOf(el, value as any);
    });
  }
});
