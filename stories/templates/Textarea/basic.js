import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-textarea
      label=${args.label}
      name=${args.name}
      textareaClasses=${args.textareaClasses}
      .value=${args.value}
      rows=${args.rows}
      invalidFeedback=${args.invalidFeedback}
      placeholder=${args.placeholder}
      ?autofocus=${args.autofocus}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?readonly=${args.readonly}
      minlength=${args.minlength}
      maxlength=${args.maxlength}
      ?spellcheck=${args.spellcheck}
      ?autocorrect=${args.autocorrect}
      resize=${args.resize}
      ?hasFeedback=${args.hasFeedback}
      defaultValue=${args.defaultValue}
    >
    </sgds-textarea>
  `;

export const args = { name: "textarea", label: "Label", maxlength: 100 };
