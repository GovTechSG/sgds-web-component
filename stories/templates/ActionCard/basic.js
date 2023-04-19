import { html } from "lit-html";

export const Template = (args) =>
  html`
    <sgds-action-card
      .active=${args.active}
      .bgColor=${args.bgColor}
      .borderColor=${args.borderColor}
      .textColor=${args.textColor}
      .disabled=${args.disabled}
      .iconName=${args.iconName}
      .type=${args.type}
    >
      <span slot="card-subtitle">${args.cardSubtitleSlot}</span>
      <span slot="card-title">${args.cardTitleSlot}</span>
      <span slot="card-text">${args.cardTextSlot}</span>
    </sgds-action-card>
  `;
