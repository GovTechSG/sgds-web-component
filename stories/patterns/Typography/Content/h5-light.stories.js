import { html } from "lit";

const H5LightTemplate = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <h5 class="sgds:text-body-lg sgds:font-light sgds:leading-md sgds:tracking-normal sgds:text-body-default">
      Content Subheading Goes Here
    </h5>
    <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
      Supporting body text that provides context and detail for the content above.
    </p>
  </div>
`;

export default {
  title: "Patterns/Typography/Content",
  parameters: {
    tags: ["!autodocs"],
    layout: "padded"
  }
};

export const H5Light = {
  render: H5LightTemplate.bind({}),
  name: "H5 Light"
};
