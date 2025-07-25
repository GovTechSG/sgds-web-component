import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-input
      type=${ifDefined(args.type)}
      label=${ifDefined(args.label)}
      hintText=${ifDefined(args.hintText)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      pattern=${ifDefined(args.pattern)}
      invalidFeedback=${ifDefined(args.invalidFeedback)}
      ?disabled=${args.disabled}
      placeholder=${ifDefined(args.placeholder)}
      ?autofocus=${args.autofocus}
      ?required=${args.required}
      ?readonly=${args.readonly}
      minlength=${ifDefined(args.minlength)}
      maxlength=${ifDefined(args.maxlength)}
      ?hasFeedback=${args.hasFeedback}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      step=${ifDefined(args.step)}
      ?invalid=${args.invalid}
      ?valid=${args.valid}
      ?loading=${args.loading}
      prefix=${ifDefined(args.prefix)}
      suffix=${ifDefined(args.suffix)}
    >
    </sgds-input>
  `;

export const args = {
  type: "text",
  hintText: "Hint text",
  placeholder: "Placeholder text",
  name: "email",
  label: "Label"
};

export const parameters = {};
