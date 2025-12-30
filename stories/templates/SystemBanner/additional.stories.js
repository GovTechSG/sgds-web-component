import { html } from "lit";

const ShowMoreHookTemplate = args => {
  return html`
    <sgds-system-banner show id="system-banner__show-more-example" dismissible>
      <sgds-system-banner-item>
        <div>
          <strong>Etiam suscipit nisi eget porta cursus.</strong> Ut sit amet felis aliquet, pellentesque mi at,
          vulputate nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula
          arcu. Aenean quis leo gravida, congue sapien eu, rhoncus ac libero scelerisque tellus maximus accumsan a
          vehicula arcu. Aenean quis leo gravida, congue sapien eu, rhoncus
        </div>
        <sgds-link size="sm" variant="light" slot="action"
          ><a href="#">Action link<sgds-icon name="arrow-right"></sgds-icon></a
        ></sgds-link>
      </sgds-system-banner-item>
    </sgds-system-banner>
    <sgds-modal>
      <div>
        <strong>Etiam suscipit nisi eget porta cursus.</strong> Ut sit amet felis aliquet, pellentesque mi at, vulputate
        nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu.
        Aenean quis leo gravida, congue sapien eu, rhoncus ac libero scelerisque tellus maximus accumsan a vehicula
        arcu. Aenean quis leo gravida, congue sapien eu, rhoncus
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
