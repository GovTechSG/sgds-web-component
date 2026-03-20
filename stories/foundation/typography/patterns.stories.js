import { html } from "lit";

export default {
  title: "Foundation/Typography/Patterns"
};

const StatisticsTemplate = () => html`
  <div class="sgds:text-center">
    <p class="sgds:text-primary-default sgds:text-5-xl sgds:font-bold sgds:leading-none sgds:mb-2">1,234</p>
    <p class="sgds:text-body-subtle sgds:text-sm sgds:font-medium sgds:uppercase sgds:tracking-wide">Active Users</p>
  </div>
`;

const ButtonsTemplate = () => html`
  <div class="sgds:flex sgds:gap-4">
    <button
      class="sgds:bg-primary-default sgds:text-white sgds:text-base sgds:font-medium sgds:px-6 sgds:py-3 sgds:rounded"
    >
      Button Text
    </button>
    <button
      class="sgds:bg-primary-default sgds:text-white sgds:text-sm sgds:font-medium sgds:px-4 sgds:py-2 sgds:rounded"
    >
      Small Button
    </button>
  </div>
`;

const CardHierarchyTemplate = () => html`
  <div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
    <h3 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:leading-tight sgds:mb-2">Card Title</h3>
    <p class="sgds:text-body-subtle sgds:text-sm sgds:leading-normal sgds:mb-4">Updated 2 hours ago</p>
    <p class="sgds:text-body-default sgds:text-base sgds:leading-relaxed sgds:mb-4">
      Main card description with comfortable readability.
    </p>
    <a href="#" class="sgds:text-link-default sgds:text-sm sgds:font-medium">Read more →</a>
  </div>
`;

export const Statistics = {
  render: StatisticsTemplate.bind({}),
  name: "Statistics / Numbers"
};

export const Buttons = {
  render: ButtonsTemplate.bind({}),
  name: "Buttons"
};

export const CardHierarchy = {
  render: CardHierarchyTemplate.bind({}),
  name: "Card with Typography Hierarchy"
};
