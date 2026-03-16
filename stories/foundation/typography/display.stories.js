import { html } from "lit";

export default {
  title: "Foundation/Typography/Display"
};

const DisplayLgBoldTemplate = () => html`
  <div
    role="heading"
    aria-level="1"
    class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter"
  >
    Display Large Bold
  </div>
`;

const DisplayLgLightTemplate = () => html`
  <div
    role="heading"
    aria-level="1"
    class="sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter"
  >
    Display Large Light
  </div>
`;

const DisplayMdBoldTemplate = () => html`
  <div
    role="heading"
    aria-level="1"
    class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter"
  >
    Display Medium Bold
  </div>
`;

const DisplayMdLightTemplate = () => html`
  <div
    role="heading"
    aria-level="1"
    class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter"
  >
    Display Medium Light
  </div>
`;

const DisplaySmBoldTemplate = () => html`
  <div role="heading" aria-level="1" class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter">
    Display Small Bold
  </div>
`;

const DisplaySmLightTemplate = () => html`
  <div role="heading" aria-level="1" class="sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter">
    Display Small Light
  </div>
`;

export const DisplayLgBold = {
  render: DisplayLgBoldTemplate.bind({}),
  name: "Display Large Bold"
};

export const DisplayLgLight = {
  render: DisplayLgLightTemplate.bind({}),
  name: "Display Large Light"
};

export const DisplayMdBold = {
  render: DisplayMdBoldTemplate.bind({}),
  name: "Display Medium Bold"
};

export const DisplayMdLight = {
  render: DisplayMdLightTemplate.bind({}),
  name: "Display Medium Light"
};

export const DisplaySmBold = {
  render: DisplaySmBoldTemplate.bind({}),
  name: "Display Small Bold"
};

export const DisplaySmLight = {
  render: DisplaySmLightTemplate.bind({}),
  name: "Display Small Light"
};
