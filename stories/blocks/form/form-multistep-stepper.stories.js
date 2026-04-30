import { html } from "lit";

export default {
  title: "Blocks/Form"
};

const Template = () => html`
  <div class="sgds-container sgds:py-layout-md">
    <div class="sgds-grid sgds:gap-layout-md">
      <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
          <!-- Stepper -->
          <sgds-stepper id="stepper"></sgds-stepper>

          <!-- Step 1: Personal Information -->
          <div id="step-1" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
              Personal Information
            </h5>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="First name"
                  name="firstName"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="First name is required"
                ></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="Last name"
                  name="lastName"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="Last name is required"
                ></sgds-input>
              </div>
            </div>

            <div>
              <sgds-input
                label="Email"
                name="email"
                type="email"
                required
                hasFeedback="both"
                invalidFeedback="Valid email required"
              ></sgds-input>
            </div>

            <div>
              <sgds-datepicker
                label="Date of birth"
                name="birthDate"
                required
                hasFeedback="both"
                invalidFeedback="Birth date required"
              ></sgds-datepicker>
            </div>
          </div>

          <!-- Step 2: Contact Details -->
          <div id="step-2" class="sgds:flex sgds:flex-col sgds:gap-layout-md" style="display: none;">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
              Contact Details
            </h5>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input label="Phone" name="phone" type="tel" hasFeedback="text" hintText="Optional"></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="Mobile"
                  name="mobile"
                  type="tel"
                  required
                  hasFeedback="both"
                  invalidFeedback="Mobile required"
                ></sgds-input>
              </div>
            </div>

            <div>
              <sgds-textarea
                label="Street address"
                name="address"
                required
                hasFeedback="both"
                invalidFeedback="Address required"
              ></sgds-textarea>
            </div>

            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="City"
                  name="city"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="City required"
                ></sgds-input>
              </div>
              <div class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6 sgds-col-xl-6 sgds-col-2-xl-6">
                <sgds-input
                  label="Postal code"
                  name="postal"
                  type="text"
                  required
                  hasFeedback="both"
                  invalidFeedback="Postal code required"
                ></sgds-input>
              </div>
            </div>

            <div>
              <sgds-select
                label="Country"
                name="country"
                placeholder="Select a country"
                required
                hasFeedback="both"
                invalidFeedback="Country required"
              >
                <sgds-select-option value="sg">Singapore</sgds-select-option>
                <sgds-select-option value="my">Malaysia</sgds-select-option>
                <sgds-select-option value="th">Thailand</sgds-select-option>
              </sgds-select>
            </div>
          </div>

          <!-- Step 3: Preferences -->
          <div id="step-3" class="sgds:flex sgds:flex-col sgds:gap-layout-md" style="display: none;">
            <h5 class="sgds:text-subtitle-lg sgds:font-semibold sgds:text-heading-default sgds:mb-0">
              Preferences & Consent
            </h5>

            <div>
              <sgds-radio-group
                label="Delivery method"
                name="delivery"
                required
                hasFeedback="both"
                invalidFeedback="Select a method"
              >
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
              <sgds-checkbox
                name="terms"
                value="agree"
                required
                hasFeedback="both"
                invalidFeedback="You must agree to proceed"
              >
                I agree to the terms and conditions
              </sgds-checkbox>
            </div>

            <div>
              <sgds-checkbox name="newsletter" value="subscribe">Subscribe to our newsletter</sgds-checkbox>
            </div>
          </div>

          <!-- Form actions -->
          <div class="sgds:flex sgds:gap-layout-sm sgds:items-center">
            <sgds-button type="button" id="prevBtn" variant="ghost" style="display: none;">Previous</sgds-button>
            <div class="sgds:flex sgds:gap-layout-sm" style="margin-left: auto;">
              <sgds-button type="reset" variant="ghost">Cancel</sgds-button>
              <sgds-button type="button" id="nextBtn">Next</sgds-button>
              <sgds-button type="submit" id="submitBtn" style="display: none;">Submit</sgds-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
`;

export const FormMultistepStepper = {
  render: Template.bind({}),
  name: "Form Multi-step",
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

    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Form submitted!");
    });

    showStep(0);
  }
};
