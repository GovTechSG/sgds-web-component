import { html } from "lit";
import NonInteractiveDocsPage from "../../../.storybook/NonInteractiveDocsPage";

export default {
  title: "Foundation/Typography/Captions",
  parameters: {
    docs: { page: NonInteractiveDocsPage }
  }
};

const AllCaptionsTemplate = () => html` <div>Caption</div> `;

const CaptionSemiboldTemplate = () => html`
  <div class="sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
    Caption semibold
  </div>
`;

const CaptionRegularTemplate = () => html`
  <div class="sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
    Caption regular
  </div>
`;

export const AllCaptions = {
  render: AllCaptionsTemplate.bind({}),
  name: "Default"
};

export const CaptionSemibold = {
  render: CaptionSemiboldTemplate.bind({}),
  name: "Semibold"
};

export const CaptionRegular = {
  render: CaptionRegularTemplate.bind({}),
  name: "Regular"
};
