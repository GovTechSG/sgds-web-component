import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-button @click=${showModal}>Open Modal</sgds-button>
    <sgds-modal
      open=${ifDefined(args.open)}
      title=${ifDefined(args.title)}
      titleIcon=${ifDefined(args.titleIcon)}
      noHeader=${ifDefined(args.noHeader)}
      centered=${ifDefined(args.centered)}
      centeredAlignVariant=${ifDefined(args.centeredAlignVariant)}
      noAnimation=${ifDefined(args.noAnimation)}
    >
      This is a Modal
      <sgds-button @click=${closeModal} slot="footer" variant="link" class="close-modal">Close</sgds-button>
      <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-modal>
  `;
};

export const showModal = () => {
  const modal = document.querySelector("sgds-modal");
  modal.show();
};
export const closeModal = () => {
  const modal = document.querySelector("sgds-modal");
  modal.hide();
};

export const args = {
  titleIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-amd" viewBox="0 0 16 16">
  <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0H.334ZM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2V9.72Z"/>
</svg>`,
  title: "hello"
};

export const parameters = {};
