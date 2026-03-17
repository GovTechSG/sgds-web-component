import { html } from "lit";
import NonInteractiveDocsPage from "../../../.storybook/NonInteractiveDocsPage";

export default {
  title: "Foundation/Typography/Subtitles",
  parameters: {
    docs: { page: NonInteractiveDocsPage }
  }
};

const DefaultTemplate = () => html`
  <div class="sgds:flex sgds:flex-col">
    <h5>Subtitle Header H5</h5>
    <h6>Subtitle Header H6</h6>
  </div>
`;

const SubtitleMdSemiboldTemplate = () => html`
  <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
    Subtitle Medium Semibold
  </h5>
`;

const SubtitleMdLightTemplate = () => html`
  <h5 class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal">Subtitle Medium Light</h5>
`;

const SubtitleSmSemiboldTemplate = () => html`
  <h6 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">
    Subtitle Small Semibold
  </h6>
`;

const SubtitleSmLightTemplate = () => html`
  <h6 class="sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal">Subtitle Small Light</h6>
`;

export const Default = {
  render: DefaultTemplate.bind({}),
  name: "Default"
};
export const SubtitleMdSemibold = {
  render: SubtitleMdSemiboldTemplate.bind({}),
  name: "Medium Semibold"
};

export const SubtitleMdLight = {
  render: SubtitleMdLightTemplate.bind({}),
  name: "Medium Light"
};

export const SubtitleSmSemibold = {
  render: SubtitleSmSemiboldTemplate.bind({}),
  name: "Small Semibold"
};

export const SubtitleSmLight = {
  render: SubtitleSmLightTemplate.bind({}),
  name: "Small Light"
};
