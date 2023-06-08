import { html } from "lit-html";

export const Template = ({ noFlip, menuAlignRight, drop, popperOpts, close, menuIsOpen, dropdownDisabled }) =>
  html`
    <sgds-datepicker
      .noFlip=${noFlip}
      .drop=${drop}
      .menuAlignRight=${menuAlignRight}
      .close=${close}
      .menuIsOpen=${menuIsOpen}
      .disabled=${dropdownDisabled}
    >
    </sgds-datepicker>
  `;
export const args = {};
