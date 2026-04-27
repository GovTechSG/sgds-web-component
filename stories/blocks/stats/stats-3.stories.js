import { html } from "lit";

const Template = () => html`
  <style>
    @media (width >= 768px) {
      .stats-row { flex-wrap: nowrap !important; }
      .stats-row > * { width: auto; flex: 1; }
    }
  </style>

  <!-- Stats Block — section header + 3 stats
       Background : bg-surface-default
       Spacing    : py-layout-md, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-md">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <!-- Section header -->
        <div class="sgds:max-w-text">
          <div
            class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
          >
            By the Numbers
          </div>
          <h2
            class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
          >
            Impact at a Glance
          </h2>
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0">
            Key metrics measured over the past 12 months across all participating agencies.
          </p>
        </div>

        <!-- 3 stats -->
        <div class="stats-row sgds:flex sgds:flex-wrap sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              2.4M
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Active Users
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Residents actively using the platform each month to access government services.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              400+
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Government Services
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Integrated services from agencies across the public sector available in one place.
            </p>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:w-full sgds:pr-layout-xs">
            <div
              class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter sgds:text-display-default"
            >
              99.9%
            </div>
            <h5
              class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
            >
              Platform Uptime
            </h5>
            <p
              class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-body-subtle sgds:mb-0"
            >
              Consistently high availability ensuring residents can access services anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

export default {
  title: "Blocks/Stats",
  tags: ["!autodocs"],
  parameters: { layout: "padded"
  }
};

export const Stats3 = {
  render: Template.bind({}),
  name: "3 statistics"
};
