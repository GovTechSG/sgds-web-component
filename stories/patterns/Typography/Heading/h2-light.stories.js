import { html } from "lit";

const H2LightTemplate = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <div
      class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
    >
      Overline Label
    </div>
    <h2 class="sgds:text-heading-lg sgds:font-light sgds:leading-lg sgds:tracking-tight sgds:text-heading-default">
      Section Heading Goes Here
    </h2>
    <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
      Supporting body text that provides context and detail for the section above.
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

export const H2Light = {
  render: H2LightTemplate.bind({}),
  name: "H2 Light"
};
