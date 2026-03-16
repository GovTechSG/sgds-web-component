import { html } from "lit";

export default {
  title: "Foundation/Typography/Captions"
};

const CaptionSemiboldTemplate = () => html`
  <div role="caption" class="sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
    Caption semibold
  </div>
`;

const CaptionRegularTemplate = () => html`
  <div role="caption" class="sgds:text-caption-md sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
    Caption regular
  </div>
`;

export const CaptionSemibold = {
  render: CaptionSemiboldTemplate.bind({}),
  name: "Caption Semibold"
};

export const CaptionRegular = {
  render: CaptionRegularTemplate.bind({}),
  name: "Caption Regular"
};
