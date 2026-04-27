import { html } from "lit";

const Template = () => html`
  <div class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds:w-container sgds:mx-auto sgds:py-layout-md">
      <!-- Basic details card -->
      <div
        class="sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-lg sgds:p-component-xs sgds:flex sgds:flex-col sgds:gap-5"
      >
        <!-- Card title -->
        <h5
          class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
        >
          Basic details
        </h5>

        <!-- Key-value pairs -->
        <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <div
              class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              Application ID
            </div>
            <div
              class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              Fantastic-Grizzly-Bear-0f4bed5f-ea64-41a6-9b16-49d7eb84b81c
            </div>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <div
              class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              Organisation
            </div>
            <div
              class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              [GVT] APEX
            </div>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <div
              class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              Description
            </div>
            <div
              class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              This application provides secure access to government services and APIs, enabling seamless integration
              with external systems. It supports multiple authentication methods and offers comprehensive monitoring and
              logging capabilities for all API requests.
            </div>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <div
              class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default"
            >
              Email
            </div>
            <sgds-link><a href="mailto:petrine@tech.gov.sg">petrine@tech.gov.sg</a></sgds-link>
          </div>
        </div>

        <!-- Action -->
        <sgds-button variant="primary">
          <sgds-icon name="pencil" slot="leftIcon"></sgds-icon>
          Edit details
        </sgds-button>
      </div>
    </div>
  </div>
`;

export default {
  title: "Blocks/Details",
  tags: ["!autodocs"],
  parameters: { layout: "padded" }
};

export const ApplicationDetails = {
  render: Template.bind({}),
  name: "Application details"
};
