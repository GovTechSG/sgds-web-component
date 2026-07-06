import { html } from "lit";

export default {
  title: "Form/Custom Validation"
};
const handleInput = e => {};

const DisableValidationByInputTemplate = args => {
  return html`
    <form id="custom-validation-form" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
      <sgds-input
        noValidate
        required
        label="Keys"
        hinttext="Keys cannot start with special characters like @, #, $"
        name="input-keys"
        hasFeedback="both"
        placeholder="Placeholder"
        id="custom-validation__input-novalidate"
        @sgds-input=${handleInput}
      >
      </sgds-input>
      <sgds-textarea
        noValidate
        required
        label="Bio"
        hinttext="Must be at least 10 characters long"
        name="textarea-bio"
        hasFeedback
        placeholder="Enter bio"
        id="custom-validation__textarea-novalidate"
      >
      </sgds-textarea>
      <sgds-combo-box
        noValidate
        required
        label="Fruit"
        hinttext="Selection must start with 'A'"
        name="combo-fruit"
        hasFeedback
        placeholder="Select a fruit"
        id="custom-validation__combobox-novalidate"
      >
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="apricot">Apricot</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      </sgds-combo-box>
      <sgds-select
        noValidate
        required
        label="Gender"
        hinttext="Please select a gender"
        name="select-gender"
        hasFeedback
        placeholder="Select a gender"
        id="custom-validation__select-novalidate"
      >
        <sgds-select-option value="male">Male</sgds-select-option>
        <sgds-select-option value="female">Female</sgds-select-option>
        <sgds-select-option value="other">Other</sgds-select-option>
        <sgds-select-option value="prefer-not-to-say">Prefer not to say</sgds-select-option>
      </sgds-select>
      <sgds-file-upload
        noValidate
        required
        label="Documents"
        hinttext="Max 2 PDF files"
        name="documents"
        hasFeedback
        multiple
        accept=".pdf"
        id="custom-validation__file-upload-novalidate"
      >
        Choose Files
      </sgds-file-upload>
      <sgds-datepicker
        noValidate
        required
        label="Appointment Date"
        hintText="Must be a future date"
        name="appointment-date"
        hasFeedback
        id="custom-validation__datepicker-novalidate"
      ></sgds-datepicker>
      <sgds-checkbox-group
        noValidate
        required
        label="Interests"
        hintText="Select at least one interest"
        name="checkbox-interests"
        hasFeedback
        id="custom-validation__checkbox-novalidate"
      >
        <sgds-checkbox value="sports">Sports</sgds-checkbox>
        <sgds-checkbox value="music">Music</sgds-checkbox>
        <sgds-checkbox value="reading">Reading</sgds-checkbox>
      </sgds-checkbox-group>
      <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
        <sgds-button type="reset" variant="ghost">Reset</sgds-button>
        <sgds-button type="submit">Submit</sgds-button>
      </div>
      <sgds-radio-group
        noValidate
        required
        label="Gender"
        hintText="Please select a gender"
        name="radio-gender"
        hasFeedback
        id="custom-validation__radio-novalidate"
      >
        <sgds-radio value="male">Male</sgds-radio>
        <sgds-radio value="female">Female</sgds-radio>
        <sgds-radio value="other">Other</sgds-radio>
      </sgds-radio-group>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
    <script>
      const formOne = document.getElementById("custom-validation-form");
      formOne.addEventListener("submit", e => {
        e.preventDefault();
        const components = formOne.querySelectorAll(
          "sgds-input, sgds-textarea, sgds-combo-box, sgds-select, sgds-file-upload, sgds-datepicker"
        );
        let hasInvalid = false;
        components.forEach(c => {
          if (c.invalid) hasInvalid = true;
        });
        if (hasInvalid) return;
        alert(
          "Form submitted successfully despite empty required fields — constraint validation was disabled by the noValidate property."
        );
      });

      const inputOne = document.querySelector("sgds-input#custom-validation__input-novalidate");
      inputOne.addEventListener("sgds-input", e => {
        if (!/^[^a-zA-Z0-9]/.test(e.target.value)) {
          e.target.setInvalid(false);
        } else {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "This is an invalid message";
        }
      });

      const textareaOne = document.querySelector("sgds-textarea#custom-validation__textarea-novalidate");
      textareaOne.addEventListener("sgds-input", e => {
        if (!e.target.value || e.target.value.length >= 10) {
          e.target.setInvalid(false);
        } else {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Bio must be at least 10 characters long";
        }
      });
      const comboOne = document.querySelector("sgds-combo-box#custom-validation__combobox-novalidate");
      comboOne.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Select an option";
        } else if (!e.target.value.startsWith("a")) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Selection must start with 'A'";
        } else {
          e.target.setInvalid(false);
        }
      });
      const selectOne = document.querySelector("sgds-select#custom-validation__select-novalidate");
      selectOne.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a gender";
        } else {
          e.target.setInvalid(false);
        }
      });
      const fileUploadOne = document.querySelector("sgds-file-upload#custom-validation__file-upload-novalidate");
      fileUploadOne.addEventListener("sgds-add-files", e => {
        const allFiles = fileUploadOne.files;
        let isValid = true;
        let errorMsg = "";

        if (allFiles.length > 2) {
          isValid = false;
          errorMsg = "Maximum 2 files allowed";
        }

        for (const file of e.detail) {
          if (!file.name.toLowerCase().endsWith(".pdf")) {
            isValid = false;
            errorMsg = "Only PDF files are allowed";
            break;
          }
        }

        fileUploadOne.invalidFeedback = errorMsg;
        fileUploadOne.setInvalid(!isValid);
      });

      fileUploadOne.addEventListener("sgds-remove-file", e => {
        const remaining = e.detail.files;
        if (remaining.length === 0) {
          fileUploadOne.invalidFeedback = "At least one file is required";
          fileUploadOne.setInvalid(true);
        } else {
          fileUploadOne.setInvalid(false);
        }
      });

      const datepickerOne = document.querySelector("sgds-datepicker#custom-validation__datepicker-novalidate");
      datepickerOne.addEventListener("sgds-change-date", e => {
        const val = e.target.value;
        if (!val || val === "DD/MM/YYYY") return;
        const [day, month, year] = val.split("/");
        const selected = new Date(Number(year), Number(month) - 1, Number(day));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected <= today) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a future date";
        } else {
          e.target.setInvalid(false);
        }
      });

      const radioOne = document.querySelector("sgds-radio-group#custom-validation__radio-novalidate");
      radioOne.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a gender";
        } else {
          e.target.setInvalid(false);
        }
      });
      const checkboxGroupOne = document.querySelector("sgds-checkbox-group#custom-validation__checkbox-novalidate");
      checkboxGroupOne.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select at least one interest";
        } else {
          e.target.setInvalid(false);
        }
      });
      const radioOne = document.querySelector("sgds-radio-group#custom-validation__radio-novalidate");
      radioOne.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a gender";
        } else {
          e.target.setInvalid(false);
        }
      });
    </script>
  `;
};
const DisableValidationByFormTemplate = args => {
  return html`
    <form id="custom-validation-form_novalidate" class="sgds:flex sgds:flex-col sgds:gap-layout-xs" novalidate>
      <sgds-input
        required
        label="Keys"
        hinttext="Keys cannot start with special characters like @, #, $"
        name="input-keys"
        hasFeedback="both"
        placeholder="Placeholder"
        id="custom-validation__input-two-novalidate"
      >
      </sgds-input>
      <sgds-textarea
        required
        label="Notes"
        hinttext="Custom validation: minimum 5 characters"
        name="textarea-notes"
        hasFeedback
        placeholder="Enter notes"
        id="custom-validation__textarea-two-novalidate"
      >
      </sgds-textarea>
      <sgds-combo-box
        required
        label="Fruit"
        hinttext="Selection must start with 'A'"
        name="combo-fruit"
        hasFeedback
        placeholder="Select a fruit"
        id="custom-validation__combobox-two-novalidate"
      >
        <sgds-combo-box-option value="apple">Apple</sgds-combo-box-option>
        <sgds-combo-box-option value="apricot">Apricot</sgds-combo-box-option>
        <sgds-combo-box-option value="banana">Banana</sgds-combo-box-option>
        <sgds-combo-box-option value="durian">Durian</sgds-combo-box-option>
      </sgds-combo-box>
      <sgds-select
        required
        label="Gender"
        hinttext="Please select a gender"
        name="select-gender"
        hasFeedback
        placeholder="Select a gender"
        id="custom-validation__select-two-novalidate"
      >
        <sgds-select-option value="male">Male</sgds-select-option>
        <sgds-select-option value="female">Female</sgds-select-option>
        <sgds-select-option value="other">Other</sgds-select-option>
        <sgds-select-option value="prefer-not-to-say">Prefer not to say</sgds-select-option>
      </sgds-select>
      <sgds-file-upload
        required
        label="Documents"
        hinttext="Max 2 PDF files"
        name="documents"
        hasFeedback
        multiple
        accept=".pdf"
        id="custom-validation__file-upload-two-novalidate"
      >
        Choose Files
      </sgds-file-upload>
      <sgds-datepicker
        required
        label="Appointment Date"
        hintText="Must be a future date"
        name="appointment-date"
        hasFeedback
        id="custom-validation__datepicker-two-novalidate"
      ></sgds-datepicker>
      <sgds-radio-group
        required
        label="Gender"
        hintText="Please select a gender"
        name="radio-gender"
        hasFeedback
        id="custom-validation__radio-two-novalidate"
      >
        <sgds-radio value="male">Male</sgds-radio>
        <sgds-radio value="female">Female</sgds-radio>
        <sgds-radio value="other">Other</sgds-radio>
      </sgds-radio-group>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-checkbox-group
        required
        label="Interests"
        hintText="Select at least one interest"
        name="checkbox-interests"
        hasFeedback
        id="custom-validation__checkbox-two-novalidate"
      >
        <sgds-checkbox value="sports">Sports</sgds-checkbox>
        <sgds-checkbox value="music">Music</sgds-checkbox>
        <sgds-checkbox value="reading">Reading</sgds-checkbox>
      </sgds-checkbox-group>
      <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
        <sgds-button type="reset" variant="ghost">Reset</sgds-button>
        <sgds-button type="submit">Submit</sgds-button>
      </div>
      <sgds-radio-group
        required
        label="Gender"
        hintText="Please select a gender"
        name="radio-gender"
        hasFeedback
        id="custom-validation__radio-two-novalidate"
      >
        <sgds-radio value="male">Male</sgds-radio>
        <sgds-radio value="female">Female</sgds-radio>
        <sgds-radio value="other">Other</sgds-radio>
      </sgds-radio-group>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
    <script>
      const formTwo = document.getElementById("custom-validation-form_novalidate");
      formTwo.addEventListener("submit", e => {
        e.preventDefault();
        alert(
          "Form submitted successfully despite empty required fields — constraint validation was disabled by the noValidate property."
        );
      });

      const inputTwo = document.getElementById("custom-validation__input-two-novalidate");
      inputTwo.addEventListener("sgds-input", e => {
        if (!/^[^a-zA-Z0-9]/.test(e.target.value)) {
          e.target.setInvalid(false);
        } else {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "This is an invalid message";
        }
      });

      const textareaTwo = document.getElementById("custom-validation__textarea-two-novalidate");
      textareaTwo.addEventListener("sgds-input", e => {
        if (!e.target.value || e.target.value.length >= 5) {
          e.target.setInvalid(false);
        } else {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Notes must be at least 5 characters long";
        }
      });

      const comboTwo = document.getElementById("custom-validation__combobox-two-novalidate");
      comboTwo.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Select an option";
        } else if (!e.target.value.startsWith("a")) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Selection must start with 'A'";
        } else {
          e.target.setInvalid(false);
        }
      });
      const selectTwo = document.getElementById("custom-validation__select-two-novalidate");
      selectTwo.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a gender";
        } else {
          e.target.setInvalid(false);
        }
      });
      const fileUploadTwo = document.getElementById("custom-validation__file-upload-two-novalidate");
      fileUploadTwo.addEventListener("sgds-add-files", e => {
        const allFiles = fileUploadTwo.files;
        let isValid = true;
        let errorMsg = "";

        if (allFiles.length > 2) {
          isValid = false;
          errorMsg = "Maximum 2 files allowed";
        }

        for (const file of e.detail) {
          if (!file.name.toLowerCase().endsWith(".pdf")) {
            isValid = false;
            errorMsg = "Only PDF files are allowed";
            break;
          }
        }

        fileUploadTwo.invalidFeedback = errorMsg;
        fileUploadTwo.setInvalid(!isValid);
      });

      fileUploadTwo.addEventListener("sgds-remove-file", e => {
        const remaining = e.detail.files;
        if (remaining.length === 0) {
          fileUploadTwo.invalidFeedback = "At least one file is required";
          fileUploadTwo.setInvalid(true);
        } else {
          fileUploadTwo.setInvalid(false);
        }
      });

      const datepickerTwo = document.getElementById("custom-validation__datepicker-two-novalidate");
      datepickerTwo.addEventListener("sgds-change-date", e => {
        const val = e.target.value;
        if (!val || val === "DD/MM/YYYY") return;
        const [day, month, year] = val.split("/");
        const selected = new Date(Number(year), Number(month) - 1, Number(day));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected <= today) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a future date";
        } else {
          e.target.setInvalid(false);
        }
      });

      const radioTwo = document.getElementById("custom-validation__radio-two-novalidate");
      radioTwo.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a gender";
        } else {
          e.target.setInvalid(false);
        }
      });
      const checkboxGroupTwo = document.getElementById("custom-validation__checkbox-two-novalidate");
      checkboxGroupTwo.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select at least one interest";
        } else {
          e.target.setInvalid(false);
        }
      });
    </script>
  `;
};

export const DisableThroughForm = {
  render: DisableValidationByFormTemplate.bind({}),
  name: "Form novalidate attribute",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const DisableThroughInput = {
  render: DisableValidationByInputTemplate.bind({}),
  name: "Component noValidate property",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
