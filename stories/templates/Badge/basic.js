import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args =>
  html`
    <sgds-badge variant=${ifDefined(args.variant)} outlined=${ifDefined(args.outlined)} roundedPill=${ifDefined(args.roundedPill)}
      >${args.variant}</sgds-badge
    >
    <sgds-badge variant=${ifDefined(args.variant)} outlined=${ifDefined(args.outlined)} roundedPill=${ifDefined(args.roundedPill)}>
      <i slot="leftIcon" class="bi bi-credit-card-fill"></i>
      leftIcon slot
    </sgds-badge>
    <sgds-badge variant=${ifDefined(args.variant)} outlined=${ifDefined(args.outlined)} roundedPill=${ifDefined(args.roundedPill)}>
      <i slot="rightIcon" class="bi bi-credit-card-fill"></i>
      rightIcon slot
    </sgds-badge>
  `;
export const args = {
  variant: "primary"
};

export const parameters = {};
