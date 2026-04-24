import { html } from "lit";

export default {
  title: "Blocks/Form"
};

const BasicLeftTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Contact Information
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
                <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
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

const BasicCenterTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
                <sgds-input label="Email address" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone number" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-textarea label="Additional comments" name="comments" placeholder="Enter any additional information..." hasFeedback="both"></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Preferences
            </h5>
            <div>
              <sgds-radio-group label="Communication preference" name="communicationPreference" required hasFeedback="both">
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

const BasicRightTemplate = () => html`
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
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
                <sgds-input label="Email address" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone number" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div>
              <sgds-textarea label="Additional comments" name="comments" placeholder="Enter any additional information..." hasFeedback="both"></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Preferences
            </h5>
            <div>
              <sgds-radio-group label="Communication preference" name="communicationPreference" required hasFeedback="both">
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

const FullwidthOnlyTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              All Full-Width
            </h5>
            <div>
              <sgds-textarea label="Description" name="description" placeholder="Enter description..." required hasFeedback="both"></sgds-textarea>
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
              <sgds-textarea label="Additional comments" name="comments" placeholder="Any additional comments..."></sgds-textarea>
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

const PairedOnlyTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              All Paired Fields
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
                <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Username" name="username" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Password" name="password" type="password" required hasFeedback="both"></sgds-input>
              </div>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Company" name="company" type="text" hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Position" name="position" type="text" hasFeedback="both"></sgds-input>
              </div>
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

export const BasicLeft = {
  render: BasicLeftTemplate.bind({}),
  name: "Basic Left",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const BasicCenter = {
  render: BasicCenterTemplate.bind({}),
  name: "Basic Center",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const BasicRight = {
  render: BasicRightTemplate.bind({}),
  name: "Basic Right",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FullwidthOnly = {
  render: FullwidthOnlyTemplate.bind({}),
  name: "Fullwidth Only",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const PairedOnly = {
  render: PairedOnlyTemplate.bind({}),
  name: "Paired Only",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

const AllTypesTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
                <sgds-select placeholder="Select an option" label="Country" name="country" placeholder="Select country" required hasFeedback="both">
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
                <sgds-quantity-toggle label="Tickets" name="tickets" value="1" min="1" max="10" required hasFeedback="both"></sgds-quantity-toggle>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-combo-box placeholder="Search or select..." label="Event" name="event"  required hasFeedback="both">
                  <sgds-combo-box-option value="event-1">Event 1</sgds-combo-box-option>
                  <sgds-combo-box-option value="event-2">Event 2</sgds-combo-box-option>
                </sgds-combo-box>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Preferences
            </h5>
            <div>
              <sgds-textarea label="Special requests" name="requests" placeholder="Any special requests?..." hasFeedback="both"></sgds-textarea>
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
              <sgds-combo-box placeholder="Search or select..." label="Interests" name="interests" multiSelect="true" placeholder="Select interests..." hasFeedback="both">
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

const SectionsSingleTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Quick Form
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
              <sgds-textarea label="Message" name="message" placeholder="Enter your message..." required hasFeedback="both"></sgds-textarea>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Send</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

const SectionsTwoTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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

const SectionsThreeTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Address
            </h5>
            <div>
              <sgds-textarea label="Full address" name="address" placeholder="Street, City, Country..." required hasFeedback="both"></sgds-textarea>
            </div>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Postal code" name="postalCode" type="text" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select placeholder="Select an option" label="Country" name="country" placeholder="Select country" required hasFeedback="both">
                  <sgds-select-option value="sg">Singapore</sgds-select-option>
                  <sgds-select-option value="my">Malaysia</sgds-select-option>
                </sgds-select>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
              <sgds-select placeholder="Select an option" label="Communication frequency" name="frequency" placeholder="Select frequency" hasFeedback="both">
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

export const AllTypes = {
  render: AllTypesTemplate.bind({}),
  name: "All Types",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const SectionsSingle = {
  render: SectionsSingleTemplate.bind({}),
  name: "Sections Single",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const SectionsTwo = {
  render: SectionsTwoTemplate.bind({}),
  name: "Sections Two",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const SectionsThree = {
  render: SectionsThreeTemplate.bind({}),
  name: "Sections Three",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

const FormFieldsRadioTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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

const FormFieldsCheckboxTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Preferences
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
              <sgds-checkbox-group label="Interests" name="interests" required hasFeedback="both">
                <sgds-checkbox value="technology">Technology</sgds-checkbox>
                <sgds-checkbox value="business">Business</sgds-checkbox>
                <sgds-checkbox value="design">Design</sgds-checkbox>
                <sgds-checkbox value="marketing">Marketing</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
            <div>
              <sgds-checkbox-group label="Communication Methods" name="communication" hasFeedback="both">
                <sgds-checkbox value="email">Email</sgds-checkbox>
                <sgds-checkbox value="sms">SMS</sgds-checkbox>
                <sgds-checkbox value="phone">Phone</sgds-checkbox>
                <sgds-checkbox value="push">Push Notifications</sgds-checkbox>
              </sgds-checkbox-group>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Save Preferences</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

const FormFieldsTextareaTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
              <sgds-textarea label="Message" name="message" placeholder="Please enter your message..." required hasFeedback="both"></sgds-textarea>
            </div>
            <div>
              <sgds-textarea label="Additional details" name="details" placeholder="Any additional information..."></sgds-textarea>
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

const FormFieldsSelectsTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Product Selection
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select placeholder="Select an option" label="Category" name="category" placeholder="Select a category" required hasFeedback="both">
                  <sgds-select-option value="electronics">Electronics</sgds-select-option>
                  <sgds-select-option value="furniture">Furniture</sgds-select-option>
                  <sgds-select-option value="clothing">Clothing</sgds-select-option>
                </sgds-select>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-select placeholder="Select an option" label="Brand" name="brand" placeholder="Select a brand" required hasFeedback="both">
                  <sgds-select-option value="brand-a">Brand A</sgds-select-option>
                  <sgds-select-option value="brand-b">Brand B</sgds-select-option>
                  <sgds-select-option value="brand-c">Brand C</sgds-select-option>
                </sgds-select>
              </div>
            </div>
            <div>
              <sgds-combo-box placeholder="Search or select..." label="Supplier" name="supplier" placeholder="Search suppliers..." hasFeedback="both">
                <sgds-combo-box-option value="supplier-1">Supplier 1</sgds-combo-box-option>
                <sgds-combo-box-option value="supplier-2">Supplier 2</sgds-combo-box-option>
                <sgds-combo-box-option value="supplier-3">Supplier 3</sgds-combo-box-option>
              </sgds-combo-box>
            </div>
            <div>
              <sgds-combo-box placeholder="Search or select..." label="Features" name="features" multiSelect="true" placeholder="Select features..." hasFeedback="both">
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

const FormFieldsDatesQuantitiesTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
                <sgds-quantity-toggle label="Number of guests" name="guests" value="1" min="1" max="20" required hasFeedback="both"></sgds-quantity-toggle>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-quantity-toggle label="Quantity ordered" name="quantity" value="1" min="1" max="100" required hasFeedback="both"></sgds-quantity-toggle>
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

const FormFieldsFileUploadTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Document Submission
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
              <sgds-file-upload label="Upload ID" name="idDocument" required hasFeedback="both">Choose files</sgds-file-upload>
            </div>
            <div>
              <sgds-file-upload label="Upload Proof of Address" name="addressProof" required hasFeedback="both">Choose files</sgds-file-upload>
            </div>
            <div>
              <sgds-file-upload label="Additional Documents" name="additionalDocs" hasFeedback="both">Choose files</sgds-file-upload>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Reset</sgds-button>
            <sgds-button type="submit">Upload Documents</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

const FormWithSidebarTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <nav class="sgds-col-3 sgds-col-sm-3 sgds-col-md-3 sgds-col-lg-3 sgds-col-xl-3 sgds-col-2-xl-3">
        <sgds-sidenav>
          <sgds-sidenav-item active>
            <span slot="title">Form Sections</span>
            <sgds-sidenav-link active><a href="#personal">Personal Information</a></sgds-sidenav-link>
            <sgds-sidenav-link><a href="#contact">Contact Details</a></sgds-sidenav-link>
          </sgds-sidenav-item>
          <sgds-sidenav-item>
            <a href="#actions">Form Actions</a>
          </sgds-sidenav-item>
        </sgds-sidenav>
      </nav>

      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
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
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Contact Details
            </h5>
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
              </div>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Save</sgds-button>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

const FormWithSidebarTocTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <nav class="sgds-col-3 sgds-col-sm-3 sgds-col-md-3 sgds-col-lg-3 sgds-col-xl-3 sgds-col-2-xl-3">
        <sgds-sidenav>
          <sgds-sidenav-item active>
            <span slot="title">Form Sections</span>
            <sgds-sidenav-link active><a href="#personal">Personal Information</a></sgds-sidenav-link>
            <sgds-sidenav-link><a href="#contact">Contact Details</a></sgds-sidenav-link>
          </sgds-sidenav-item>
          <sgds-sidenav-item>
            <a href="#actions">Form Actions</a>
          </sgds-sidenav-item>
        </sgds-sidenav>
      </nav>

      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md" id="personal">
            <h4 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Personal Information
            </h4>
            <div>
              <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both"></sgds-input>
            </div>
          </div>
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md" id="contact">
            <h4 class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0">
              Contact Details
            </h4>
            <div>
              <sgds-input label="Email" name="email" type="email" required hasFeedback="both"></sgds-input>
            </div>
            <div>
              <sgds-input label="Phone" name="phone" type="tel" required hasFeedback="both"></sgds-input>
            </div>
          </div>
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-end" id="actions">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <sgds-button type="submit">Save</sgds-button>
          </div>
        </div>
      </form>

      <aside class="sgds-col-3 sgds-col-sm-3 sgds-col-md-3 sgds-col-lg-3 sgds-col-xl-3 sgds-col-2-xl-3">
        <sgds-table-of-contents>
          <h5>On this page</h5>
          <li slot="contents">
            <sgds-link><a href="#personal">Personal Information</a></sgds-link>
          </li>
          <li slot="contents">
            <sgds-link><a href="#contact">Contact Details</a></sgds-link>
          </li>
          <li slot="contents">
            <sgds-link><a href="#actions">Form Actions</a></sgds-link>
          </li>
        </sgds-table-of-contents>
      </aside>
    </div>
  </div>
`;

