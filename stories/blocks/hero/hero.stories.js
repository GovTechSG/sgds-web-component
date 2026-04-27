import { html } from "lit";

const Template = () => html`
  <!-- Hero Block
       Sizing   : min-height calc(100vh - 108px)
       Color    : bg-surface-default
       Spacing  : py-layout-lg (top + bottom)
  -->
  <section class="sgds:bg-default sgds:py-layout-lg sgds:min-h-[640px]">
    <!-- Container — constrains width and centers block on page -->
    <div class="sgds-container">
      <!-- Slot
         Spacing : padding-top layout-xs only (CSS var — no compiled pt-layout-xs utility)
         Layout  : stack, left-aligned
         Gap     : gap-text-lg (spacer-5 = 1rem = 16px)
         Width   : max-w-text
    -->
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text" class="sgds:pt-layout-xs">
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
          <h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle">
            Access government services anytime, anywhere. Built for residents, designed for ease.
          </h4>
        </div>
        <!-- end typography group -->

        <!-- Button slot — size md -->
        <sgds-button variant="primary" tone="neutral" size="md">Get Started</sgds-button>
      </div>
    </div>
    <!-- end container -->
  </section>
`;

export default {
  title: "Blocks/Hero",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const Hero = {
  render: Template.bind({}),
  name: "Basic hero"
};
