import { html } from "lit";

const Template = () => html`
  <style>
    .step-section { display: none; }
    .step-section.active { display: block; }
  </style>

  <sgds-masthead></sgds-masthead>

  <sgds-mainnav>
    <strong slot="brand">Logo</strong>
    <sgds-mainnav-item slot="end">
      <a href="#" class="sgds:text-sm sgds:text-body-subtle">Save draft</a>
    </sgds-mainnav-item>
  </sgds-mainnav>

  <!-- ── Page header ──────────────────────────────────────── -->
  <section id="page-header" class="sgds:bg-surface-default sgds:py-layout-lg">
    <div class="sgds-container">
      <div class="sgds:flex sgds:flex-col sgds:items-start sgds:text-left sgds:gap-layout-md" style="max-width: var(--sgds-text-max-width);">

        <sgds-breadcrumb>
          <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item><a href="#">Grants</a></sgds-breadcrumb-item>
          <sgds-breadcrumb-item active><a href="#">Sustainability Grant Application</a></sgds-breadcrumb-item>
        </sgds-breadcrumb>

        <div>
          <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
            Grant Programme
          </div>
          <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
            Enterprise Sustainability Grant
          </h1>
          <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
            Apply for funding to implement sustainability initiatives in your business.
            Grant quantum: up to 70% of qualifying costs, capped at S$30,000 per project.
          </p>
        </div>

      </div>
    </div>
  </section>

  <section class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds-container sgds:py-2-xl">

      <!-- ── Info alert ─────────────────────────────────────── -->
      <sgds-alert variant="info" class="sgds:mb-layout-md" dismissible>
        <strong>Before you begin:</strong> Ensure you have your company UEN, latest financial statements,
        and project quotations ready. Applications typically take 20-30 minutes to complete.
      </sgds-alert>

      <!-- ── Stepper ───────────────────────────────────────── -->
      <sgds-stepper id="grant-stepper" class="sgds:mb-layout-md"></sgds-stepper>

      <!-- ═══════════════════════════════════════════════════
           STEP 1 Eligibility Check
      ════════════════════════════════════════════════════ -->
      <section id="step-eligibility" class="step-section active">
        <form id="form-eligibility" novalidate>

          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">Company Information</h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Basic details about your registered business entity.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">

                <div class="sgds-grid sgds:gap-component-sm">
                  <sgds-input
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="uen"
                    label="Unique Entity Number (UEN)"
                    name="uen"
                    placeholder="e.g. 201234567A"
                    required
                    hasFeedback="both"
                    invalidFeedback="Enter a valid 9- or 10-character UEN"
                  ></sgds-input>
                  <sgds-input
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="companyName"
                    label="Registered Company Name"
                    name="companyName"
                    placeholder="e.g. Green Solutions Pte. Ltd."
                    required
                    hasFeedback="both"
                  ></sgds-input>
                </div>

                <sgds-select id="businessStructure" label="Business Structure" name="businessStructure" placeholder="Select a business structure" required hasFeedback invalidFeedback="Please select a business structure">
                  <sgds-select-option value="sole-proprietorship">Sole Proprietorship</sgds-select-option>
                  <sgds-select-option value="partnership">Partnership / Limited Liability Partnership</sgds-select-option>
                  <sgds-select-option value="private-limited">Private Limited Company (Pte. Ltd.)</sgds-select-option>
                  <sgds-select-option value="public-limited">Public Limited Company (Ltd.)</sgds-select-option>
                  <sgds-select-option value="cooperative">Co-operative</sgds-select-option>
                </sgds-select>

                <div class="sgds-grid sgds:gap-component-sm">
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="employeeCount"
                    label="Number of Employees"
                    name="employeeCount"
                    placeholder="Select a range"
                    required
                    hasFeedback
                    invalidFeedback="Please select employee count"
                    hintText="As at last financial year end"
                  >
                    <sgds-select-option value="1-10">1 - 10</sgds-select-option>
                    <sgds-select-option value="11-50">11 - 50</sgds-select-option>
                    <sgds-select-option value="51-200">51 - 200</sgds-select-option>
                    <sgds-select-option value="201+">More than 200 (not eligible)</sgds-select-option>
                  </sgds-select>
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="annualTurnover"
                    label="Annual Turnover"
                    name="annualTurnover"
                    placeholder="Select a range"
                    required
                    hasFeedback
                    invalidFeedback="Please select annual turnover"
                    hintText="As at last financial year end"
                  >
                    <sgds-select-option value="lt-1m">Less than S$1 million</sgds-select-option>
                    <sgds-select-option value="1m-10m">S$1 million - S$10 million</sgds-select-option>
                    <sgds-select-option value="10m-50m">S$10 million - S$50 million</sgds-select-option>
                    <sgds-select-option value="50m-100m">S$50 million - S$100 million</sgds-select-option>
                    <sgds-select-option value="gt-100m">More than S$100 million (not eligible)</sgds-select-option>
                  </sgds-select>
                </div>

              </div>
            </div>
          </div>

          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">Industry & History</h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Your primary sector and prior engagement with government grants.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">

                <div class="sgds-grid sgds:gap-component-sm">
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="industrySector"
                    label="Primary Industry Sector"
                    name="industrySector"
                    placeholder="Select a sector"
                    required
                    hasFeedback
                  >
                    <sgds-select-option value="food-beverage">Food & Beverage</sgds-select-option>
                    <sgds-select-option value="retail">Retail</sgds-select-option>
                    <sgds-select-option value="manufacturing">Manufacturing</sgds-select-option>
                    <sgds-select-option value="construction">Construction</sgds-select-option>
                    <sgds-select-option value="logistics">Logistics & Transportation</sgds-select-option>
                    <sgds-select-option value="hospitality">Hospitality & Tourism</sgds-select-option>
                    <sgds-select-option value="professional-services">Professional Services</sgds-select-option>
                    <sgds-select-option value="healthcare">Healthcare</sgds-select-option>
                    <sgds-select-option value="ict">ICT & Digital Services</sgds-select-option>
                    <sgds-select-option value="other">Other</sgds-select-option>
                  </sgds-select>
                  <sgds-select
                    class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6"
                    id="yearsInOperation"
                    label="Years in Operation"
                    name="yearsInOperation"
                    placeholder="Select a range"
                    required
                    hasFeedback
                  >
                    <sgds-select-option value="lt-1">Less than 1 year (not eligible)</sgds-select-option>
                    <sgds-select-option value="1-3">1 - 3 years</sgds-select-option>
                    <sgds-select-option value="3-5">3 - 5 years</sgds-select-option>
                    <sgds-select-option value="gt-5">More than 5 years</sgds-select-option>
                  </sgds-select>
                </div>

                <sgds-radio-group
                  id="priorGrant"
                  label="Have you previously received this grant?"
                  name="priorGrant"
                  required
                  hasFeedback
                >
                  <sgds-radio value="no">No, this is my first application</sgds-radio>
                  <sgds-radio value="yes-different">Yes, for a different project</sgds-radio>
                  <sgds-radio value="yes-same">Yes, for a similar project (may affect eligibility)</sgds-radio>
                </sgds-radio-group>

              </div>
            </div>
          </div>

          <div class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-end sgds:gap-component-sm">
            <sgds-button id="btn-next-1" variant="primary" type="button">
              Next: Project Details
              <sgds-icon name="arrow-right" slot="rightIcon"></sgds-icon>
            </sgds-button>
          </div>

        </form>
      </section>

      <!-- ═══════════════════════════════════════════════════
           STEP 2 Project Details
      ════════════════════════════════════════════════════ -->
      <section id="step-project" class="step-section">
        <form id="form-project" novalidate>

          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">Project Overview</h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Describe the sustainability initiative you are seeking funding for.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">

                <sgds-input
                  id="projectTitle"
                  label="Project Title"
                  name="projectTitle"
                  placeholder="e.g. Solar Panel Installation at Ang Mo Kio Factory"
                  required
                  hasFeedback="both"
                  invalidFeedback="Please provide a project title"
                ></sgds-input>

                <sgds-select
                  id="projectCategory"
                  label="Project Category"
                  name="projectCategory"
                  placeholder="Select a category"
                  required
                  hasFeedback
                >
                  <sgds-select-option value="renewable-energy">Renewable Energy (Solar, Wind, Biogas)</sgds-select-option>
                  <sgds-select-option value="energy-efficiency">Energy Efficiency & Management</sgds-select-option>
                  <sgds-select-option value="water-conservation">Water Conservation & Recycling</sgds-select-option>
                  <sgds-select-option value="waste-management">Waste Reduction & Circular Economy</sgds-select-option>
                  <sgds-select-option value="green-transport">Green Transport & Logistics</sgds-select-option>
                  <sgds-select-option value="sustainable-procurement">Sustainable Procurement & Supply Chain</sgds-select-option>
                  <sgds-select-option value="green-building">Green Building Retrofit</sgds-select-option>
                  <sgds-select-option value="carbon-management">Carbon Measurement & Management</sgds-select-option>
                </sgds-select>

                <sgds-textarea
                  id="projectDescription"
                  label="Project Description"
                  name="projectDescription"
                  placeholder="e.g. We plan to install rooftop solar panels across our warehouse facility to reduce grid electricity dependency and lower carbon emissions..."
                  rows="5"
                  minlength="100"
                  maxlength="2000"
                  characterCount
                  required
                  hasFeedback="both"
                  invalidFeedback="Please provide a description of at least 100 characters"
                  hintText="Describe what you plan to implement and how it will improve your sustainability performance (min. 100 characters)"
                ></sgds-textarea>

              </div>
            </div>
          </div>

          <div class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-between sgds:gap-component-sm">
            <sgds-button id="btn-prev-2" variant="outline" type="button">
              <sgds-icon name="arrow-left" slot="leftIcon"></sgds-icon>
              Back
            </sgds-button>
            <sgds-button id="btn-next-2" variant="primary" type="button">
              Next: Review
              <sgds-icon name="arrow-right" slot="rightIcon"></sgds-icon>
            </sgds-button>
          </div>

        </form>
      </section>

      <!-- ═══════════════════════════════════════════════════
           STEP 3 Review & Declare
      ════════════════════════════════════════════════════ -->
      <section id="step-review" class="step-section">
        <form id="form-review" novalidate>

          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">Application Summary</h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  Review all details before submitting. Use the Back button to correct any information.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
                <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">

                  <sgds-description-list-group bordered>
                    <span slot="title">Company Information</span>
                    <sgds-description-list>UEN<span slot="data" id="rv-uen">-</span></sgds-description-list>
                    <sgds-description-list>Company Name<span slot="data" id="rv-companyName">-</span></sgds-description-list>
                    <sgds-description-list>Business Structure<span slot="data" id="rv-businessStructure">-</span></sgds-description-list>
                  </sgds-description-list-group>

                  <sgds-description-list-group bordered>
                    <span slot="title">Project Details</span>
                    <sgds-description-list>Project Title<span slot="data" id="rv-projectTitle">-</span></sgds-description-list>
                    <sgds-description-list>Category<span slot="data" id="rv-projectCategory">-</span></sgds-description-list>
                  </sgds-description-list-group>

                </div>
              </div>
            </div>
          </div>

          <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
            <div class="sgds-grid sgds:gap-layout-md">
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
                <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:text-heading-default">Declarations</h2>
                <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  All declarations must be acknowledged before submission.
                </p>
              </div>
              <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-layout-md">

                <sgds-checkbox
                  id="decl-accurate"
                  name="declAccurate"
                  value="yes"
                  required
                  hasFeedback="both"
                  invalidFeedback="You must confirm this declaration"
                >
                  I declare that all information provided in this application is true, complete, and accurate to the best of my knowledge.
                </sgds-checkbox>

                <sgds-checkbox
                  id="decl-tnc"
                  name="declTnc"
                  value="yes"
                  required
                  hasFeedback="both"
                  invalidFeedback="You must agree to the Terms and Conditions"
                >
                  I have read and agree to the <a href="#" class="sgds:text-info-default sgds:underline">Terms and Conditions</a>.
                </sgds-checkbox>

              </div>
            </div>
          </div>

          <div class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-between sgds:gap-component-sm">
            <sgds-button id="btn-prev-3" variant="outline" type="button">
              <sgds-icon name="arrow-left" slot="leftIcon"></sgds-icon>
              Back
            </sgds-button>
            <sgds-button id="btn-submit" variant="primary" type="submit">
              Submit Application
              <sgds-icon name="send" slot="rightIcon"></sgds-icon>
            </sgds-button>
          </div>

        </form>
      </section>

      <!-- ═══════════════════════════════════════════════════
           SUCCESS STATE
      ════════════════════════════════════════════════════ -->
      <section id="step-success" class="step-section">
        <div class="sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:py-layout-xl sgds:gap-layout-md">

          <sgds-icon name="check-circle-fill" size="3-xl" class="sgds:text-success-default"></sgds-icon>

          <div>
            <h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:text-heading-default">
              Application Submitted
            </h1>
            <p class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:text-body-subtle">
              Thank you for applying for the Enterprise Sustainability Grant.
            </p>
          </div>

          <div>
            <div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-label-default sgds:mb-xs">
              Reference Number
            </div>
            <h4 id="ref-number" class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">ESG-2026-12345</h4>
          </div>

        </div>
      </section>

    </div>
  </section>

  <sgds-footer></sgds-footer>

  <!-- ── Script ──────────────────────────────────────────────── -->
  <script>
    const stepper = document.getElementById("grant-stepper");

    const STEPS = [
      { stepHeader: "Eligibility", component: "eligibility" },
      { stepHeader: "Project Details", component: "project" },
      { stepHeader: "Review & Declare", component: "review" }
    ];

    const SECTIONS = {
      eligibility: document.getElementById("step-eligibility"),
      project: document.getElementById("step-project"),
      review: document.getElementById("step-review"),
      success: document.getElementById("step-success")
    };

    const FORMS = {
      eligibility: document.getElementById("form-eligibility"),
      project: document.getElementById("form-project"),
      review: document.getElementById("form-review")
    };

    stepper.steps = STEPS;
    stepper.activeStep = 0;

    function showSection(key) {
      Object.values(SECTIONS).forEach(s => s.classList.remove("active"));
      SECTIONS[key].classList.add("active");
    }

    function validateStep(formId) {
      const form = FORMS[formId];
      if (!form) return true;
      return form.reportValidity();
    }

    stepper.addEventListener("sgds-arrived", () => {
      const key = STEPS[stepper.activeStep].component;
      showSection(key);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("btn-next-1").addEventListener("click", () => {
      if (!validateStep("eligibility")) return;
      stepper.nextStep();
    });

    document.getElementById("btn-prev-2").addEventListener("click", () => stepper.previousStep());

    document.getElementById("btn-next-2").addEventListener("click", () => {
      if (!validateStep("project")) return;
      populateReview();
      stepper.nextStep();
    });

    document.getElementById("btn-prev-3").addEventListener("click", () => stepper.previousStep());

    const LABELS = {
      businessStructure: {
        "sole-proprietorship": "Sole Proprietorship",
        "partnership": "Partnership / LLP",
        "private-limited": "Private Limited (Pte. Ltd.)",
        "public-limited": "Public Limited (Ltd.)",
        "cooperative": "Co-operative"
      },
      projectCategory: {
        "renewable-energy": "Renewable Energy",
        "energy-efficiency": "Energy Efficiency",
        "water-conservation": "Water Conservation",
        "waste-management": "Waste Management",
        "green-transport": "Green Transport",
        "sustainable-procurement": "Sustainable Procurement",
        "green-building": "Green Building Retrofit",
        "carbon-management": "Carbon Management"
      }
    };

    function resolveLabel(field, value) {
      const map = LABELS[field];
      return (map && map[value]) ? map[value] : (value || "-");
    }

    function populateReview() {
      const fields = ["uen", "companyName", "businessStructure", "projectTitle", "projectCategory"];

      fields.forEach(id => {
        const el = document.getElementById(id);
        const rvEl = document.getElementById("rv-" + id);
        if (!el || !rvEl) return;
        const raw = el.value || "";
        rvEl.textContent = resolveLabel(id, raw) || "-";
      });
    }

    document.getElementById("form-review").addEventListener("submit", e => {
      e.preventDefault();
      if (!e.target.reportValidity()) return;

      const refNum = "ESG-2026-" + String(Math.floor(10000 + Math.random() * 90000)).padStart(5, "0");
      document.getElementById("ref-number").textContent = refNum;

      stepper.style.display = "none";
      document.getElementById("page-header").style.display = "none";
      Object.values(SECTIONS).forEach(s => s.classList.remove("active"));
      SECTIONS.success.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  </script>
`;

export default {
  title: "Templates/Form/Multi-step Form",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen"
  }
};

export const MultiStepForm = {
  render: Template.bind({}),
  name: "Multi-step Form"
};
