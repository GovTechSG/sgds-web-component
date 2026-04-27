import { html } from "lit";

const H4Template = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
      Content Heading Goes Here
    </h4>
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

export const H4 = {
  render: H4Template.bind({}),
  name: "H4"
};
