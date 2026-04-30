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
              Survey
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Name" name="name" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-radio-group label="How satisfied are you?" name="satisfaction" required hasFeedback="both">
                <sgds-radio value="very-satisfied">Very satisfied</sgds-radio>
                <sgds-radio value="satisfied">Satisfied</sgds-radio>
                <sgds-radio value="neutral">Neutral</sgds-radio>
                <sgds-radio value="dissatisfied">Dissatisfied</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-radio-group label="How likely to recommend?" name="likelihood" required hasFeedback="both">
                <sgds-radio value="very-likely">Very likely</sgds-radio>
                <sgds-radio value="likely">Likely</sgds-radio>
                <sgds-radio value="unlikely">Unlikely</sgds-radio>
              </sgds-radio-group>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Submit Survey</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const FormFieldsRadio = {
  render: Template.bind({}),
  name: "Form Fields Radio",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
