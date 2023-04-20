import { html } from 'lit-html';

export const Template = args =>
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
      <span slot="card-subtitle">Laptop</span>
      <span slot="card-title">Apple</span>
      <span slot="card-text">Macbook Pro M1</span>
    </sgds-action-card>
  `;

export const args = {};
