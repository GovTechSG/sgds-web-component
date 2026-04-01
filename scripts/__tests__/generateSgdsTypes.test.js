import { expect } from "@open-wc/testing";
import {
  componentNameFromPath,
  toPropsInterface,
  toReactEventPropKey,
  shouldIncludeMember,
} from "../generateSgdsTypes.helpers.mjs";

// ---------------------------------------------------------------------------
// componentNameFromPath
// ---------------------------------------------------------------------------

describe("componentNameFromPath()", () => {
  it("extracts the folder name from a src/components path", () => {
    expect(componentNameFromPath("src/components/ComboBox/sgds-combo-box.ts")).to.equal("ComboBox");
    expect(componentNameFromPath("src/components/Accordion/sgds-accordion.ts")).to.equal("Accordion");
    expect(componentNameFromPath("src/components/FileUpload/sgds-file-upload.ts")).to.equal("FileUpload");
  });

  it("returns null for paths outside src/components", () => {
    expect(componentNameFromPath("src/base/sgds-element.ts")).to.be.null;
    expect(componentNameFromPath("lib/components/Button/index.js")).to.be.null;
    expect(componentNameFromPath("rubbish/test")).to.be.null;
  });
});

// ---------------------------------------------------------------------------
// toPropsInterface
// ---------------------------------------------------------------------------

describe("toPropsInterface()", () => {
  it("appends Props to the class name", () => {
    expect(toPropsInterface("SgdsComboBox")).to.equal("SgdsComboBoxProps");
    expect(toPropsInterface("SgdsButton")).to.equal("SgdsButtonProps");
    expect(toPropsInterface("SgdsAccordionItem")).to.equal("SgdsAccordionItemProps");
  });
});

// ---------------------------------------------------------------------------
// toReactEventPropKey
// ---------------------------------------------------------------------------

describe("toReactEventPropKey()", () => {
  it("prepends on and keeps the event name as-is (kebab-case, quoted)", () => {
    expect(toReactEventPropKey("sgds-change")).to.equal('"onsgds-change"');
    expect(toReactEventPropKey("sgds-input")).to.equal('"onsgds-input"');
    expect(toReactEventPropKey("sgds-page-change")).to.equal('"onsgds-page-change"');
  });
});

// ---------------------------------------------------------------------------
// shouldIncludeMember
// ---------------------------------------------------------------------------

describe("shouldIncludeMember()", () => {
  const base = { kind: "field", name: "label", type: { text: "string" } };

  it("includes a plain public field", () => {
    expect(shouldIncludeMember(base)).to.be.true;
  });

  it("includes a field whose privacy is explicitly public", () => {
    expect(shouldIncludeMember({ ...base, privacy: "public" })).to.be.true;
  });
  // types does not need class methods, and we want to exclude them to avoid confusion with prop types that are functions
  it("excludes methods", () => {
    expect(shouldIncludeMember({ ...base, kind: "method" })).to.be.false;
  });

  it("excludes static fields", () => {
    expect(shouldIncludeMember({ ...base, static: true })).to.be.false;
  });

  it("excludes private fields", () => {
    expect(shouldIncludeMember({ ...base, privacy: "private" })).to.be.false;
  });

  it("excludes protected fields", () => {
    expect(shouldIncludeMember({ ...base, privacy: "protected" })).to.be.false;
  });

  it("excludes fields whose name starts with _", () => {
    expect(shouldIncludeMember({ ...base, name: "_internal" })).to.be.false;
  });

  it("excludes fields whose description contains @internal", () => {
    expect(shouldIncludeMember({ ...base, description: "Some field. @internal" })).to.be.false;
  });

  it("excludes fields inherited from an external package", () => {
    expect(
      shouldIncludeMember({ ...base, inheritedFrom: { package: "lit", name: "SomeBase" } })
    ).to.be.false;
  });

  it("includes fields inherited from within the project (no package key)", () => {
    expect(
      shouldIncludeMember({ ...base, inheritedFrom: { name: "SgdsElement" } })
    ).to.be.true;
  });
});
