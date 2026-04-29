import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <sgds-file-upload
    variant=${ifDefined(args.variant)}
    ?disabled=${args.disabled}
    accept=${ifDefined(args.accept)}
    ?multiple=${args.multiple}
    hintText=${ifDefined(args.hintText)}
    label=${ifDefined(args.label)}
    name=${ifDefined(args.name)}
    ?hasFeedback=${args.hasFeedback}
    ?invalid=${args.invalid}
    invalidFeedback=${ifDefined(args.invalidFeedback)}
    ?required=${args.required}
    >${args.multiple ? "Choose files" : "Choose file"}</sgds-file-upload
  >
`;

export const args = {};
export const parameters = {};

export const play = undefined;
