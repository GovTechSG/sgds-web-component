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
      <sgds-combo-box
        noValidate
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
      <sgds-button type="submit">Submit</sgds-button>
    </form>
    <script>
      const formOne = document.getElementById("custom-validation-form");
      formOne.addEventListener("submit", e => {
        e.preventDefault();
        alert("Submitted");
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
      <sgds-combo-box
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
      <sgds-button type="submit">Submit</sgds-button>
    </form>
    <script>
      const formTwo = document.getElementById("custom-validation-form_novalidate");
      formTwo.addEventListener("submit", e => {
        e.preventDefault();
        alert("Submitted");
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

