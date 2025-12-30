import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-button @click=${showModal} style="margin:30px;">Open Modal</sgds-button>
    <sgds-modal
      ?open=${args.open}
      ?noAnimation=${args.noAnimation}
      size=${ifDefined(args.size)}
      ?noCloseButton=${args.noCloseButton}
    >
      <h2 slot="title">Modal title</h2>
      <p slot="description">Modal description</p>
      <p>
        Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
        facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
        gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
        nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in
      </p>
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

export const args = {};

export const parameters = {
  layout: "fullscreen",
  docs: {
    story: {
      height: "700px"
    }
  }
};
