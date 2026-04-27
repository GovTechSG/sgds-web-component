import { html } from "lit";

const Template = () => html`
  <!-- Hero Block (background image — light overlay)
       Sizing      : min-height calc(100vh - 108px)
       Background  : full-cover image with light translucent overlay
       Text        : fixed-dark (always dark regardless of theme)
       Layout      : left-aligned content, no container, no outer padding
  -->
  <section
    class="sgds:flex sgds:items-center sgds:min-h-[640px]"
    style="
      position: relative;
      background-image: url('placeholder-sgds.png');
      background-size: cover;
      background-position: center;
    "
  >
    <!-- Light overlay -->
    <div class="sgds:bg-translucent-fixed-light" style="position: absolute; inset: 0;"></div>

    <!-- Container — keeps content within grid at all zoom levels -->
    <div class="sgds-container" style="position: relative; z-index: 1;">
      <div class="sgds-grid">
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:py-layout-lg"
        >
          <!-- Typography group — mb-xl separates group from button -->
          <div class="sgds:mb-xl">
            <!-- Overline — overline-md semibold, fixed-dark -->
            <div
              class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-dark sgds:mb-xs"
            >
              Singapore Government Digital Services
            </div>

            <!-- Headline — display-lg bold, fixed-dark -->
            <h1
              class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:text-fixed-dark"
            >
              One Platform. Simpler Living.
            </h1>

            <!-- Description — heading-sm light, h4, fixed-dark -->
            <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-fixed-dark">
              Access government services anytime, anywhere. Built for residents, designed for ease.
            </h4>
          </div>
          <!-- end typography group -->

          <!-- Button slot — size md -->
          <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
        </div>
        <!-- end content col -->
      </div>
      <!-- end grid -->
    </div>
    <!-- end container -->
  </section>
`;

export default {
  title: "Blocks/Hero",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const HeroBgImageLight = {
  render: Template.bind({}),
  name: "Hero background image light"
};
