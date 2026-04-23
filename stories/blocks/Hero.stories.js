import { html } from "lit";

export default {
  title: "Blocks/Hero"
};

const Template = () => {
  return html`
    <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[calc(100vh-108px)]">
      <div class="sgds-container">
        <div
          class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text"
          style="padding-top: var(--sgds-spacing-layout-xs);"
        >
          <div class="sgds:mb-xl">
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Singapore Government Digital Services
            </div>

            <h1
              class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default"
            >
              One Platform. Simpler Living.
            </h1>

            <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-default">
              Access government services anytime, anywhere. Built for residents, designed for ease.
            </h4>
          </div>

          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
      </div>
    </section>
  `;
};

export const Basic = {
  render: Template.bind({}),
  name: "Hero",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
