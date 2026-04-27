import { html } from "lit";

const ShowMoreHookTemplate = args => {
  return html`
    <sgds-system-banner show id="system-banner__show-more-example" dismissible>
      <sgds-system-banner-item>
        <strong>Etiam suscipit nisi eget porta cursus.</strong> Ut sit amet felis aliquet, pellentesque mi at, vulputate
        nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu.
        Aenean quis leo gravida, congue sapien eu, rhoncus ac libero scelerisque tellus maximus accumsan a vehicula
        arcu. Aenean quis leo gravida, congue sapien eu, rhoncus
        <sgds-link size="sm" variant="light" slot="action"
          ><a href="#">Action link<sgds-icon name="arrow-right"></sgds-icon></a
        ></sgds-link>
      </sgds-system-banner-item>
    </sgds-system-banner>
    <sgds-modal>
      <strong>Etiam suscipit nisi eget porta cursus.</strong> Ut sit amet felis aliquet, pellentesque mi at, vulputate
      nunc. Vivamus ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean
      quis leo gravida, congue sapien eu, rhoncus ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean
      quis leo gravida, congue sapien eu, rhoncus
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
  parameters,
  tags: ["!dev"]
};

export const ShowMore = {
  render: ShowMoreHookTemplate.bind({}),
  name: "Show More",
  args: {},
  parameters,
  tags: ["!dev"]
};

export const NoClampAction = {
  render: Template.bind({}),
  name: "No Clamp Action",
  args: {
    show: true,
    noClampAction: true
  },
  parameters,
  tags: ["!dev"]
};
export const Fluid = {
  render: Template.bind({}),
  name: "Fluid",
  args: {
    fluid: true,
    show: true
  },
  parameters,
  tags: []
};

const BadgeSlotTemplate = args => {
  return html`
    <sgds-system-banner show>
      <sgds-system-banner-item>
        <sgds-badge slot="badge" variant="danger" outlined>Critical</sgds-badge>
        <strong>Important system update available.</strong> Review the latest security patches and feature updates for
        your system.
        <sgds-link size="sm" variant="light" slot="action"
          ><a href="#">Learn more<sgds-icon name="arrow-right"></sgds-icon></a
        ></sgds-link>
      </sgds-system-banner-item>
      <sgds-system-banner-item>
        <sgds-badge slot="badge" variant="warning" outlined>Alert</sgds-badge>
        <strong>Scheduled maintenance window.</strong> Services will be temporarily unavailable during the maintenance
        period.
        <sgds-button href="#" slot="action" size="sm" tone="fixed-light" variant="outline">
          View schedule
          <sgds-icon name="arrow-right" slot="rightIcon" size="md"></sgds-icon>
        </sgds-button>
      </sgds-system-banner-item>
    </sgds-system-banner>
  `;
};

export const BadgeSlot = {
  render: BadgeSlotTemplate.bind({}),
  name: "Badge Slot",
  args: {},
  parameters,
  tags: ["!dev"]
};
