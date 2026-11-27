import { html } from "lit";

export default {
  title: "Form/Form Sizes",
  tags: ["!autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "md"],
      description: "The size of all form components"
    }
  },
  args: {
    size: "lg"
  },
  parameters: {
    layout: "fullscreen"
  }
};

const Template = ({ size }) => html`
  <section class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds-container sgds:py-layout-lg">
      <form method="post">
        <!-- Section 1: Text inputs -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-md">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
                Basic Info
              </h3>
              <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                Text inputs, selects, and date fields.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Name"
                  name="name"
                  type="text"
                  required
                  hasFeedback="both"
                  size=${size}
                ></sgds-input>
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Email"
                  name="email"
                  type="email"
                  required
                  hasFeedback="both"
                  size=${size}
                ></sgds-input>
              </div>
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Password"
                  name="password"
                  type="password"
                  required
                  hasFeedback="both"
                  size=${size}
                ></sgds-input>
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="With prefix"
                  name="prefixed"
                  prefix="https://"
                  size=${size}
                ></sgds-input>
              </div>
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="With suffix"
                  name="suffixed"
                  suffix=".com"
                  size=${size}
                ></sgds-input>
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Leading icon"
                  name="leading-icon"
                  size=${size}
                >
                  <sgds-icon slot="icon" name="telephone" size=${size === "md" ? "sm" : "md"}></sgds-icon>
                </sgds-input>
              </div>
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Trailing icon"
                  name="trailing-icon"
                  size=${size}
                >
                  <sgds-icon slot="trailing-icon" name="telephone" size=${size === "md" ? "sm" : "md"}></sgds-icon>
                </sgds-input>
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="With action"
                  name="action-input"
                  size=${size}
                >
                  <sgds-icon-button
                    slot="action"
                    name="trash"
                    size=${size === "md" ? "sm" : "md"}
                    ariaLabel="Clear"
                  ></sgds-icon-button>
                </sgds-input>
              </div>
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-select
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Country"
                  name="country"
                  placeholder="Select country"
                  required
                  hasFeedback
                  size=${size}
                >
                  <sgds-select-option value="sg">Singapore</sgds-select-option>
                  <sgds-select-option value="my">Malaysia</sgds-select-option>
                </sgds-select>
                <sgds-datepicker
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Date of birth"
                  name="dob"
                  required
                  hasFeedback
                  size=${size}
                ></sgds-datepicker>
              </div>
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-quantity-toggle
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Tickets"
                  name="tickets"
                  value="1"
                  min="3"
                  max="10"
                  required
                  hasFeedback="both"
                  size=${size}
                ></sgds-quantity-toggle>
                <sgds-combo-box
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  placeholder="Search or select..."
                  label="Event"
                  name="event"
                  required
                  hasFeedback="both"
                  size=${size}
                >
                  <sgds-combo-box-option value="event-1">Event 1</sgds-combo-box-option>
                  <sgds-combo-box-option value="event-2">Event 2</sgds-combo-box-option>
                </sgds-combo-box>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Choices & long text -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-md">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">
                Preferences
              </h3>
              <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                Textarea, radio, checkbox, multi-select, and file upload.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
              <sgds-textarea
                label="Special requests"
                name="requests"
                placeholder="Any special requests?..."
                required
                hasFeedback
                size=${size}
              ></sgds-textarea>
              <sgds-radio-group label="Delivery method" name="delivery" required hasFeedback size=${size}>
                <sgds-radio value="pickup">Pickup</sgds-radio>
                <sgds-radio value="delivery">Delivery</sgds-radio>
                <sgds-radio value="courier">Courier</sgds-radio>
              </sgds-radio-group>
              <sgds-checkbox-group label="Services" name="services" required hasFeedback size=${size}>
                <sgds-checkbox value="service-1">Service 1</sgds-checkbox>
                <sgds-checkbox value="service-2">Service 2</sgds-checkbox>
                <sgds-checkbox value="service-3">Service 3</sgds-checkbox>
              </sgds-checkbox-group>
              <sgds-combo-box
                placeholder="Select interests..."
                label="Interests"
                name="interests"
                multiSelect
                required
                hasFeedback
                size=${size}
              >
                <sgds-combo-box-option value="tech">Technology</sgds-combo-box-option>
                <sgds-combo-box-option value="design">Design</sgds-combo-box-option>
                <sgds-combo-box-option value="business">Business</sgds-combo-box-option>
              </sgds-combo-box>
              <sgds-file-upload label="Attachment" name="attachment" required hasFeedback size=${size}
                >Choose files</sgds-file-upload
              >
              <sgds-file-upload
                label="Drag and drop attachment"
                name="attachment-dnd"
                variant="drag-and-drop"
                multiple
                required
                hasFeedback
                size=${size}
                >Choose files</sgds-file-upload
              >
              <sgds-checkbox size=${size} name="terms" value="agree" required hasFeedback="both"
                >I agree to the terms and conditions</sgds-checkbox
              >
            </div>
          </div>
        </div>

        <!-- Form footer -->
        <div
          class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-end sgds:gap-component-sm sgds:mb-layout-lg"
        >
          <sgds-button variant="outline" type="button">Cancel</sgds-button>
          <sgds-button variant="primary" type="submit">Save changes</sgds-button>
        </div>
      </form>
    </div>
  </section>
`;

export const FormSizes = {
  render: Template.bind({}),
  name: "Form Sizes",
  args: { size: "lg" }
};
