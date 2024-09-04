import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-textarea
      label=${ifDefined(args.label)}
      name=${ifDefined(args.name)}
      value=${ifDefined(args.value)}
      rows=${ifDefined(args.rows)}
      invalidFeedback=${ifDefined(args.invalidFeedback)}
      ?invlaid=${ifDefined(args.invalidFeedback)}
      placeholder=${ifDefined(args.placeholder)}
      ?autofocus=${args.autofocus}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?readonly=${args.readonly}
      minlength=${ifDefined(args.minlength)}
      maxlength=${ifDefined(args.maxlength)}
      ?spellcheck=${args.spellcheck}
      autocorrect=${ifDefined(args.autocorrect)}
      resize=${ifDefined(args.resize)}
      ?hasFeedback=${args.hasFeedback}
      defaultValue=${ifDefined(args.defaultValue)}
      inputmode=${ifDefined(args.inputmode)}
    >
    </sgds-textarea>
  `;

export const args = { name: "textarea", label: "Label", maxlength: 100 };
export const parameters = {};
