import { getSgdsComponents } from "../shared.mjs";
import { fixture, expect, waitUntil } from "@open-wc/testing";

/**
 * {
  kind: 'class',
  description: '',
  name: 'SgdsTooltip',
  members: [
    { kind: 'field', name: 'myTooltip', type: [Object] },
    {
      kind: 'field',
      name: 'bsTooltip',
      type: [Object],
      default: 'null'
    },
    {
      kind: 'field',
      name: 'content',
      type: [Object],
      default: '""',
      attribute: 'content'
    },
    {
      kind: 'field',
      name: 'placement',
      type: [Object],
      default: '"top"',
      attribute: 'placement'
    },
    {
      kind: 'field',
      name: 'trigger',
      type: [Object],
      default: '"hover focus"',
      attribute: 'trigger'
    },
    { kind: 'field', name: 'closableContainer', type: [Object] },
    { kind: 'field', name: 'popperConfig', type: [Object] },
    { kind: 'field', name: 'tooltipConfig', type: [Object] },
    { kind: 'method', name: 'closeTooltip' },
    {
      kind: 'method',
      name: 'emit',
      parameters: [Array],
      description: 'Emits a custom event with more convenient defaults.',
      inheritedFrom: [Object]
    }
  ],
  attributes: [
    {
      name: 'content',
      type: [Object],
      default: '""',
      fieldName: 'content'
    },
    {
      name: 'placement',
      type: [Object],
      default: '"top"',
      fieldName: 'placement'
    },
    {
      name: 'trigger',
      type: [Object],
      default: '"hover focus"',
      fieldName: 'trigger'
    }
  ],
  superclass: { name: 'SgdsElement', module: '/src/base/sgds-element' },
  tagName: 'sgds-tooltip',
  customElement: true,
  modulePath: 'src/Tooltip/sgds-tooltip.ts'
}
 */
describe("getSgdsComponents()", () => {
  const input = [
    {
      modulePath: "src/components/Tooltip/sgds-tooltip.ts"
    },
    {
      modulePath: "rubbish/test"
    },
    {
      modulePath: "src/base/test"
    }
  ];

  it("returns an array", () => {
    expect(Array.isArray(getSgdsComponents(input))).to.be.true;
  });
  it("should output components starting with sgds-* only", () => {
    const expected = [{ modulePath: "src/components/Tooltip/sgds-tooltip.ts" }];
    expect(JSON.stringify(getSgdsComponents(input))).to.equal(JSON.stringify(expected));
  });
});
