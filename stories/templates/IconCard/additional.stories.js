import { html } from "lit-html";

export const Stretched = {
  render: Template.bind({}),
  name: "Stretched Link",
  args: { ...args, stretchedLink: true },
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled State",
  args: { ...args, disabled: true },
  parameters: {},
  tags: ["!dev"]
};

const OrientationTemplate = () =>
  html`
    <div class="container">
      <sgds-icon-card>
        <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <span slot="subtitle">EXPLORE THE FEATURES</span>
        <span slot="title">Innovative Solutions for You</span>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <sgds-icon-list size="sm">
            <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
            <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
          </sgds-icon-list>
        </div>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower" style="display: flex; flex-wrap: wrap; gap: 8px;">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
          <sgds-badge variant="neutral" outlined>Research</sgds-badge>
        </div>
        <sgds-link slot="link">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-icon-card>
      <sgds-icon-card orientation="horizontal">
        <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <span slot="subtitle">EXPLORE THE FEATURES</span>
        <span slot="title">Innovative Solutions for You</span>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <sgds-icon-list size="sm">
            <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
            <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
          </sgds-icon-list>
        </div>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower" style="display: flex; flex-wrap: wrap; gap: 8px;">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
          <sgds-badge variant="neutral" outlined>Research</sgds-badge>
        </div>
        <sgds-link slot="link">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-icon-card>
    </div>
  `;

export const Orientation = {
  render: OrientationTemplate.bind({}),
  name: "Orientation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const HideBorder = {
  render: Template.bind({}),
  name: "Hide Border",
  args: { ...args, hideBorder: true },
  parameters: {},
  tags: ["!dev"]
};

export const Tinted = {
  render: Template.bind({}),
  name: "Tinted",
  args: { ...args, tinted: true },
  parameters: {},
  tags: ["!dev"]
};

const NoPaddingTemplate = () =>
  html`
    <div class="container">
      <sgds-icon-card noPadding>
        <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <span slot="subtitle">EXPLORE THE FEATURES</span>
        <span slot="title">Innovative Solutions for You</span>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <sgds-icon-list size="sm">
            <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
            <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
          </sgds-icon-list>
        </div>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower" style="display: flex; flex-wrap: wrap; gap: 8px;">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
          <sgds-badge variant="neutral" outlined>Research</sgds-badge>
        </div>
        <sgds-link slot="link">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-icon-card>
      <sgds-icon-card orientation="horizontal" noPadding>
        <sgds-icon slot="icon" name="box-seam" size="3-xl"></sgds-icon>
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <span slot="subtitle">EXPLORE THE FEATURES</span>
        <span slot="title">Innovative Solutions for You</span>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <sgds-icon-list size="sm">
            <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
            <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
          </sgds-icon-list>
        </div>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower" style="display: flex; flex-wrap: wrap; gap: 8px;">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
          <sgds-badge variant="neutral" outlined>Research</sgds-badge>
        </div>
        <sgds-link slot="link">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-icon-card>
    </div>
  `;

export const NoPadding = {
  render: NoPaddingTemplate.bind({}),
  name: "No Padding",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
