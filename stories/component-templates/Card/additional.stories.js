import { html } from "lit";

const StretchedTemplate = () => {
  return html`
    <div class="container">
      <sgds-card stretchedLink>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Stretched link card</h3>
        <span slot="description">stretched link card</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;
};

export const Stretched = {
  render: StretchedTemplate.bind({}),
  name: "Stretched link",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const DisabledTemplate = () => {
  return html`
    <div class="container">
      <sgds-card disabled>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Disabled card</h3>
        <span slot="description">disabled card</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;
};

export const Disabled = {
  render: DisabledTemplate.bind({}),
  name: "Disabled state",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const OrientationTemplate = () => {
  return html`
    <div class="container">
      <sgds-card orientation="vertical">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="horizontal">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Horizontal image card</h3>
        <span slot="description">horizontal card</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;
};

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
      <sgds-card orientation="vertical" imagePosition="before">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with image position set to before the content</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="vertical" imagePosition="after">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with image position set to after the content</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="horizontal" imagePosition="before">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Horizontal image card</h3>
        <span slot="description">horizontal card with image position set to before the content</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="horizontal" imagePosition="after">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Horizontal image card</h3>
        <span slot="description">horizontal card with image position set to after the content</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;
};

export const ImagePosition = {
  render: ImagePositionTemplate.bind({}),
  name: "Image position",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const ImageAdjustmentTemplate = () => {
  return html`
    <div class="container">
      <sgds-card orientation="vertical" imageAdjustment="default">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with image adjustment set to default</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="vertical" imageAdjustment="padding around">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with image adjustment set to padding around</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="vertical" imageAdjustment="aspect ratio">
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with image adjustment set to aspect ratio</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;
};

export const ImageAdjustment = {
  render: ImageAdjustmentTemplate.bind({}),
  name: "Image adjustment",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const HideBorderTemplate = () => {
  return html`
    <div class="container">
      <sgds-card hideBorder>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with no border</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card hideBorder>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with no border</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="horizontal" hideBorder>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Horizontal image card</h3>
        <span slot="description">horizontal card with no border</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
      <sgds-card orientation="horizontal" hideBorder>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="300"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Horizontal image card</h3>
        <span slot="description">horizontal card with no border</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;
};

export const HideBorder = {
  render: HideBorderTemplate.bind({}),
  name: "Hide border",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const TintedTemplate = () => {
  return html`
    <div class="container">
      <sgds-card tinted>
        <img
          slot="image"
          alt="img alternate text goes here"
          width="467"
          height="312"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="subtitle">SUBTITLE</span>
        <h3 slot="title">Vertical image card</h3>
        <span slot="description">vertical card with tinted background</span>
        <sgds-link slot="footer">
          <a href="https://google.com">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
        </sgds-link>
      </sgds-card>
    </div>
  `;
};

export const Tinted = {
  render: TintedTemplate.bind({}),
  name: "Tinted",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const OverflowMenuTemplate = () => {
  return html`
    <div class="container">
      <sgds-card>
        <sgds-badge variant="primary" slot="upper">New</sgds-badge>
        <sgds-overflow-menu slot="menu">
          <sgds-dropdown-item>View</sgds-dropdown-item>
          <sgds-dropdown-item>Edit</sgds-dropdown-item>
          <sgds-dropdown-item>Delete</sgds-dropdown-item>
        </sgds-overflow-menu>
        <span slot="subtitle">EVENTS</span>
        <span slot="title">Innovative solutions for you</span>
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
      </sgds-card>
    </div>
  `;
};

export const OverflowMenu = {
  render: OverflowMenuTemplate.bind({}),
  name: "Overflow menu",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
