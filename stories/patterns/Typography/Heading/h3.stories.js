import { html } from "lit";

const H3Template = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <h3 class="sgds:text-heading-md sgds:font-bold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
      Subsection Heading Goes Here
    </h3>
    <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
      Supporting body text that provides context and detail for the subsection above.
    </p>
  </div>
`;

export default {
  title: "Patterns/Typography/Heading",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const H3 = {
  render: H3Template.bind({}),
  name: "H3"
};
