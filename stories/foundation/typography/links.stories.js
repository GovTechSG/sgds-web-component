import { html } from "lit";
import NonInteractiveDocsPage from "../../../.storybook/NonInteractiveDocsPage";

export default {
  title: "Foundation/Typography/Links",
  parameters: {
    docs: { page: NonInteractiveDocsPage }
  }
};

const AllLinksTemplate = () => html` <a href="#">Anchor link</a> `;

const LinkLgTemplate = () => html`
  <a href="#" class="sgds:text-link-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:underline"
    >Link large</a
  >
`;

const LinkMdTemplate = () => html`
  <a href="#" class="sgds:text-link-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:underline"
    >Link medium</a
  >
`;

const LinkSmTemplate = () => html`
  <a href="#" class="sgds:text-link-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:underline"
    >Link small</a
  >
`;

const LinkXsTemplate = () => html`
  <a href="#" class="sgds:text-link-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal sgds:underline"
    >Link XS</a
  >
`;

export const AllLinks = {
  render: AllLinksTemplate.bind({}),
  name: "Default"
};

export const LinkLg = {
  render: LinkLgTemplate.bind({}),
  name: "Large"
};

export const LinkMd = {
  render: LinkMdTemplate.bind({}),
  name: "Medium"
};

export const LinkSm = {
  render: LinkSmTemplate.bind({}),
  name: "Small"
};

export const LinkXs = {
  render: LinkXsTemplate.bind({}),
  name: "XS"
};
