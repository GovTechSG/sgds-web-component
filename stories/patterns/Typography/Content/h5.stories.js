import { html } from "lit";

const H5Template = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <h5 class="sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:text-body-default">
      Content Subheading Goes Here
    </h5>
    <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
      Supporting body text that provides context and detail for the content above.
    </p>
  </div>
`;

export default {
  title: "Patterns/Typography/Content",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const H5 = {
  render: H5Template.bind({}),
  name: "H5"
};
