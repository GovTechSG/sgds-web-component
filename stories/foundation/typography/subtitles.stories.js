import { html } from "lit";

export default {
  title: "Foundation/Typography/Subtitles"
};

const SubtitleMdSemiboldTemplate = () => html`
  <div
    role="heading"
    aria-level="5"
    class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal"
  >
    Subtitle Medium Semibold
  </div>
`;

const SubtitleMdLightTemplate = () => html`
  <div role="heading" aria-level="5" class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal">
    Subtitle Medium Light
  </div>
`;

const SubtitleSmSemiboldTemplate = () => html`
  <div
    role="heading"
    aria-level="6"
    class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal"
  >
    Subtitle Small Semibold
  </div>
`;

const SubtitleSmLightTemplate = () => html`
  <div
    role="heading"
    aria-level="6"
    class="sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal"
  >
    Subtitle Small Light
  </div>
`;

export const SubtitleMdSemibold = {
  render: SubtitleMdSemiboldTemplate.bind({}),
  name: "Subtitle Medium Semibold"
};

export const SubtitleMdLight = {
  render: SubtitleMdLightTemplate.bind({}),
  name: "Subtitle Medium Light"
};

export const SubtitleSmSemibold = {
  render: SubtitleSmSemiboldTemplate.bind({}),
  name: "Subtitle Small Semibold"
};

export const SubtitleSmLight = {
  render: SubtitleSmLightTemplate.bind({}),
  name: "Subtitle Small Light"
};
