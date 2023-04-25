import { methodsTable } from "../methodsTable.mjs";
import { expect } from "@open-wc/testing";

const metadata = [
  {
    kind: "class",
    description: "",
    name: "SgdsTabPanel",
    cssProperties: [[Object]],
    cssParts: [[Object]],
    slots: [[Object]],
    members: [
      { kind: "method", privacy: "public" },
      { kind: "field", privacy: "protected" },
      { kind: "method", privacy: "private" }
    ],
    attributes: [[Object], [Object]],
    superclass: { name: "SgdsElement", module: "/src/base/sgds-element" },
    summary: "Tab panels are used inside [tab groups](/components/tab-group) to display tabbed content.",
    tagName: "sgds-tab-panel",
    customElement: true,
    modulePath: "src/Tab/sgds-tabpanel.ts"
  }
];
describe("MethodsTable", () => {
  it("takes in array and returns array", () => {
    expect(Array.isArray(methodsTable(metadata))).to.be.true;
  });
  it("takes in metadata and returns tagName and methods keys", () => {
    const expected = {
      tagName: "sgds-tab-panel",
      methods: [{ kind: "method", privacy: "public" }]
    };
    expect(Object.keys(methodsTable(metadata)[0])).to.deep.equal(["tagName", "methods"]);
  });
  it("filters out public methods only", () => {
    const expected = [
      {
        tagName: "sgds-tab-panel",
        methods: [{ kind: "method", privacy: "public" }]
      }
    ];
    expect(methodsTable(metadata)).to.deep.equal(expected);
  });
});
