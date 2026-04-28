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
              Event Booking
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
                <sgds-datepicker label="Start date" name="startDate" required hasFeedback="both"></sgds-datepicker>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-datepicker label="End date" name="endDate" required hasFeedback="both"></sgds-datepicker>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-quantity-toggle
                  label="Number of guests"
                  name="guests"
                  value="1"
                  min="1"
                  max="20"
                  required
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-quantity-toggle
                  label="Quantity ordered"
                  name="quantity"
                  value="1"
                  min="1"
                  max="100"
                  required
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Book Event</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const FormFieldsDatesQuantities = {
  render: Template.bind({}),
  name: "Form Fields Dates Quantities",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
