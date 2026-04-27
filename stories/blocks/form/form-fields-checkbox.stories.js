import { html } from "lit";

export default {
  title: "Blocks/Form"
};

const Template = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form
        class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-checkbox-group label="Interests" name="interests" required hasFeedback="both">
                <sgds-checkbox value="technology">Technology</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="marketing">Marketing</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-checkbox-group label="Communication Methods" name="communication" hasFeedback="both">
                <sgds-checkbox value="email">Email</sgds-checkbox>
                <sgds-checkbox value="sms">SMS</sgds-checkbox>
                <sgds-checkbox value="phone">Phone</sgds-checkbox>
                <sgds-checkbox value="push">Push Notifications</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Save Preferences</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const FormFieldsCheckbox = {
  render: Template.bind({}),
  name: "Form Fields Checkbox",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
