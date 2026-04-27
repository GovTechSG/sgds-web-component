import { html } from "lit";

const Template = () => html`
  <!-- Feature Block — content left 6 cols / component right 6 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Alignment  : items-start (top-aligned)
       Component  : replace <sgds-accordion> with any component
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[600px]">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-start" class="sgds:gap-layout-md">

        <!-- Content — 6 cols, padding-right layout-md (component on right) -->
        <div class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left">
          <!-- Typography group -->
          <div class="sgds:mb-xl">
            <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
              Overline Label
            </div>
            <h2 class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default">
              Feature Heading Goes Here
            </h2>
            <h5 class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-heading-subtle">
              Supporting subtitle text that provides context and detail for the feature being described.
            </h5>
          </div>
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>

        <!-- Component — 6 cols (replace with any component) -->
        <div class="feature-component sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">
          <sgds-accordion>
            <sgds-accordion-item open>
              <div slot="header">Why choose us</div>
              <div slot="content">We deliver fast, reliable, and accessible digital services built to government standards.</div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <div slot="header">How it works</div>
              <div slot="content">Sign up, verify your identity, and access all your services from a single dashboard.</div>
            </sgds-accordion-item>
            <sgds-accordion-item>
              <div slot="header">Who can use this</div>
              <div slot="content">Any Singapore resident or business with a valid Singpass account can get started.</div>
            </sgds-accordion-item>
          </sgds-accordion>
        </div>

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

export const FeatureComponentRight66 = {
  render: Template.bind({}),
  name: "Component right 6:6"
};
