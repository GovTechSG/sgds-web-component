import { html } from 'lit-html';

export const Template = args =>
  html`
    <sgds-input
      .type=${args.type}
      .label=${args.label}
      .hintText=${args.hintText}
      .name=${args.name}
      .id=${args.inputID}
      .inputClasses=${args.inputClasses}
      .value=${args.value}
      .pattern=${args.pattern}
      .invalidFeedback=${args.invalidFeedback}
      .iconName=${args.iconName}
      .placeholder=${args.placeholder}
      ?autofocus=${args.autofocus}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?minlength=${args.minlength}
      ?maxlength=${args.maxlength}
    >
    </sgds-input>
  `;

export const args = { type: 'text' };
