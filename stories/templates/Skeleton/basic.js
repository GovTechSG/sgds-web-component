import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <div style="display:flex;gap:0.5rem;">
    <sgds-skeleton
      width=${ifDefined(args.width)}
      height=${ifDefined(args.height)}
      borderRadius=${ifDefined(args.borderRadius)}
      ?sheen=${args.sheen}
    ></sgds-skeleton>
    <sgds-skeleton width="96px" height="96px" borderRadius="4px"></sgds-skeleton>
    <sgds-skeleton width="96px" height="96px" borderRadius="50%"></sgds-skeleton>
  </div>
`;

export const args = {
  width: "128px",
  height: "64px",
  borderRadius: "4px"
};

export const parameters = {};
