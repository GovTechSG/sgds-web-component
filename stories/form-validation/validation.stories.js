import { html } from "lit";

export default {
  title: "Form/Validation",
  parameters: { layout: "fullscreen" }
};

const ConstraintValidationTemplate = args => {
  return html`
    <div class="sgds-container sgds:py-layout-md">
      <div class="sgds-grid sgds:gap-layout-md">
        <form
          id="validation-form_constraint-validation"
          class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
        >
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
              <h5
                class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
              >
                Constraint Validation
              </h5>
              <div>
                <sgds-input
                  label="First Name"
                  hinttext="type Sarah"
                  name="firstName"
                  required
                  hasFeedback="both"
                  placeholder="Placeholder"
                  pattern="Sarah"
                >
                </sgds-input>
              </div>
              <div>
                <sgds-datepicker required hasFeedback="both" name="appointmentDate" label="Appointment date"></sgds-datepicker>
              </div>
              <div>
                <sgds-select
                  required
                  hasFeedback="both"
                  name="favouriteAnimal"
                  label="Favourite animal"
                  menuList='[
                    { "label": "Aligator", "value": "1" },
                    { "label": "Bear", "value": "2" },
                    { "label": "Cat", "value": "3" },
                    { "label": "Dog", "value": "4" },
                    { "label": "Elephant", "value": "5" },
                    { "label": "Frog", "value": "6" },
                    { "label": "Goose", "value": "7" },
                    { "label": "Hen", "value": "8" }
                  ]'
                ></sgds-select>
              </div>
              <div>
                <sgds-combo-box
                  required
                  hasFeedback="both"
                  name="countryOfBirth"
                  label="Country of birth"
                  menuList='[
                    { "label": "Singapore", "value": "1" },
                    { "label": "Thailand", "value": "2" },
                    { "label": "Malaysia", "value": "3" },
                    { "label": "Philippines", "value": "4" },
                    { "label": "Japan", "value": "5" },
                    { "label": "Laos", "value": "6" },
                    { "label": "Vietnam", "value": "7" },
                    { "label": "China", "value": "8" }
                  ]'
                  placeholder="Choose a country"
                ></sgds-combo-box>
              </div>
              <div>
                <sgds-quantity-toggle
                  label="Number of dependents"
                  name="dependentCount"
                  min="1"
                  max="10"
                  hinttext="Input number 1 to 10 only"
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
              <div>
                <sgds-checkbox-group
                  hasFeedback="both"
                  hintText="Check at least one option"
                  required
                  label="Food preference"
                  name="food"
                >
                  <sgds-checkbox value="vegetarian">vegetarian</sgds-checkbox>
                  <sgds-checkbox value="halal">halal</sgds-checkbox>
                  <sgds-checkbox value="na">no preference</sgds-checkbox>
                </sgds-checkbox-group>
              </div>
              <div>
                <sgds-radio-group hasFeedback="both" name="gender" required label="Gender">
                  <sgds-radio value="female">Female</sgds-radio>
                  <sgds-radio value="male">Male</sgds-radio>
                </sgds-radio-group>
              </div>
              <div>
                <sgds-textarea
                  name="comments"
                  minlength="3"
                  required
                  hasFeedback="both"
                  resize="auto"
                  label="Comments"
                  hintText="Required to fill with minimum length of 3"
                ></sgds-textarea>
              </div>
              <div>
                <sgds-file-upload required label="Supporting documents" multiple name="documents" hasFeedback="both"
                  >File upload</sgds-file-upload
                >
              </div>
              <div>
                <sgds-checkbox name="consentA" value="consentA" required hasFeedback="both">I consent to ...</sgds-checkbox>
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
};

export const ConstraintValidation = {
  render: ConstraintValidationTemplate.bind({}),
  name: "Constraint validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const FormDataTemplate = args => {
  return html`
    <div class="sgds-container sgds:py-layout-md">
      <div class="sgds-grid sgds:gap-layout-md">
        <form
          id="validation-form_getting-data"
          class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8"
        >
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
              <h5
                class="sgds:text-subtitle-lg sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:mb-0"
              >
                Get Values Through FormData
              </h5>
              <div>
                <sgds-input
                  label="First Name"
                  hinttext="type Sarah"
                  name="firstName"
                  required
                  hasFeedback="both"
                  placeholder="Placeholder"
                  pattern="Sarah"
                >
                </sgds-input>
              </div>
              <div>
                <sgds-quantity-toggle
                  label="Number of dependents"
                  name="dependentCount"
                  min="1"
                  max="10"
                  hinttext="Input number 1 to 10 only"
                  hasFeedback="both"
                ></sgds-quantity-toggle>
              </div>
              <div>
                <sgds-datepicker required hasFeedback="both" name="appointmentDate" label="Appointment date"></sgds-datepicker>
              </div>
              <div>
                <sgds-select
                  required
                  hasFeedback="both"
                  name="favouriteAnimal"
                  label="Favourite animal"
                  menuList='[
                    { "label": "Aligator", "value": "1" },
                    { "label": "Bear", "value": "2" },
                    { "label": "Cat", "value": "3" },
                    { "label": "Dog", "value": "4" },
                    { "label": "Elephant", "value": "5" },
                    { "label": "Frog", "value": "6" },
                    { "label": "Goose", "value": "7" },
                    { "label": "Hen", "value": "8" }
                  ]'
                ></sgds-select>
              </div>
              <div>
                <sgds-combo-box
                  required
                  hasFeedback="both"
                  name="countryOfBirth"
                  label="Country of birth"
                  menuList='[
                    { "label": "Singapore", "value": "1" },
                    { "label": "Thailand", "value": "2" },
                    { "label": "Malaysia", "value": "3" },
                    { "label": "Philippines", "value": "4" },
                    { "label": "Japan", "value": "5" },
                    { "label": "Laos", "value": "6" },
                    { "label": "Vietnam", "value": "7" },
                    { "label": "China", "value": "8" }
                  ]'
                  placeholder="Choose a country"
                ></sgds-combo-box>
              </div>
              <div>
                <sgds-checkbox-group
                  hasFeedback="both"
                  hintText="Check at least one option"
                  required
                  label="Food preference"
                  name="food"
                >
                  <sgds-checkbox value="vegetarian">vegetarian</sgds-checkbox>
                  <sgds-checkbox value="halal">halal</sgds-checkbox>
                  <sgds-checkbox value="na">no preference</sgds-checkbox>
                </sgds-checkbox-group>
              </div>
              <div>
                <sgds-radio-group hasFeedback="both" name="gender" required label="Gender">
                  <sgds-radio value="female">Female</sgds-radio>
                  <sgds-radio value="male">Male</sgds-radio>
                </sgds-radio-group>
              </div>
              <div>
                <sgds-textarea
                  name="comments"
                  minlength="3"
                  required
                  hasFeedback="both"
                  resize="auto"
                  label="Comments"
                  hintText="Required to fill with minimum length of 3"
                ></sgds-textarea>
              </div>
              <div>
                <sgds-file-upload
                  id="file-upload-form-data"
                  required
                  label="Supporting documents"
                  multiple
                  name="documents"
                  hasFeedback="both"
                  >File upload</sgds-file-upload
                >
              </div>
              <div>
                <sgds-checkbox name="consentA" value="consentA" required hasFeedback="both">I consent to ...</sgds-checkbox>
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

    <script>
      const form = document.querySelector("#validation-form_getting-data");

      form.addEventListener("submit", event => {
        let data = {
          firstName: "",
          dependentCount: 0,
          appointmentDate: "",
          countryOfBirth: "",
          consentA: false,
          gender: "",
          comments: "",
          food: ""
        };
        event.preventDefault();
        const formData = new FormData(event.target);
        data.firstName = formData.get("firstName");
        data.dependentCount = formData.get("dependentCount");
        data.appointmentDate = formData.get("appointmentDate");
        data.countryOfBirth = formData.get("countryOfBirth");
        data.consentA = formData.get("consentA") === "on";
        data.gender = formData.get("gender");
        data.comments = formData.get("comments");
        data.food = formData.get("food");
        const fileInput = document.getElementById("file-upload-form-data");
        for (let i = 0; i < fileInput.selectedFiles.length; i++) {
          const fileName = "file" + i;
          formData.append(fileName, fileInput.selectedFiles[i]);
          data[fileName] = JSON.stringify(fileInput.selectedFiles[i].name);
        }
        alert(JSON.stringify(data));
        // submit FormData
      });
    </script>
  `;
};

export const FormData = {
  render: FormDataTemplate.bind({}),
  name: "Get values through FormData",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
