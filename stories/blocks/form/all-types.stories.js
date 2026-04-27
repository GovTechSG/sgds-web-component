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
              Basic Info
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
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
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="Date of birth" name="dob" required hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-quantity-toggle
                  label="Tickets"
                  name="tickets"
                  value="1"
                  min="1"
                  max="10"
                  required
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-combo-box
                  placeholder="Search or select..."
                  label="Event"
                  name="event"
                  required
                  hasFeedback="both"
                >
                  <sgds-combo-box-option value="event-1">Event 1</sgds-combo-box-option>
                  <sgds-combo-box-option value="event-2">Event 2</sgds-combo-box-option>
                </sgds-combo-box>
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
              <sgds-textarea
                label="Special requests"
                name="requests"
                placeholder="Any special requests?..."
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div>
              <sgds-radio-group label="Delivery method" name="delivery" required hasFeedback="both">
                <sgds-radio value="pickup">Pickup</sgds-radio>
                <sgds-radio value="delivery">Delivery</sgds-radio>
                <sgds-radio value="courier">Courier</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-checkbox-group label="Services" name="services" required hasFeedback="both">
                <sgds-checkbox value="service-1">Service 1</sgds-checkbox>
                <sgds-checkbox value="service-2">Service 2</sgds-checkbox>
                <sgds-checkbox value="service-3">Service 3</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-combo-box
                placeholder="Search or select..."
                label="Interests"
                name="interests"
                multiSelect="true"
                placeholder="Select interests..."
                hasFeedback="both"
              >
                <sgds-combo-box-option value="tech">Technology</sgds-combo-box-option>
                <sgds-combo-box-option value="design">Design</sgds-combo-box-option>
                <sgds-combo-box-option value="business">Business</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
            <div>
              <sgds-file-upload label="Attachment" name="attachment" hasFeedback="both">Choose files</sgds-file-upload>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Submit</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const AllTypes = {
  render: Template.bind({}),
  name: "All Types",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
