import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`<sgds-system-banner
  ?dismissible=${args.dismissible}
  ?show=${args.show}
  variant=${ifDefined(args.variant)}
>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="placeholder"></sgds-icon>
    <div>
      Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
      facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
      congue sapien eu, rhoncus Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at,
      vulputate nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula
      arcu. Aenean quis leo gravida, congue sapien eu, rhoncu
    </div>
    <a href="#" slot="action">Action</a>
  </sgds-system-banner-item>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="placeholder"></sgds-icon>
    <div>
      Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
      facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
      congue sapien eu, rhoncus
    </div>
    <a href="#" slot="action">Action</a>
  </sgds-system-banner-item>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="placeholder"></sgds-icon>
    <div>
      Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
      facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
      congue sapien eu, rhoncus
    </div>
    <a href="#" slot="action">Action</a>
  </sgds-system-banner-item>
</sgds-system-banner>`;

export const args = {
  show: true
};

export const parameters = {};
