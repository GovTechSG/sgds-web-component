import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <sgds-file-upload
    size=${ifDefined(args.size)}
    variant=${ifDefined(args.variant)}
    disabled=${ifDefined(args.disabled)}
    checkedIcon=${ifDefined(args.checkedIcon)}
    cancelIcon=${ifDefined(args.cancelIcon)}
    accept=${ifDefined(args.accept)}
    multiple=${ifDefined(args.multiple)}
    hintText=${ifDefined(args.hintText)}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-upload me-2"
      viewBox="0 0 16 16"
    >
      <path
        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
      />
      <path
        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
      /></svg
    >Choose a File</sgds-file-upload>
`;

export const args = { variant: "primary" };
export const parameters = {};
