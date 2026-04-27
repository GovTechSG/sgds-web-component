import { html } from "lit";

const H6LightTemplate = () => html`
  <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left" style="max-width: var(--sgds-text-max-width);">
    <h6 class="sgds:text-body-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-body-default">
      Content Small Heading Goes Here
    </h6>
    <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
      Supporting body text that provides context and detail for the content above.
    </p>
  </div>
`;

export default {
  title: "Patterns/Typography/Content",
  tags: ["!autodocs"],
  parameters: { layout: "padded"
  }
};

export const H6Light = {
  render: H6LightTemplate.bind({}),
  name: "H6 Light"
};
