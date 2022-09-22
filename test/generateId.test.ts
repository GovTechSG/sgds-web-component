import generateId from "../src/utils/generateId";
import { expect } from "@open-wc/testing";
import sinon from "sinon";

describe("generateId function", () => {
  sinon.stub(Math, "random").returns(1234567);

  it("returns a string", () => {
    expect(typeof generateId()).to.equal("string");
  });
  it("returns an id with the correct structure", () => {
    expect(generateId()).to.equal("id-3456-sgds--");
  });

  it("when suffix specified , should return with suffix", () => {
    expect(generateId("test", 'test')).to.equal("id-3456-sgds-test-test");
  });
});
