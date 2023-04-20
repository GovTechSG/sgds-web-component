import { makeArgTypes } from '../makeArgTypes.mjs';
import { expect } from '@open-wc/testing';

describe('makeArgTypes()', () => {
  const textInput = [
    {
      kind: 'field',
      name: 'content',
      type: { text: 'string' },
      default: '""',
      attribute: 'content'
    }
  ];
  const stringAndUndefined = [
    {
      kind: 'field',
      name: 'content',
      type: { text: 'string | undefined' },
      default: '""',
      attribute: 'content'
    }
  ];
  const booleanInput = [
    {
      kind: 'field',
      name: 'content',
      type: { text: 'boolean' },
      default: '""',
      attribute: 'content'
    }
  ];
  const numberInput = [
    {
      kind: 'field',
      name: 'content',
      type: { text: 'number' },
      default: '""',
      attribute: 'content'
    }
  ];
  const multipleInput = [
    {
      kind: 'field',
      name: 'content',
      type: { text: '"click" | "hover" | "focus" | "hover focus"' },
      default: '""',
      attribute: 'content'
    }
  ];
  const arrayInput = [
    {
      kind: 'field',
      name: 'content',
      type: { text: 'array' },
      default: '""',
      attribute: 'content'
    }
  ];
  const typeOthersInput = [
    {
      kind: 'field',
      name: 'closableContainer',
      type: { text: 'HTMLElement' }
    },
    {
      kind: 'field',
      name: 'popperConfig',
      type: { text: 'Partial<Popper.Options>' }
    },
    {
      kind: 'field',
      name: 'tooltipConfig',
      type: { text: 'Partial<Tooltip.Options>' }
    }
  ];

  it('returns an object', () => {
    expect(makeArgTypes(typeOthersInput).constructor.name).to.equal('Object');
  });
  it('type.text.string output should be content.control.text', () => {
    const expected = {
      content: { control: 'text' }
    };
    expect(JSON.stringify(makeArgTypes(textInput))).to.equal(JSON.stringify(expected));
  });
  it('type.text.boolean output should be content.control.boolean', () => {
    const expected = {
      content: { control: 'boolean' }
    };
    expect(JSON.stringify(makeArgTypes(booleanInput))).to.equal(JSON.stringify(expected));
  });
  it('type.text.number output should be content.control.number', () => {
    const expected = {
      content: { control: 'number' }
    };
    expect(JSON.stringify(makeArgTypes(numberInput))).to.equal(JSON.stringify(expected));
  });
  it('type.text with multiple options output should be content.control.select', () => {
    const expected = {
      content: {
        control: 'select',
        options: ['click', 'hover', 'focus', 'hover focus']
      }
    };
    expect(JSON.stringify(makeArgTypes(multipleInput))).to.equal(JSON.stringify(expected));
  });
  it('type.text.array output should be content.control.object', () => {
    const expected = {
      content: { control: 'object' }
    };
    expect(JSON.stringify(makeArgTypes(arrayInput))).to.equal(JSON.stringify(expected));
  });
  it('type.text others output should be content.control.object', () => {
    const expected = {
      closableContainer: { control: 'object' },
      popperConfig: { control: 'object' },
      tooltipConfig: { control: 'object' }
    };
    expect(JSON.stringify(makeArgTypes(typeOthersInput))).to.equal(JSON.stringify(expected));
  });
  it('type.text string | undefined output should be content.control.text', () => {
    const expected = {
      content: { control: 'text' }
    };
    expect(JSON.stringify(makeArgTypes(stringAndUndefined))).to.equal(JSON.stringify(expected));
  });
});