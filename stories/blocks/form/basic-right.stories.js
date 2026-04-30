import { html } from "lit";

export default {
  title: "Blocks/Form"
};

const Template = () => html`
  <style>
    @media (min-width: 1024px) {
      form.form-right {
        grid-column: 5 / span 8;
      }
    }
  </style>
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="form-right sgds-col-4 sgds-col-sm-8 sgds-col-md-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Personal Information
            </h5>
            <div>
              <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Email address" name="email" type="email" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Phone number" name="phone" type="tel" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-textarea
                label="Additional comments"
                name="comments"
                placeholder="Enter any additional information..."
                hasFeedback="both"
              ></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5
              class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
            >
              Preferences
            </h5>
            <div>
              <sgds-radio-group
                label="Communication preference"
                name="communicationPreference"
                required
                hasFeedback="both"
              >
                <sgds-radio value="email">Email</sgds-radio>
                <sgds-radio value="sms">SMS</sgds-radio>
                <sgds-radio value="phone">Phone</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-checkbox-group label="Interests" name="interests" required hasFeedback="both">
                <sgds-checkbox value="technology">Technology</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="marketing">Marketing</sgds-checkbox>
              </sgds-checkbox-group>
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

export const BasicRight = {
  render: Template.bind({}),
  name: "Basic Right",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
