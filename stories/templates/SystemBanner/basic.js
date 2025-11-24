import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`<sgds-system-banner
  ?dismissible=${args.dismissible}
  ?show=${args.show}
  variant=${ifDefined(args.variant)}
>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
    <div>
      Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
      facilisis tellus.
    </div>
    <sgds-link size="sm" variant="light" slot="action"
      ><a href="#">Action link<sgds-icon name="arrow-right"></sgds-icon></a
    ></sgds-link>
  </sgds-system-banner-item>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
    <div>
      Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
      facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
      congue sapien eu, rhoncus
    </div>
    <sgds-button href="#" slot="action" size="sm" tone="fixed-light" variant="outline">
      Action button
      <sgds-icon name="arrow-right" slot="rightIcon" size="md"></sgds-icon>
    </sgds-button>
  </sgds-system-banner-item>
  <sgds-system-banner-item>
    <sgds-icon slot="icon" name="placeholder" size="md"></sgds-icon>
    <div>
      Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac
      facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
      congue sapien eu, rhoncus
    </div>
    <sgds-link size="sm" variant="light" slot="action"
      ><a href="#">Action link<sgds-icon name="arrow-right"></sgds-icon></a
    ></sgds-link>
  </sgds-system-banner-item>
</sgds-system-banner>`;

export const args = {
  show: true
};

export const parameters = {};
