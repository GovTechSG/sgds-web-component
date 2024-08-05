import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

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
      togglerText=${ifDefined(togglerText)}
      noFlip=${ifDefined(noFlip)}
      drop=${ifDefined(drop)}
      menuAlignRight=${ifDefined(menuAlignRight)}
      popperOpts=${ifDefined(popperOpts)}
      variant=${ifDefined(variant)}
      close=${ifDefined(close)}
      menuIsOpen=${ifDefined(menuIsOpen)}
      disabled=${ifDefined(disabled)}
    >
      <sgds-dropdown-item href=${ifDefined(href)} disabled=${ifDefined(disabled)} active=${ifDefined(active)} target=${ifDefined(target)}
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
