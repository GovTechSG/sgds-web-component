import { html } from "lit";

export default {
  title: "Blocks/Form"
};

const Template = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Contact Information
            </h5>
            <div>
              <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const BasicLeft = {
  render: Template.bind({}),
  name: "Basic Left",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
