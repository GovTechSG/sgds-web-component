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
              Contact Us
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Your name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Your email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-textarea
                label="Message"
                name="message"
                placeholder="Please enter your message..."
                required
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div>
              <sgds-textarea
                label="Additional details"
                name="details"
                placeholder="Any additional information..."
              ></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Clear</sgds-button>
            <sgds-button type="submit">Send Message</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const FormFieldsTextarea = {
  render: Template.bind({}),
  name: "Form Fields Textarea",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
