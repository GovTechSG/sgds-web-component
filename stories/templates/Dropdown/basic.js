import { html } from "lit-html";

export const Template = ({
  noFlip,
  menuAlignRight,
  drop,
  popperOpts,
  togglerText,
  variant,
  active,
  href,
  disabledDI,
  close,
  menuIsOpen,
  dropdownDisabled
}) => {
  return html`
    <sgds-dropdown
      .togglerText=${togglerText}
      .noFlip=${noFlip}
      .drop=${drop}
      .menuAlignRight=${menuAlignRight}
      .popperOpts=${popperOpts}
      .variant=${variant}
      .close=${close}
      .menuIsOpen=${menuIsOpen}
      .disabled=${dropdownDisabled}
    >
      <sgds-dropdown-item .href=${href} .active=${active} .disabled=${disabledDI}
        >item #1 (argsTable controlled)</sgds-dropdown-item
      >
      <sgds-dropdown-item href="https://google.com">item #2</sgds-dropdown-item>
      <sgds-dropdown-item href="#" disabled>item #3</sgds-dropdown-item>
    </sgds-dropdown>
  `;
};

export const args = {
  togglerText: "Dropdown",
  variant: "secondary",
  href: "#"
};
