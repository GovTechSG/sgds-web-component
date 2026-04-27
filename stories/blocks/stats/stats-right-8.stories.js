import { html } from "lit";

const Template = () => html`
  <!-- Stats Block — heading left 4 cols + 4 stats right 8 cols (flex row)
       Background : bg-surface-default
       Spacing    : py-layout-md
       Split      : lg:4/8
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds-grid" style="gap: var(--sgds-gap-layout-md); align-items: start;">

        <!-- Heading — left 4 cols -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4 stats-heading">
          <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
            By the Numbers
          </div>
          <h2 class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
            Impact at a Glance
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Key metrics measured over the past 12 months across all participating agencies.
          </p>
        </div>

        <!-- 4 stats — right 8 cols in flex row -->
        <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-8">
          <div class="sgds:grid sgds-grid" style="grid-template-columns: repeat(2, 1fr); gap: var(--sgds-gap-layout-md);">

            <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
              <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
                2.4M
              </div>
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
                Active Users
              </h5>
              <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
                Residents actively using the platform to access government services each month.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
              <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
                400+
              </div>
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
                Government Services
              </h5>
              <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
                Integrated services from agencies across the public sector.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
              <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
                99.9%
              </div>
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
                Platform Uptime
              </h5>
              <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
                Consistently high availability so residents can access services anytime.
              </p>
            </div>

            <div class="sgds:flex sgds:flex-col sgds:items-start" style="padding-right: var(--sgds-spacing-layout-xs);">
              <div class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default">
                16
              </div>
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
                Partner Agencies
              </h5>
              <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
                Public agencies contributing services and data to the shared platform.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
`;

export default {
  title: "Blocks/Stats",
  parameters: {
    tags: ["!autodocs"],
    layout: "padded"
  }
};

export const StatsRight8 = {
  render: Template.bind({}),
  name: "StatsRight8"
};
