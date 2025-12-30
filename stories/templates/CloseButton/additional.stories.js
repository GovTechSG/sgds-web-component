import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
const SizeTemplate = args => html`
  <div style="display: flex; gap: 1rem; align-items: center;">
    <sgds-close-button size="sm"></sgds-close-button>
    <sgds-close-button size="md"></sgds-close-button>
  </div>
`;

const ToneDefaultTemplate = args => html` <sgds-close-button tone="default"></sgds-close-button> `;

const ToneFixedDarkTemplate = args => html`
  <div style="width: 100%; background: #fff; padding: 1rem; display: inline-block;">
    <sgds-close-button tone="fixed-dark"></sgds-close-button>
  </div>
`;

const ToneFixedLightTemplate = args => html`
  <div style="width: 100%; background: #222; padding: 1rem; display: inline-block;">
    <sgds-close-button tone="fixed-light"></sgds-close-button>
  </div>
`;

export const Sizes = {
  render: SizeTemplate,
  name: "Sizes",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ToneDefault = {
  render: ToneDefaultTemplate,
  name: "Tone: default",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ToneFixedDark = {
  render: ToneFixedDarkTemplate,
  name: "Tone: fixed-dark",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const ToneFixedLight = {
  render: ToneFixedLightTemplate,
  name: "Tone: fixed-light",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
