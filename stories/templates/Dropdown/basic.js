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
  close,
  menuIsOpen,
  disabled,
  target
}) => {
  return html`
    <sgds-dropdown
      togglerText=${togglerText}
      ?noFlip=${noFlip}
      drop=${drop}
      ?menuAlignRight=${menuAlignRight}
      .popperOpts=${popperOpts}
      variant=${variant}
      close=${close}
      ?menuIsOpen=${menuIsOpen}
      ?disabled=${disabled}
    >
      <sgds-dropdown-item href=${href} ?active=${active} target=${target}
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

export const parameters = {
  layout: "centered"
};
