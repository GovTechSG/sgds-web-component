import { html } from "lit";

const Template = () => html`
  <!-- Feature Block — content top / 3 tinted cards below
       Background : bg-surface-raised
       Spacing    : py-layout-lg, gap-layout-md
       Cards      : tinted, hideBorder, stretchedLink
  -->
  <section class="sgds:bg-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col" class="sgds:gap-layout-md">
        <!-- Content -->
        <div
          class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left"
          style="padding-bottom: var(--sgds-spacing-layout-md);"
        >
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

        <!-- 3 tinted cards in a row (replace with any component) -->
        <div class="sgds-grid" class="sgds:gap-layout-md">
          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <sgds-card tinted hideBorder stretchedLink>
              <span slot="subtitle">FEATURE</span>
              <span slot="title">Card Title One</span>
              <span slot="description"
                >Supporting description text that explains what this feature offers to the user.</span
              >
              <sgds-link slot="footer">
                <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
              </sgds-link>
            </sgds-card>
          </div>

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <sgds-card tinted hideBorder stretchedLink>
              <span slot="subtitle">FEATURE</span>
              <span slot="title">Card Title Two</span>
              <span slot="description"
                >Supporting description text that explains what this feature offers to the user.</span
              >
              <sgds-link slot="footer">
                <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
              </sgds-link>
            </sgds-card>
          </div>

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
            <sgds-card tinted hideBorder stretchedLink>
              <span slot="subtitle">FEATURE</span>
              <span slot="title">Card Title Three</span>
              <span slot="description"
                >Supporting description text that explains what this feature offers to the user.</span
              >
              <sgds-link slot="footer">
                <a href="#">Learn more <sgds-icon name="arrow-right"></sgds-icon></a>
              </sgds-link>
            </sgds-card>
          </div>
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

export const FeatureCardsBelow = {
  render: Template.bind({}),
  name: "Cards below"
};
