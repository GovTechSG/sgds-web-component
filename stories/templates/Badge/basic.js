import { html } from "lit-html";

export const Template = args =>
  html`
    <sgds-badge .variant=${args.variant} .isLight=${args.isLight} .roundedPill=${args.roundedPill}
      >${args.variant}</sgds-badge
    >
    <sgds-badge .variant=${args.variant} .isLight=${args.isLight} .roundedPill=${args.roundedPill}>
      <i slot="leftIcon" class="bi bi-credit-card-fill"></i>
      leftIcon slot
    </sgds-badge>
    <sgds-badge .variant=${args.variant} .isLight=${args.isLight} .roundedPill=${args.roundedPill}>
      <i slot="rightIcon" class="bi bi-credit-card-fill"></i>
      rightIcon slot
    </sgds-badge>
  `;
export const args = {};
