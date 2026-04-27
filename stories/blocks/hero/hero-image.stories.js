import { html } from "lit";

const Template = () => html`
  <!-- Hero Block (image right)
       Sizing   : min-height calc(100vh - 108px)
       Color    : bg-surface-default
       Spacing  : py-layout-lg (top + bottom)
       Layout   : 50/50 split, gap-layout-md
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[640px]">
    <!-- Container — constrains width and centers block on page -->
    <div class="sgds-container">
      <!-- Two-column row: left content + right image, gap-layout-md -->
      <div class="sgds:flex sgds:items-center sgds:gap-layout-md">
        <!-- Left: content slot (50%), padding-right layout-md -->
        <div
          class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text"
          style="width: 50%; padding-top: var(--sgds-spacing-layout-xs); padding-right: var(--sgds-spacing-layout-md);"
        >
          <!-- Typography group — mb-xl separates group from button -->
          <div class="sgds:mb-xl">
            <!-- Overline — overline-md semibold, label color default, mb-xs -->
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs"
            >
              Singapore Government Digital Services
            </div>

            <!-- Headline — display-lg bold, display color default -->
            <h1
              class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-display-default"
            >
              One Platform. Simpler Living.
            </h1>

            <!-- Description — heading-sm light, h4 -->
            <h4
              class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle"
            >
              Access government services anytime, anywhere. Built for residents, designed for ease.
            </h4>
          </div>
          <!-- end typography group -->

          <!-- Button slot — size md -->
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
        <!-- end left content -->

        <!-- Right: image (50%), 1:1 ratio -->
        <div style="width: 50%;">
          <img
            src="/placeholder-sgds.png"
            alt="Government digital services"
            style="width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; border-radius: var(--sgds-border-radius-xl);"
          />
        </div>
        <!-- end right image -->
      </div>
      <!-- end two-column row -->
    </div>
    <!-- end container -->
  </section>
`;

export default {
  title: "Blocks/Hero",
  parameters: {
    tags: ["!autodocs"],
    layout: "padded"
  }
};

export const HeroImage = {
  render: Template.bind({}),
  name: "Hero image"
};
