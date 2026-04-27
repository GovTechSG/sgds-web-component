import { html } from "lit";

const DisplaySmCenterLightTemplate = () => html`
  <div
    class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center"
    style="max-width: var(--sgds-text-max-width);"
  >
    <div
      class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
    >
      Overline Label
    </div>
    <h1 class="sgds:text-display-sm sgds:font-light sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default">
      Display Small Center Light Heading
    </h1>
    <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
      Supporting heading that provides context and detail for the section above.
    </h4>
  </div>
`;

export default {
  title: "Patterns/Typography/Display",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const DisplaySmallCenterLight = {
  render: DisplaySmCenterLightTemplate.bind({}),
  name: "Display Small Center Light"
};
