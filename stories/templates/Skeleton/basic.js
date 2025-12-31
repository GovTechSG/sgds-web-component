import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <div class="d-flex-row">
    <sgds-skeleton
      width=${ifDefined(args.width)}
      height=${ifDefined(args.height)}
      borderRadius=${ifDefined(args.borderRadius)}
      ?sheen=${args.sheen}
    ></sgds-skeleton>
    <sgds-skeleton width="96px" height="96px"></sgds-skeleton>
    <sgds-skeleton width="96px" height="96px" borderRadius="50%"></sgds-skeleton>
    <sgds-skeleton width="200px" height="20px" borderRadius="4px"></sgds-skeleton>
  </div>
`;

export const args = {
  width: "128px",
  height: "64px",
  borderRadius: "4px"
};

export const parameters = {};
