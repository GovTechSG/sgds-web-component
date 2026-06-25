import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { userEvent } from "@storybook/test";

export const Template = ({
  noFlip,
  menuAlignRight,
  drop,
  floatingOpts,
  active,
  href,
  close,
  menuIsOpen,
  disabled,
  target
}) => {
  return html`
    <sgds-dropdown
      ?noFlip=${noFlip}
      drop=${ifDefined(drop)}
      ?menuAlignRight=${menuAlignRight}
      floatingOpts=${ifDefined(floatingOpts)}
      close=${ifDefined(close)}
      ?menuIsOpen=${menuIsOpen}
      ?disabled=${disabled}
    >
      <sgds-button slot="toggler" variant="primary" tone="brand" ariaLabel="Dropdown">
        Dropdown
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item ariaLabel="item #1" ?disabled=${disabled} ?active=${active} target=${ifDefined(target)}>
        <a href=${ifDefined(href)}>item #1 (argsTable controlled) </a>
      </sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #2"><a href="https://google.com">item #2</a></sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #3" disabled>item #3</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #4">item #4</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #5">item #5</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #6">item #6</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #7">item #7</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #8">item #8</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #9">item #9</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #10">item #10</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="item #11">item #11</sgds-dropdown-item>
    </sgds-dropdown>
  `;
};

export const args = {
  href: "#"
};

export const parameters = {};

export const play = async ({ canvasElement }) => {
  const toggler = canvasElement.querySelector("sgds-button");
  const trigger = toggler.shadowRoot.querySelector("button");
  await userEvent.click(trigger);
};
