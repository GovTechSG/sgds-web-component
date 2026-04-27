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
              Personal Details
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
              <sgds-textarea label="Bio" name="bio" placeholder="Tell us about yourself..."></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Contact Preferences
            </h5>
            <div>
              <sgds-radio-group label="Preferred method" name="preference" required hasFeedback="both">
                <sgds-radio value="email">Email</sgds-radio>
                <sgds-radio value="phone">Phone</sgds-radio>
                <sgds-radio value="sms">SMS</sgds-radio>
              </sgds-radio-group>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="Preferred date" name="prefDate" hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Save</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const SectionsTwo = {
  render: Template.bind({}),
  name: "Sections Two",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
