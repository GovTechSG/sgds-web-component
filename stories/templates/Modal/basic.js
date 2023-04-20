import { html } from 'lit-html';

export const Template = args => {
  return html`
    <sgds-button @click=${showModal}>Open Modal</sgds-button>
    <sgds-modal .open=${args.open} .title=${args.title} .titleIcon=${args.titleIcon}>
      ${args.default}
      <sgds-button @click=${closeModal} slot="footer" variant="link" class="close-modal">Close</sgds-button>
      <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
    </sgds-modal>
  `;
};

export const showModal = () => {
  const modal = document.querySelector('sgds-modal');
  modal.show();
};
export const closeModal = () => {
  const modal = document.querySelector('sgds-modal');
  modal.hide();
};

export const args = {};
