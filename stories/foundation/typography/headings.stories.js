import { html } from "lit";

export default {
  title: "Foundation/Typography/Headings"
};

const HeadingXlBoldTemplate = () => html`
  <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight">Heading XL Bold</h1>
`;

const HeadingXlLightTemplate = () => html`
  <h1 class="sgds:text-heading-xl sgds:font-light sgds:leading-xl sgds:tracking-tight">Heading XL Light</h1>
`;

const HeadingLgBoldTemplate = () => html`
  <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Heading Large Bold</h2>
`;

const HeadingLgLightTemplate = () => html`
  <h2 class="sgds:text-heading-lg sgds:font-light sgds:leading-lg sgds:tracking-tight">Heading Large Light</h2>
`;

const HeadingMdSemiboldTemplate = () => html`
  <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Heading Medium Semibold</h3>
`;

const HeadingMdLightTemplate = () => html`
  <h3 class="sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight">Heading Medium Light</h3>
`;

const HeadingSmSemiboldTemplate = () => html`
  <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Heading Small Semibold</h4>
`;

const HeadingSmLightTemplate = () => html`
  <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight">Heading Small Light</h4>
`;

export const HeadingXlBold = {
  render: HeadingXlBoldTemplate.bind({}),
  name: "Heading XL Bold"
};

export const HeadingXlLight = {
  render: HeadingXlLightTemplate.bind({}),
  name: "Heading XL Light"
};

export const HeadingLgBold = {
  render: HeadingLgBoldTemplate.bind({}),
  name: "Heading Large Bold"
};

export const HeadingLgLight = {
  render: HeadingLgLightTemplate.bind({}),
  name: "Heading Large Light"
};

export const HeadingMdSemibold = {
  render: HeadingMdSemiboldTemplate.bind({}),
  name: "Heading Medium Semibold"
};

export const HeadingMdLight = {
  render: HeadingMdLightTemplate.bind({}),
  name: "Heading Medium Light"
};

export const HeadingSmSemibold = {
  render: HeadingSmSemiboldTemplate.bind({}),
  name: "Heading Small Semibold"
};

export const HeadingSmLight = {
  render: HeadingSmLightTemplate.bind({}),
  name: "Heading Small Light"
};
