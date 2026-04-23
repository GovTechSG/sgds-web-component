import { html } from "lit";

export default {
  title: "Blocks/Hero background image light"
};

const Template = () => {
  return html`
    <section
      class="sgds:flex sgds:items-center sgds:min-h-[calc(100vh-108px)] sgds:relative sgds:bg-cover sgds:bg-center"
      style="background-image: url('../../playground/blocks/placeholder-sgds.png');"
    >
      <div class="sgds:bg-translucent-fixed-light sgds:absolute sgds:inset-0"></div>

      <div
        class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:p-layout-lg sgds:w-1/2 sgds:box-border sgds:relative sgds:z-10"
      >
        <div class="sgds:mb-xl">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-dark sgds:mb-xs"
          >
            Singapore Government Digital Services
          </div>

          <h1 class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-fixed-dark">
            One Platform. Simpler Living.
          </h1>

          <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-fixed-dark">
            Access government services anytime, anywhere. Built for residents, designed for ease.
          </h4>
        </div>

        <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
      </div>
    </section>
  `;
};

export const Basic = {
  render: Template.bind({}),
  name: "Hero background image light",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
