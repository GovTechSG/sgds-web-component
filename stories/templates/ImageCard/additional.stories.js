import { html } from "lit";

const StretchedLinkTemplate = () =>
  html`
    <div class="container">
      <sgds-image-card stretchedLink>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
    </div>
  `;

export const Stretched = {
  render: StretchedLinkTemplate.bind({}),
  name: "Stretched Link",
  args: {},
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
      <sgds-image-card>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
      <sgds-image-card orientation="horizontal">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
    </div>
  `;

export const Orientation = {
  render: OrientationTemplate.bind({}),
  name: "Orientation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ImagePositionTemplate = () => {
  return html`
    <div class="container">
      <sgds-image-card imagePosition="before">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
      <sgds-image-card imagePosition="after">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
      <sgds-image-card orientation="horizontal" imagePosition="before">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
      <sgds-image-card orientation="horizontal" imagePosition="after">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
    </div>
  `;
};

export const ImagePosition = {
  render: ImagePositionTemplate.bind({}),
  name: "Image Position",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ImageAdjustmentTemplate = () => {
  return html`
    <div class="container">
      <sgds-image-card imageAdjustment="default">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
      <sgds-image-card imageAdjustment="padding around">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
      <sgds-image-card imageAdjustment="aspect ratio">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-icon-button name="heart" size="sm" slot="image-action"></sgds-icon-button>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
    </div>
  `;
};

export const ImageAdjustment = {
  render: ImageAdjustmentTemplate.bind({}),
  name: "Image Adjustment",
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
      <sgds-image-card noPadding>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
      <sgds-image-card orientation="horizontal" noPadding>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        />
        <sgds-badge variant="primary" slot="image-badge">New</sgds-badge>
        <sgds-badge variant="primary" slot="upper">Limited seat</sgds-badge>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative Solutions for You</span>
        <sgds-icon-list size="sm">
          <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
          <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
        </sgds-icon-list>
        <span slot="description"
          >Discover how our platform can streamline your workflow and enhance productivity. With cutting-edge technology
          and user-friendly design, we empower you to achieve more.</span
        >
        <div slot="lower">
          <sgds-badge variant="neutral" outlined>Design</sgds-badge>
        </div>
        <sgds-link slot="footer">
          <a href="#">Register now <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-image-card>
    </div>
  `;

export const NoPadding = {
  render: NoPaddingTemplate.bind({}),
  name: "No Padding",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
