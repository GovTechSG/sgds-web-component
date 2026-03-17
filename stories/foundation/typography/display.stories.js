import { html } from "lit";
import NonInteractiveDocsPage from "../../../.storybook/NonInteractiveDocsPage";

export default {
  title: "Foundation/Typography/Display",
  parameters: {
    docs: { page: NonInteractiveDocsPage }
  }
};

const DisplayLgBoldTemplate = () => html`
  <h1 class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter">Display Large Bold</h1>
`;

const DisplayLgLightTemplate = () => html`
  <h1 class="sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter">Display Large Light</h1>
`;

const DisplayMdBoldTemplate = () => html`
  <h1 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter">Display Medium Bold</h1>
`;

const DisplayMdLightTemplate = () => html`
  <h1 class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter">Display Medium Light</h1>
`;

const DisplaySmBoldTemplate = () => html`
  <h1 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter">Display Small Bold</h1>
`;

const DisplaySmLightTemplate = () => html`
  <h1 class="sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter">Display Small Light</h1>
`;

export const DisplayLgBold = {
  render: DisplayLgBoldTemplate.bind({}),
  name: "Large Bold"
};

export const DisplayLgLight = {
  render: DisplayLgLightTemplate.bind({}),
  name: "Large Light"
};

export const DisplayMdBold = {
  render: DisplayMdBoldTemplate.bind({}),
  name: "Medium Bold"
};

export const DisplayMdLight = {
  render: DisplayMdLightTemplate.bind({}),
  name: "Medium Light"
};

export const DisplaySmBold = {
  render: DisplaySmBoldTemplate.bind({}),
  name: "Small Bold"
};

export const DisplaySmLight = {
  render: DisplaySmLightTemplate.bind({}),
  name: "Small Light"
};
