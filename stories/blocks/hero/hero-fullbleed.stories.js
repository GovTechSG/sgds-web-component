import { html } from "lit";

const Template = () => html`
  <!-- Hero Block (full-bleed image right)
       Sizing   : min-height 640px
       Color    : bg-surface-default
       Layout   : content left in grid, image right full-bleed (absolute)
  -->
  <section
    class="sgds:bg-default sgds:flex sgds:items-center sgds:min-h-[640px]"
    style="position: relative; overflow: hidden;"
  >
    <!-- Right: image — absolute, covers right half, full height -->
    <div style="position: absolute; right: 0; top: 0; bottom: 0; width: 50%;">
      <img
        src="/placeholder-sgds.png"
        alt="Government digital services"
        style="width: 100%; height: 100%; object-fit: cover; display: block;"
      />
    </div>

    <!-- Container — keeps content within grid at all zoom levels -->
    <div class="sgds-container" style="position: relative; z-index: 1;">
      <div class="sgds-grid">
        <div
          class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6 sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:py-layout-lg"
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
  parameters: { layout: "padded"
  }
};

export const HeroFullbleed = {
  render: Template.bind({}),
  name: "Hero fullbleed"
};
