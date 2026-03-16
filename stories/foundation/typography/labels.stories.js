import { html } from "lit";

export default {
  title: "Foundation/Typography/Labels"
};

const LabelLgSemiboldTemplate = () => html`
  <div class="sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal">Label Large Semibold</div>
`;

const LabelLgRegularTemplate = () => html`
  <div class="sgds:text-label-lg sgds:font-regular sgds:leading-md sgds:tracking-normal">Label Large Regular</div>
`;

const LabelMdSemiboldTemplate = () => html`
  <div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Label Medium Semibold</div>
`;

const LabelMdRegularTemplate = () => html`
  <div class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Label Medium Regular</div>
`;

const LabelMdLightTemplate = () => html`
  <div class="sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal">Label Medium Light</div>
`;

const LabelSmSemiboldTemplate = () => html`
  <div class="sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">Label Small Semibold</div>
`;

const LabelSmRegularTemplate = () => html`
  <div class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">Label Small Regular</div>
`;

const LabelXsSemiboldTemplate = () => html`
  <div class="sgds:text-label-xs sgds:font-semibold sgds:leading-3-xs sgds:tracking-normal">Label XS Semibold</div>
`;

const LabelXsRegularTemplate = () => html`
  <div class="sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal">Label XS Regular</div>
`;

const FormBuiltInTemplate = () => html` <sgds-input label="Field label"></sgds-input> `;

const FormFallbackTemplate = () => html`
  <label class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Field Label</label>
`;

export const LabelLgSemibold = {
  render: LabelLgSemiboldTemplate.bind({}),
  name: "Large Semibold"
};

export const LabelLgRegular = {
  render: LabelLgRegularTemplate.bind({}),
  name: "Large Regular"
};

export const LabelMdSemibold = {
  render: LabelMdSemiboldTemplate.bind({}),
  name: "Medium Semibold"
};

export const LabelMdRegular = {
  render: LabelMdRegularTemplate.bind({}),
  name: "Medium Regular"
};

export const LabelMdLight = {
  render: LabelMdLightTemplate.bind({}),
  name: "Medium Light"
};

export const LabelSmSemibold = {
  render: LabelSmSemiboldTemplate.bind({}),
  name: "Small Semibold"
};

export const LabelSmRegular = {
  render: LabelSmRegularTemplate.bind({}),
  name: "Small Regular"
};

export const LabelXsSemibold = {
  render: LabelXsSemiboldTemplate.bind({}),
  name: "XS Semibold"
};

export const LabelXsRegular = {
  render: LabelXsRegularTemplate.bind({}),
  name: "XS Regular"
};

export const FormBuiltIn = {
  render: FormBuiltInTemplate.bind({}),
  name: "Form — Built-in Label"
};

export const FormFallback = {
  render: FormFallbackTemplate.bind({}),
  name: "Form — Fallback Label"
};