const FormMultistepStepperTemplate = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

          <!-- Stepper -->
          <sgds-stepper id="stepper"></sgds-stepper>

          <!-- Step 1: Personal Information -->
          <div id="step-1" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">Personal Information</h5>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="First name" name="firstName" type="text" required hasFeedback="both" invalidFeedback="First name is required"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Last name" name="lastName" type="text" required hasFeedback="both" invalidFeedback="Last name is required"></sgds-input>
              </div>
            </div>

            <div>
              <sgds-input label="Email" name="email" type="email" required hasFeedback="both" invalidFeedback="Valid email required"></sgds-input>
            </div>

            <div>
              <sgds-datepicker label="Date of birth" name="birthDate" required hasFeedback="both" invalidFeedback="Birth date required"></sgds-datepicker>
            </div>
          </div>

          <!-- Step 2: Contact Details -->
          <div id="step-2" class="sgds:flex sgds:flex-col sgds:gap-layout-md" style="display: none;">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">Contact Details</h5>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone" name="phone" type="tel" hasFeedback="text" hintText="Optional"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Mobile" name="mobile" type="tel" required hasFeedback="both" invalidFeedback="Mobile required"></sgds-input>
              </div>
            </div>

            <div>
              <sgds-textarea label="Street address" name="address" required hasFeedback="both" invalidFeedback="Address required"></sgds-textarea>
            </div>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="City" name="city" type="text" required hasFeedback="both" invalidFeedback="City required"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Postal code" name="postal" type="text" required hasFeedback="both" invalidFeedback="Postal code required"></sgds-input>
              </div>
            </div>

            <div>
              <sgds-select label="Country" name="country" placeholder="Select a country" required hasFeedback="both" invalidFeedback="Country required">
                <sgds-select-option value="sg">Singapore</sgds-select-option>
                <sgds-select-option value="my">Malaysia</sgds-select-option>
                <sgds-select-option value="th">Thailand</sgds-select-option>
              </sgds-select>
            </div>
          </div>

          <!-- Step 3: Preferences -->
          <div id="step-3" class="sgds:flex sgds:flex-col sgds:gap-layout-md" style="display: none;">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">Preferences & Consent</h5>

            <div>
              <sgds-radio-group label="Delivery method" name="delivery" required hasFeedback="both" invalidFeedback="Select a method">
                <sgds-radio value="pickup">Pickup</sgds-radio>
                <sgds-radio value="standard">Standard delivery</sgds-radio>
                <sgds-radio value="express">Express delivery</sgds-radio>
              </sgds-radio-group>
            </div>

            <div>
              <sgds-checkbox-group label="Communication preferences" name="communication">
                <sgds-checkbox value="email">Email updates</sgds-checkbox>
                <sgds-checkbox value="sms">SMS notifications</sgds-checkbox>
                <sgds-checkbox value="phone">Phone calls</sgds-checkbox>
              </sgds-checkbox-group>
            </div>

            <div>
              <sgds-checkbox name="terms" value="agree" required hasFeedback="both" invalidFeedback="You must agree to proceed">
                I agree to the terms and conditions
              </sgds-checkbox>
            </div>

            <div>
              <sgds-checkbox name="newsletter" value="subscribe">Subscribe to our newsletter</sgds-checkbox>
            </div>
          </div>

          <!-- Form actions -->
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center sgds:justify-between">
            <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
            <div class="sgds:flex sgds:gap-layout-sm">
              <sgds-button type="button" id="prevBtn" variant="ghost" style="display: none;">Back</sgds-button>
              <sgds-button type="button" id="nextBtn">Next</sgds-button>
              <sgds-button type="submit" id="submitBtn" style="display: none;">Submit</sgds-button>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
