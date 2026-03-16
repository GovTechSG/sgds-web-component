import { html } from "lit";

export default {
  title: "Templates/Form page"
};

const Template = () => html`
  <div>
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">My Application</strong>
      <sgds-mainnav-item slot="end">
        <a href="#">Admin</a>
      </sgds-mainnav-item>
    </sgds-mainnav>
  </div>

  <div class="sgds:bg-surface-default sgds:min-h-screen">
    <div class="sgds-container sgds:py-layout-md">
      <!-- Page header with actions -->
      <div class="sgds:flex sgds:items-start sgds:justify-between sgds:mb-layout-md">
        <div>
          <h1 class="sgds:text-2xl sgds:font-semibold sgds:text-color-default">Edit profile</h1>
          <p class="sgds:text-sm sgds:text-color-muted sgds:mt-1">Update your personal details and preferences.</p>
        </div>
        <div class="sgds:flex sgds:gap-component-sm sgds:shrink-0 sgds:ml-layout-sm">
          <sgds-button variant="outline">Cancel</sgds-button>
          <sgds-button variant="primary" type="submit" form="profile-form">Save changes</sgds-button>
        </div>
      </div>

      <form id="profile-form">
        <!-- Section 1: Personal information -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-sm">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h2 class="sgds:text-base sgds:font-semibold sgds:text-color-default">Personal information</h2>
              <p class="sgds:text-sm sgds:text-color-muted sgds:mt-1">
                Your name and contact details. Only your agency administrator can see this information.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
              <div class="sgds-grid sgds:gap-component-sm">
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="First name"
                  name="firstName"
                  required
                  hasFeedback
                ></sgds-input>
                <sgds-input
                  class="sgds-col-4 sgds-col-sm-4 sgds-col-lg-6"
                  label="Last name"
                  name="lastName"
                  required
                  hasFeedback
                ></sgds-input>
              </div>
              <sgds-input
                label="Email address"
                type="email"
                name="email"
                hint="Must be a gov.sg email address."
                required
                hasFeedback
              ></sgds-input>
              <sgds-input
                label="Phone number"
                type="tel"
                name="phone"
                hint="Singapore number including country code, e.g. +65 9123 4567"
                hasFeedback
              ></sgds-input>
            </div>
          </div>
        </div>

        <!-- Section 2: Role & access -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-sm">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h2 class="sgds:text-base sgds:font-semibold sgds:text-color-default">Role & access</h2>
              <p class="sgds:text-sm sgds:text-color-muted sgds:mt-1">
                Your position and assigned permissions within the system.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8 sgds:flex sgds:flex-col sgds:gap-component-sm">
              <sgds-input label="Job title" name="jobTitle" hasFeedback></sgds-input>
              <sgds-select label="Department" name="department" hasFeedback>
                <sgds-select-option value="">Select department</sgds-select-option>
                <sgds-select-option value="policy">Policy</sgds-select-option>
                <sgds-select-option value="operations">Operations</sgds-select-option>
                <sgds-select-option value="ict">ICT</sgds-select-option>
              </sgds-select>
              <sgds-select label="Access level" name="accessLevel" hasFeedback>
                <sgds-select-option value="viewer">Viewer</sgds-select-option>
                <sgds-select-option value="editor">Editor</sgds-select-option>
                <sgds-select-option value="admin">Admin</sgds-select-option>
              </sgds-select>
            </div>
          </div>
        </div>

        <!-- Section 3: Notes -->
        <div class="sgds:border-t sgds:border-muted sgds:py-layout-md">
          <div class="sgds-grid sgds:gap-layout-sm">
            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">
              <h2 class="sgds:text-base sgds:font-semibold sgds:text-color-default">Notes</h2>
              <p class="sgds:text-sm sgds:text-color-muted sgds:mt-1">
                Optional additional context visible to your team.
              </p>
            </div>

            <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">
              <sgds-textarea
                label="Internal notes"
                name="notes"
                rows="4"
                maxlength="500"
                characterCount
                hint="Max 500 characters."
              ></sgds-textarea>
            </div>
          </div>
        </div>

        <!-- Form footer -->
        <div class="sgds:border-t sgds:border-muted sgds:pt-layout-sm sgds:flex sgds:justify-end sgds:gap-component-sm">
          <sgds-button variant="outline" type="button">Cancel</sgds-button>
          <sgds-button variant="primary" type="submit">Save changes</sgds-button>
        </div>
      </form>
    </div>
  </div>
`;

export const FormPageTemplate = {
  render: Template.bind({}),
  name: "Form page",
  args: {},
  parameters: { layout: "fullscreen" },
  tags: ["!autodocs"]
};
