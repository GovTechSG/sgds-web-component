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
              Product Selection
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select
                  placeholder="Select an option"
                  label="Category"
                  name="category"
                  placeholder="Select a category"
                  required
                  hasFeedback="both"
                >
                  <sgds-select-option value="electronics">Electronics</sgds-select-option>
                  <sgds-select-option value="furniture">Furniture</sgds-select-option>
                  <sgds-select-option value="clothing">Clothing</sgds-select-option>
                </sgds-select>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select
                  placeholder="Select an option"
                  label="Brand"
                  name="brand"
                  placeholder="Select a brand"
                  required
                  hasFeedback="both"
                >
                  <sgds-select-option value="brand-a">Brand A</sgds-select-option>
                  <sgds-select-option value="brand-b">Brand B</sgds-select-option>
                  <sgds-select-option value="brand-c">Brand C</sgds-select-option>
                </sgds-select>
              </div>
            </div>
            <div>
              <sgds-combo-box
                placeholder="Search or select..."
                label="Supplier"
                name="supplier"
                placeholder="Search suppliers..."
                hasFeedback="both"
              >
                <sgds-combo-box-option value="supplier-1">Supplier 1</sgds-combo-box-option>
                <sgds-combo-box-option value="supplier-2">Supplier 2</sgds-combo-box-option>
                <sgds-combo-box-option value="supplier-3">Supplier 3</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
            <div>
              <sgds-combo-box
                placeholder="Search or select..."
                label="Features"
                name="features"
                multiSelect="true"
                placeholder="Select features..."
                hasFeedback="both"
              >
                <sgds-combo-box-option value="feature-1">Feature 1</sgds-combo-box-option>
                <sgds-combo-box-option value="feature-2">Feature 2</sgds-combo-box-option>
                <sgds-combo-box-option value="feature-3">Feature 3</sgds-combo-box-option>
                <sgds-combo-box-option value="feature-4">Feature 4</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Search</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const FormFieldsSelects = {
  render: Template.bind({}),
  name: "Form Fields Selects",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
