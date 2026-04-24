import { html } from "lit";

export default {
  title: "Form/Custom Validation"
};
const handleInput = e => {};

const DisableValidationByInputTemplate = args => {
  return html`
    <form id="custom-validation-form" class="d-flex-column">
      <sgds-input
        noValidate
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
        label="Bio"
        hinttext="Must be at least 10 characters long"
        name="textarea-bio"
        hasFeedback
        placeholder="Enter bio"
        id="custom-validation__textarea-novalidate"
      >
      </sgds-textarea>
      <sgds-file-upload
        noValidate
        label="Documents"
        hinttext="Max 2 PDF files"
        name="documents"
        hasFeedback
        required
        multiple
        accept=".pdf"
        id="custom-validation__file-upload-novalidate"
      >
        Choose Files
      </sgds-file-upload>
    </form>
    <script>
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
    </script>
  `;
};
const DisableValidationByFormTemplate = args => {
  return html`
    <form id="custom-validation-form_novalidate" class="d-flex-column" novalidate>
      <sgds-input
        label="Keys"
        hinttext="Keys cannot start with special characters like @, #, $"
        name="input-keys"
        hasFeedback="both"
        placeholder="Placeholder"
        id="custom-validation__input-two-novalidate"
      >
      </sgds-input>
      <sgds-textarea
        label="Notes"
        hinttext="Custom validation: minimum 5 characters"
        name="textarea-notes"
        hasFeedback
        placeholder="Enter notes"
        id="custom-validation__textarea-two-novalidate"
      >
      </sgds-textarea>
      <sgds-file-upload
        label="Documents"
        hinttext="Max 2 PDF files"
        name="documents"
        hasFeedback
        required
        multiple
        accept=".pdf"
        id="custom-validation__file-upload-two-novalidate"
      >
        Choose Files
      </sgds-file-upload>
    </form>
    <script>
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
