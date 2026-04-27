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
              Personal Information
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="Date of birth" name="dob" required hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Address
            </h5>
            <div>
              <sgds-textarea
                label="Full address"
                name="address"
                placeholder="Street, City, Country..."
                required
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Postal code" name="postalCode" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select
                  placeholder="Select an option"
                  label="Country"
                  name="country"
                  placeholder="Select country"
                  required
                  hasFeedback="both"
                >
                  <sgds-select-option value="sg">Singapore</sgds-select-option>
                  <sgds-select-option value="my">Malaysia</sgds-select-option>
                </sgds-select>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div>
              <sgds-checkbox-group label="Interests" name="interests" hasFeedback="both">
                <sgds-checkbox value="tech">Technology</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-radio-group label="Notification preference" name="notificationPref" required hasFeedback="both">
                <sgds-radio value="email">Email</sgds-radio>
                <sgds-radio value="push">Push</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-select
                placeholder="Select an option"
                label="Communication frequency"
                name="frequency"
                placeholder="Select frequency"
                hasFeedback="both"
              >
                <sgds-select-option value="daily">Daily</sgds-select-option>
                <sgds-select-option value="weekly">Weekly</sgds-select-option>
                <sgds-select-option value="monthly">Monthly</sgds-select-option>
              </sgds-select>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Complete Registration</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const SectionsThree = {
  render: Template.bind({}),
  name: "Sections Three",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
