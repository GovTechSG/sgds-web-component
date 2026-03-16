import { html } from "lit";
import NonInteractiveDocsPage from "../../../.storybook/NonInteractiveDocsPage";

export default {
  title: "Foundation/Typography/Overline",
  parameters: {
    docs: { page: NonInteractiveDocsPage }
  }
};

const OverlineSemiboldTemplate = () => html`
  <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase">
    Overline Semibold
  </div>
`;

const OverlineRegularTemplate = () => html`
  <div class="sgds:text-overline-md sgds:font-regular sgds:leading-2-xs sgds:tracking-wide sgds:uppercase">
    Overline Regular
  </div>
`;

export const OverlineSemibold = {
  render: OverlineSemiboldTemplate.bind({}),
  name: "Semibold"
};

export const OverlineRegular = {
  render: OverlineRegularTemplate.bind({}),
  name: "Regular"
};
