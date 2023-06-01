import {
  splitUnionTypes,
  updateMembersOfDeclarations,
  updateMembersOfDeclaration,
  resolveTypeAliasInMembers
} from "../resolveTypeAliasPlugin.mjs";
import { expect } from "@open-wc/testing";

describe("splitUnionTypes()", () => {
  it("if parameter is falsy return the parameter as is", () => {
    expect(splitUnionTypes(undefined)).to.be.undefined;
    expect(splitUnionTypes("")).to.deep.equal("");
    expect(splitUnionTypes(null)).to.be.null;
  });

  it("should split in | ", () => {
    expect(splitUnionTypes("primary | secondary | tertiary")).to.deep.equal(["primary", "secondary", "tertiary"]);
  });
  it("if string does not have | do not split", () => {
    expect(splitUnionTypes("primary")).to.deep.equal(["primary"]);
  });
});

const mockMap = new Map();
mockMap.set("ButtonVariant", ["primary", "secondary", "warning"]);
mockMap.set("DropdownDirection", ["up", "down", "left"]);

const mockMemberButtonVariant = {
  type: { text: "ButtonVariant | undefined" },
  name: "button"
};
const mockMemberHTMLElement = {
  type: { text: "HTMLElement | undefined" },
  name: "test"
};

const mockDeclaration = { members: [mockMemberButtonVariant, mockMemberHTMLElement] };
describe("resolveTypeAliasInMembers()", () => {
  it("if hashmap has the key value, it returns the values of it in members.type.text", () => {
    expect(resolveTypeAliasInMembers(mockMemberButtonVariant, mockMap)).to.deep.equal({
      type: { text: "primary | secondary | warning | undefined" },
      name: "button"
    });
  });
  it("if hashmap does not have the key value, it returns the values of it in members.type.text", () => {
    expect(resolveTypeAliasInMembers(mockMemberHTMLElement, mockMap)).to.deep.equal(mockMemberHTMLElement);
  });
});

describe("updateMembersOfDeclaration()", () => {
  it("if parameter is falsy, return parameter as is", () => {
    expect(updateMembersOfDeclaration({ members: undefined }, mockMap)).to.deep.equal({ members: undefined });
    expect(updateMembersOfDeclaration({ name: "", tagName: "test" }, mockMap)).to.deep.equal({
      name: "",
      tagName: "test"
    });
  });
  it("takes in declaration and returns with members of type alias replaced", () => {
    const expected = {
      members: [
        {
          type: { text: "primary | secondary | warning | undefined" },
          name: "button"
        },
        {
          type: { text: "HTMLElement | undefined" },
          name: "test"
        }
      ]
    };
    expect(updateMembersOfDeclaration(mockDeclaration, mockMap)).to.deep.equal(expected);
  });
});

const mockDeclarations = [mockDeclaration];
describe("updateMembersOfDeclarations()", () => {
  it("if parameter is falsy, return parameter as is", () => {
    expect(updateMembersOfDeclarations(undefined, mockMap)).to.equal(undefined);
  });

  it("given mockDeclarations, returns array of declarations with new declaration", () => {
    expect(updateMembersOfDeclarations(mockDeclarations, mockMap)).to.deep.equal([
      {
        members: [
          {
            type: { text: "primary | secondary | warning | undefined" },
            name: "button"
          },
          {
            type: { text: "HTMLElement | undefined" },
            name: "test"
          }
        ]
      }
    ]);
  });
});
