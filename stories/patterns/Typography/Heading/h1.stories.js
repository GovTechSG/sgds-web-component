import { html } from "lit";

const H1Template = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
      Overline Label
    </div>
    <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
      Page Heading Goes Here
    </h1>
    <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
      Supporting body text that provides context and detail for the page or section above.
    </p>
  </div>
`;

export default {
  title: "Patterns/Typography/Heading",
  parameters: {
    tags: ["!autodocs"],
    layout: "padded"
  }
};

export const H1 = {
  render: H1Template.bind({}),
  name: "H1"
};
