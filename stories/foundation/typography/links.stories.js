import { html } from "lit";

export default {
  title: "Foundation/Typography/Links"
};

const LinkLgTemplate = () => html`
  <a href="#" class="sgds:text-link-lg sgds:font-normal sgds:leading-md sgds:tracking-normal sgds:underline"
    >Link large</a
  >
`;

const LinkMdTemplate = () => html`
  <a href="#" class="sgds:text-link-md sgds:font-normal sgds:leading-xs sgds:tracking-normal sgds:underline"
    >Link medium</a
  >
`;

const LinkSmTemplate = () => html`
  <a href="#" class="sgds:text-link-sm sgds:font-normal sgds:leading-2-xs sgds:tracking-normal sgds:underline"
    >Link small</a
  >
`;

const LinkXsTemplate = () => html`
  <a href="#" class="sgds:text-link-xs sgds:font-normal sgds:leading-3-xs sgds:tracking-normal sgds:underline"
    >Link XS</a
  >
`;

export const LinkLg = {
  render: LinkLgTemplate.bind({}),
  name: "Link Large"
};

export const LinkMd = {
  render: LinkMdTemplate.bind({}),
  name: "Link Medium"
};

export const LinkSm = {
  render: LinkSmTemplate.bind({}),
  name: "Link Small"
};

export const LinkXs = {
  render: LinkXsTemplate.bind({}),
  name: "Link XS"
};
