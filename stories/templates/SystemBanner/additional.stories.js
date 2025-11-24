import { html } from "lit-html";

const VariantTemplate = args => {
  const variants = [
    { variant: "Info", icon: "info-circle-fill" },
    { variant: "Danger", icon: "exclamation-circle-fill" },
    { variant: "Warning", icon: "exclamation-triangle-fill" },
    { variant: "Neutral", icon: "info-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(
        v => html`
        <sgds-system-banner variant=${v.variant.toLowerCase()} show>
         <sgds-system-banner-item>
            <sgds-icon slot="icon" name="placeholder"></sgds-icon>
            <div>
            <strong>Etiam suscipit nisi eget porta cursus.</strong> Ut sit amet felis aliquet
            </div>
            <a href="#" slot="action">Action</a>
        </sgds-system-banner-item>
        </sgds-system-banner>
    </div>    
        `
      )}
    </div>
  `;
};

const ShowMoreHookTemplate = args => {
  return html`
    <sgds-system-banner show id="system-banner__show-more-example" dismissible>
      <sgds-system-banner-item>
        <div>
          <strong>Etiam suscipit nisi eget porta cursus.</strong> Ut sit amet felis aliquet, pellentesque mi at,
          vulputate nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula
          arcu. Aenean quis leo gravida, congue sapien eu, rhoncus
        </div>
        <a href="#" slot="action">Action</a>
      </sgds-system-banner-item>
    </sgds-system-banner>
    <sgds-modal>
      <div>
        <strong>Etiam suscipit nisi eget porta cursus.</strong> Ut sit amet felis aliquet, pellentesque mi at, vulputate
        nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu.
        Aenean quis leo gravida, congue sapien eu, rhoncus
      </div>
    </sgds-modal>

    <script>
      const banner = document.querySelector("#system-banner__show-more-example");
      const modal = document.querySelector("sgds-modal");
      banner.addEventListener("sgds-show-more", () => {
        modal.show();
      });
    </script>
  `;
};

export const Variants = {
  render: VariantTemplate.bind({}),
  name: "Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const Dismissible = {
  render: Template.bind({}),
  name: "Dismissible",
  args: {
    dismissible: true,
    show: true
  },
  parameters: {},
  tags: ["!dev"]
};

export const ShowMore = {
  render: ShowMoreHookTemplate.bind({}),
  name: "Show More",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
