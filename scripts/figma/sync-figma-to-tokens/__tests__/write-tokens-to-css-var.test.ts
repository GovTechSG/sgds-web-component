import { expect } from "@open-wc/testing";
import { tokenNameToCssVar } from "../write-tokens-to-css-var";

describe("tokenNameToCssVar()", () => {
  it("should convert '{sgds-dimension-320}' to 'var(--sgds-dimension-320)'", () => {
    const input = "{sgds-dimension-320}";
    const output = tokenNameToCssVar(input);
    expect(output).to.equal("var(--sgds-dimension-320)");
  });
  it("should not handle token names without curly braces, returns undefined", () => {
    const input = "#3FFFF";
    const output = tokenNameToCssVar(input);
    expect(output).not.to.equal("var(--3FFFF)");
    expect(output).to.be.undefined;
  });
});
