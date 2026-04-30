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
              All Full-Width
            </h5>
            <div>
              <sgds-textarea
                label="Description"
                name="description"
                placeholder="Enter description..."
                required
                hasFeedback="both"
              ></sgds-textarea>
            </div>
            <div>
              <sgds-radio-group label="Category" name="category" required hasFeedback="both">
                <sgds-radio value="category-a">Category A</sgds-radio>
                <sgds-radio value="category-b">Category B</sgds-radio>
                <sgds-radio value="category-c">Category C</sgds-radio>
              </sgds-radio-group>
            </div>
            <div>
              <sgds-checkbox-group label="Options" name="options" required hasFeedback="both">
                <sgds-checkbox value="option-1">Option 1</sgds-checkbox>
                <sgds-checkbox value="option-2">Option 2</sgds-checkbox>
                <sgds-checkbox value="option-3">Option 3</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-textarea
                label="Additional comments"
                name="comments"
                placeholder="Any additional comments..."
              ></sgds-textarea>
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

export const FullwidthOnly = {
  render: Template.bind({}),
  name: "Full-width only",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
