import { html } from "lit";

const Template = () => html`
  <!-- Feature Block — content left 6 cols / image right 6 cols
       Background : bg-surface-default
       Spacing    : py-layout-lg, gap-layout-md
       Content    : padding-left layout-md (outer edge, image on right)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[600px]">
    <div class="sgds-container">
      <div class="sgds-grid sgds:items-center" class="sgds:gap-layout-md">
        <!-- Content — 6 cols, padding-left layout-md (image on right) -->
        <div
          class="feature-content sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
        >
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

        <!-- Image — 6 cols -->
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:self-stretch"
          old-class="feature-img sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
        >
          <img
            src="/placeholder-sgds.png"
            alt=""
            style="width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>
      </div>
    </div>
  </section>
`;

export default {
  title: "Blocks/Feature",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const FeatureImageRight66 = {
  render: Template.bind({}),
  name: "Image right 6:6"
};
