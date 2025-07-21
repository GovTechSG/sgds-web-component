import { html } from "lit-html";

export default {
  title: "Form/Validation"
};

const ConstraintValidationTemplate = args => {
  return html`
    <form id="validation-form_constraint-validation" class="d-flex-column">
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
      <sgds-datepicker required hasFeedback name="appointmentDate" label="Appointment date"></sgds-datepicker>
      <sgds-select
        required
        hasFeedback
        name="favouriteAnimal"
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
      <sgds-combo-box
        required
        hasFeedback
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
      <sgds-quantity-toggle
        label="Number of dependents"
        name="dependentCount"
        min="1"
        max="10"
        hinttext="Input number 1 to 10 only"
        hasFeedback="both"
      ></sgds-quantity-toggle>
      <sgds-checkbox-group hasFeedback hintText="hint for checkbox" label="Agreements">
        <sgds-checkbox name="consentA" value="consentA" required>I consent to ...</sgds-checkbox>
      </sgds-checkbox-group>

      <sgds-radio-group hasFeedback name="gender" required label="Gender">
        <sgds-radio value="female">Female</sgds-radio>
        <sgds-radio value="male">Male</sgds-radio>
      </sgds-radio-group>

      <sgds-textarea
        name="comments"
        minlength="3"
        required
        hasFeedback
        resize="auto"
        label="Comments"
        hintText="Required to fill with minimum length of 3"
      ></sgds-textarea>
      <sgds-file-upload required label="Supporting documents" multiple name="documents" hasFeedback
        >File upload</sgds-file-upload
      >
      <div class="d-flex-row">
        <sgds-button type="submit" id="submit">Submit</sgds-button>
        <sgds-button type="reset" id="reset" variant="ghost">Reset</sgds-button>
      </div>
    </form>
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
    <form id="validation-form_getting-data" class="d-flex-column">
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
      <sgds-quantity-toggle
        label="Number of dependents"
        name="dependentCount"
        min="1"
        max="10"
        hinttext="Input number 1 to 10 only"
        hasFeedback="both"
      ></sgds-quantity-toggle>
      <sgds-datepicker required hasFeedback name="appointmentDate" label="Appointment date"></sgds-datepicker>
      <sgds-select
        required
        hasFeedback
        name="favouriteAnimal"
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
      <sgds-combo-box
        required
        hasFeedback
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
      <sgds-checkbox-group hasFeedback hintText="hint for checkbox" label="Agreements">
        <sgds-checkbox name="consentA" value="consentA" required>I consent to ...</sgds-checkbox>
      </sgds-checkbox-group>

      <sgds-radio-group hasFeedback name="gender" required label="Gender">
        <sgds-radio value="female">Female</sgds-radio>
        <sgds-radio value="male">Male</sgds-radio>
      </sgds-radio-group>

      <sgds-textarea
        name="comments"
        minlength="3"
        required
        hasFeedback
        resize="auto"
        label="Comments"
        hintText="Required to fill with minimum length of 3"
      ></sgds-textarea>
      <sgds-file-upload
        id="file-upload-form-data"
        required
        label="Supporting documents"
        multiple
        name="documents"
        hasFeedback
        >File upload</sgds-file-upload
      >
      <div class="d-flex-row">
        <sgds-button type="submit" id="submit">Submit</sgds-button>
        <sgds-button type="reset" id="reset" variant="ghost">Reset</sgds-button>
      </div>
    </form>

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
          comments: ""
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

        const fileInput = document.getElementById("file-upload-form-data");
        for (let i = 0; i < fileInput.selectedFiles.length; i++) {
          const fileName = "file" + i;
          console.log(fileInput.selectedFiles[i]);
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
