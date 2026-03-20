import { html } from "lit";

export default {
  title: "Foundation/Typography/Uppercase"
};

const BadgeLabelTemplate = () => html`
  <span class="sgds:text-xs sgds:font-semibold sgds:uppercase sgds:tracking-wider">Badge Label</span>
`;

const CategoryTagTemplate = () => html`
  <span class="sgds:text-xs sgds:font-semibold sgds:uppercase sgds:tracking-widest">Category Tag</span>
`;

export const BadgeLabel = {
  render: BadgeLabelTemplate.bind({}),
  name: "Badge Label"
};

export const CategoryTag = {
  render: CategoryTagTemplate.bind({}),
  name: "Category Tag"
};
