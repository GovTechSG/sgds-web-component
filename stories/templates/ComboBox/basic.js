import { html } from "lit-html";

export const Template = ({
    label,
    hintText,
    name,
    placeholder,
    autofocus,
    disabled,
    required,
    readonly,
    value,
    menuList,
    popperOpts,
    menuIsOpen,
    close,
}) => {
    return html`
      <sgds-combo-box
        label=${label}
        hintText=${hintText}
        name=${name}
        placeholder=${placeholder}
        ?autofocus=${autofocus}
        ?disabled=${disabled}
        ?required=${required}
        ?readonly=${readonly}
        value=${value}
        .menuList=${menuList}
        .popperOpts=${popperOpts}
        ?menuIsOpen=${menuIsOpen}
        close=${close}
      >
      </sgds-combo-box>
    `;
  };


export const args = {
    label: "Items",
    placeholder: "ComboBox",
    menuList: ['Item #1', 'Item #2', 'Item #3']
};
