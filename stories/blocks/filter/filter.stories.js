import { html } from "lit";

const Template = () => html`
  <div class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds:w-container sgds:mx-auto sgds:py-layout-md">
      <!-- Filter sidebar -->
      <aside class="sgds:w-64 sgds:flex sgds:flex-col sgds:gap-2-xl">
        <!-- Filter header -->
        <div class="sgds:flex sgds:gap-4 sgds:items-center">
          <span
            class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
            >Filter by</span
          >
          <sgds-link><a href="#">Clear all</a></sgds-link>
        </div>

        <!-- Programme type -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Programme type
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="opening-address">Opening Address (1)</sgds-checkbox>
            <sgds-checkbox value="keynote">Keynote (4)</sgds-checkbox>
            <sgds-checkbox value="panel-discussion">Panel Discussion (6)</sgds-checkbox>
            <sgds-checkbox value="presentation">Presentation (12)</sgds-checkbox>
          </sgds-checkbox-group>
        </div>

        <!-- Sessions -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Sessions
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="morning">Morning (12)</sgds-checkbox>
            <sgds-checkbox value="afternoon">Afternoon (16)</sgds-checkbox>
          </sgds-checkbox-group>
        </div>

        <!-- Track -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Track
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="ai-cybersecurity">AI x Cybersecurity (4)</sgds-checkbox>
            <sgds-checkbox value="resilient-cloud">Resilient and Secure Cloud (6)</sgds-checkbox>
            <sgds-checkbox value="cisos-future">CISOs of the Future (8)</sgds-checkbox>
          </sgds-checkbox-group>
        </div>

        <!-- Event hall -->
        <div class="sgds:flex sgds:flex-col sgds:gap-xs">
          <div
            class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default"
          >
            Event hall
          </div>
          <sgds-checkbox-group>
            <sgds-checkbox value="hall-a">Hall A</sgds-checkbox>
            <sgds-checkbox value="hall-b">Hall B</sgds-checkbox>
            <sgds-checkbox value="hall-c">Hall C</sgds-checkbox>
          </sgds-checkbox-group>
        </div>
      </aside>
    </div>
  </div>
`;

export default {
  title: "Blocks/Filter",
  parameters: {
    tags: ["!autodocs"],
    layout: "padded"
  }
};

export const Filter = {
  render: Template.bind({}),
  name: "Filter"
};