`;

export const FormFieldsRadio = {
  render: FormFieldsRadioTemplate.bind({}),
  name: "Form Fields Radio",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormFieldsCheckbox = {
  render: FormFieldsCheckboxTemplate.bind({}),
  name: "Form Fields Checkbox",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormFieldsTextarea = {
  render: FormFieldsTextareaTemplate.bind({}),
  name: "Form Fields Textarea",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormFieldsSelects = {
  render: FormFieldsSelectsTemplate.bind({}),
  name: "Form Fields Selects",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormFieldsDatesQuantities = {
  render: FormFieldsDatesQuantitiesTemplate.bind({}),
  name: "Form Fields Dates Quantities",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormFieldsFileUpload = {
  render: FormFieldsFileUploadTemplate.bind({}),
  name: "Form Fields File Upload",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormWithSidebar = {
  render: FormWithSidebarTemplate.bind({}),
  name: "Form With Sidebar",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormWithSidebarToc = {
  render: FormWithSidebarTocTemplate.bind({}),
  name: "Form With Sidebar Toc",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};

export const FormMultistepStepper = {
  render: FormMultistepStepperTemplate.bind({}),
  name: "Form Multistep Stepper",
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"],
  play: async ({ canvasElement }) => {
    const stepper = canvasElement.querySelector("#stepper");
    const nextBtn = canvasElement.querySelector("#nextBtn");
    const prevBtn = canvasElement.querySelector("#prevBtn");
    const submitBtn = canvasElement.querySelector("#submitBtn");
    const form = canvasElement.querySelector("form");
    const totalSteps = 3;

    stepper.steps = [
      { stepHeader: "Personal Info", component: "personal-info" },
      { stepHeader: "Contact Details", component: "contact-details" },
      { stepHeader: "Preferences", component: "preferences" }
    ];
    stepper.activeStep = 0;

    function showStep(stepIndex) {
      for (let i = 1; i <= totalSteps; i++) {
        const stepEl = canvasElement.querySelector(`#step-${i}`);
        if (stepEl) stepEl.style.display = "none";
      }

      const currentStepEl = canvasElement.querySelector(`#step-${stepIndex + 1}`);
      if (currentStepEl) currentStepEl.style.display = "flex";

      prevBtn.style.display = stepIndex === 0 ? "none" : "block";
      nextBtn.style.display = stepIndex === totalSteps - 1 ? "none" : "block";
      submitBtn.style.display = stepIndex === totalSteps - 1 ? "block" : "none";
    }

    stepper.addEventListener("sgds-arrived", () => {
      showStep(stepper.activeStep);
    });

    nextBtn.addEventListener("click", () => {
      stepper.nextStep();
    });

    prevBtn.addEventListener("click", () => {
      stepper.previousStep();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted!");
    });

    showStep(0);
  }
};
