import { methodsTable, writeParams } from "../methodsTable.mjs";
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

describe("writeParams()", () => {
  const metaObj = {
    kind: "method",
    name: "getComponent",
    privacy: "public",
    parameters: [
      {
        name: "step",
        default: "this.activeStep",
        type: {
          text: "number"
        }
      }
    ],
    description:
      "By default, it returns the corresponding component of the current activeStep as defined in the steps metadata. To get other components, pass in your desired step number as the parameter",
    type: {}
  };
  const metaObjNoParams = {
    kind: "method",
    name: "getComponent",
    privacy: "public",
    description:
      "By default, it returns the corresponding component of the current activeStep as defined in the steps metadata. To get other components, pass in your desired step number as the parameter",
    type: {}
  };
  const metaObjParameterEmpty = {
    parameters: []
  };
  const metaObjParameterNoDefault = {
    parameters: [
      {
        name: "step",
        type: {
          text: "number"
        }
      }
    ]
  };
  const metaObjMultipleParameters = {
    parameters: [
      {
        name: "step",
        type: {
          text: "number"
        }
      },
      {
        name: "step",
        type: {
          text: "number"
        }
      }
    ]
  };
  it("it takes in metaObj and returns a string", () => {
    expect(typeof writeParams(metaObj)).to.equal("string");
  });
  it("if parameters key is not in object, then return empty string", () => {
    expect(writeParams(metaObjNoParams)).to.equal("");
  });
  it("if parameters array length is 0, return empty string", () => {
    expect(writeParams(metaObjParameterEmpty)).to.equal("");
  });
  it("if parameters array length> 0, must not empty string", () => {
    expect(writeParams(metaObj)).not.to.equal("");
  });
  // if parameters exist, expect string "step: number"
  it("process the parameters array to return string params", () => {
    expect(writeParams(metaObj)).to.include("step: number");
  });
  it("if parameters have default value", () => {
    expect(writeParams(metaObj)).to.equal("step: number = this.activeStep");
  });
  it("if parameters have no default value", () => {
    expect(writeParams(metaObjParameterNoDefault)).to.equal("step: number");
  });
  it("if more than one parameters, the params are joined by comma", () => {
    expect(writeParams(metaObjMultipleParameters)).to.equal("step: number, step: number");
  });
});
