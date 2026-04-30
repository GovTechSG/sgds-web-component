import { html } from "lit";

export default {
  title: "Blocks/Call To Action/Contained Primary"
};

const Template = () => {
  return html`
    <section class="sgds:py-layout-lg">
      <div class="sgds-container">
        <div class="sgds:bg-primary-default sgds:rounded-2-xl sgds:p-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:max-w-text">
            <div class="sgds:mb-xl">
              <div
                class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-fixed-light sgds:mb-xs"
              >
                Overline
              </div>
              <h2
                class="sgds:text-display-sm sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-fixed-light"
              >
                Headline
              </h2>
              <h5
                class="sgds:text-subtitle-sm sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-fixed-light"
              >
                Description
              </h5>
            </div>
            <sgds-button variant="primary" tone="fixed-light" size="md">Button Label</sgds-button>
          </div>
        </div>
      </div>
    </section>
  `;
};

export const Default = {
  render: Template.bind({}),
  name: "Contained Primary",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
