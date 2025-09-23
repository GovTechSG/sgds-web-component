import { html } from "lit-html";

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
    </form>
    <script>
      const input = document.querySelector("sgds-input#custom-validation__input-novalidate");
      input.addEventListener("sgds-input", () => {
        if (!/^[^a-zA-Z0-9]/.test(e.target.value)) {
          input.setInvalid(false);
        } else {
          input.setInvalid(true);
          alert("invalid");
          input.invalidFeedback = "This is an invalid message";
          input.requestUpdate();
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
    </script>
  `;
};

export const DisableThroughForm = {
  render: DisableValidationByFormTemplate.bind({}),
  name: "Disable native validation through form",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const DisableThroughInput = {
  render: DisableValidationByInputTemplate.bind({}),
  name: "Disable native validation through component",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
