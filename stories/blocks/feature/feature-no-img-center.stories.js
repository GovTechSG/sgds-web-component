import { html } from "lit";

const Template = () => html`
  <!-- Feature Block — no image, center-aligned
       Background : bg-surface-default
       Spacing    : py-layout-lg
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[600px]">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:mx-auto sgds:max-w-text">
        <!-- Typography group -->
        <div class="sgds:mb-xl">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            Overline Label
          </div>
          <h2
            class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Feature Heading Goes Here
          </h2>
          <h5
            class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle"
          >
            Supporting subtitle text that provides context and detail for the feature being described.
          </h5>
        </div>
        <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
      </div>
    </div>
  </section>
`;

export default {
  title: "Blocks/Feature",
  parameters: {
    tags: ["!autodocs"],
    layout: "padded"
  }
};

export const FeatureNoImageCenter = {
  render: Template.bind({}),
  name: "No image center"
};
