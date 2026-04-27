import { html } from "lit";

const H3LightTemplate = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <h3 class="sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
      Subsection Heading Goes Here
    </h3>
    <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
      Supporting body text that provides context and detail for the subsection above.
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

export const H3Light = {
  render: H3LightTemplate.bind({}),
  name: "H3 Light"
};
