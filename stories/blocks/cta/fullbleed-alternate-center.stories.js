import { html } from "lit";

export default {
  title: "Blocks/Call To Action/Full Bleed Alternate Center"
};

const Template = () => {
  return html`
    <section class="sgds:bg-alternate sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:max-w-text">
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Overline
            </div>
            <h2
              class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
            >
              Headline
            </h2>
            <h5
              class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
            >
              Description
            </h5>
          </div>
          <sgds-button variant="primary" tone="brand" size="md">Button Label</sgds-button>
        </div>
      </div>
    </section>
  `;
};

export const Default = {
  render: Template.bind({}),
  name: "Full Bleed Alternate Center",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
