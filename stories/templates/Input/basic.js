import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-input
      type=${args.type}
      label=${args.label}
      hintText=${args.hintText}
      name=${args.name}
      inputId=${args.inputId}
      inputClasses=${args.inputClasses}
      .value=${args.value}
      pattern=${args.pattern}
      invalidFeedback=${args.invalidFeedback}
      icon=${args.icon}
      placeholder=${args.placeholder}
      ?autofocus=${args.autofocus}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?readonly=${args.readonly}
      minlength=${args.minlength}
      maxlength=${args.maxlength}
      ?hasFeedback=${args.hasFeedback}
    >
    </sgds-input>
  `;

export const args = {
  type: "text",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
</svg>`,
  hintText: "This is a hint text",
  placeholder: "Placeholder",
  name: "email",
  label: "Label"
};
