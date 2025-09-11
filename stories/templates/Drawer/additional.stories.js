import { html } from "lit-html";

const PlacementTemplate = () => {
  return html`
    <sgds-button @click=${() => showDrawer("start")}>Open Start Drawer</sgds-button>
    <sgds-button @click=${() => showDrawer("end")}>Open End Drawer</sgds-button>
    <sgds-button @click=${() => showDrawer("top")}>Open Top Drawer</sgds-button>
    <sgds-button @click=${() => showDrawer("bottom")}>Open Bottom Drawer</sgds-button>
    <sgds-drawer id="drawer_placement">
      <h2 slot="title">Title</h2>
      <p slot="description">Description</p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dictum est vitae erat molestie blandit.
      Pellentesque at nunc at mi auctor imperdiet eu at leo. Integer aliquam, turpis vel ultricies ornare, sem massa
      commodo velit, pretium dictum quam nibh et ex. Suspendisse eu dignissim libero. Donec aliquam, lacus eu
      pellentesque interdum, arcu nisl blandit turpis, at tincidunt purus orci ut dolor. Morbi malesuada faucibus lorem,
      ornare accumsan sapien lacinia vel. In enim justo, hendrerit eu mi vitae, viverra fringilla nunc. Proin semper
      nunc a mollis faucibus. Nam at arcu non justo congue tincidunt. Donec vehicula felis risus, et lobortis lacus
      fringilla eu. Proin faucibus, nisi non semper elementum, sapien nisi viverra urna, id tempus augue felis ac nibh.
      Nullam pulvinar magna eros. Vestibulum at orci elit. Sed convallis fermentum gravida. Etiam suscipit nisi eget
      porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis tellus. Maecenas
      ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida, congue sapien eu, rhoncus
      ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis nulla. Suspendisse potenti. Nulla
      hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in volutpat. Vivamus at facilisis ipsum, eu
      consequat ex. Integer ante ligula, mollis at diam in, tincidunt tincidunt orci. Mauris eu rutrum purus, eget
      consectetur massa. Pellentesque sed euismod dolor, vel ornare orci. Proin tincidunt gravida lorem. Duis vehicula,
      turpis quis placerat pharetra, lacus tortor fermentum tortor, a tincidunt mi arcu quis risus. Duis id ultrices
      urna, non placerat ex.
      <div slot="footer">
        <sgds-button>Button</sgds-button>
      </div>
    </sgds-drawer>
  `;
};

const showDrawer = placement => {
  const drawer = document.querySelector("#drawer_placement");
  drawer.setAttribute("placement", placement);
  drawer.show();
};

export const Placement = {
  render: PlacementTemplate.bind({}),
  name: "Placement",
  args: {},
  parameters: {
    docs: {
      story: {
        height: "500px"
      }
    }
  },
  tags: ["!dev"]
};

const SizeTemplate = () => {
  return html`
    <sgds-button @click=${() => showDrawerSize("sm")}>Open Small Drawer</sgds-button>
    <sgds-button @click=${() => showDrawerSize("md")}>Open Medium Drawer</sgds-button>
    <sgds-button @click=${() => showDrawerSize("lg")}>Open Large Drawer</sgds-button>

    <sgds-drawer id="drawer_size">
      <h2 slot="title">Size Example</h2>
      <p slot="description">This demonstrates drawer size options.</p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dictum est vitae erat molestie blandit.
      Pellentesque at nunc at mi auctor imperdiet eu at leo. Integer aliquam, turpis vel ultricies ornare, sem massa
      commodo velit, pretium dictum quam nibh et ex. Suspendisse eu dignissim libero. Donec aliquam, lacus eu
      pellentesque interdum, arcu nisl blandit turpis, at tincidunt purus orci ut dolor. Morbi malesuada faucibus lorem,
      ornare accumsan sapien lacinia vel. In enim justo, hendrerit eu mi vitae, viverra fringilla nunc. Proin semper
      nunc a mollis faucibus. Nam at arcu non justo congue tincidunt. Donec vehicula felis risus, et lobortis lacus
      fringilla eu. Proin faucibus, nisi non semper elementum, sapien nisi viverra urna, id tempus augue felis ac nibh.
      Nullam pulvinar magna eros. Vestibulum at orci elit. Sed convallis fermentum gravida. Etiam suscipit nisi eget
      porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis tellus. Maecenas
      ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida, congue sapien eu, rhoncus
      ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis nulla. Suspendisse potenti. Nulla
      hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in volutpat. Vivamus at facilisis ipsum, eu
      consequat ex. Integer ante ligula, mollis at diam in, tincidunt tincidunt orci. Mauris eu rutrum purus, eget
      consectetur massa. Pellentesque sed euismod dolor, vel ornare orci. Proin tincidunt gravida lorem. Duis vehicula,
      turpis quis placerat pharetra, lacus tortor fermentum tortor, a tincidunt mi arcu quis risus. Duis id ultrices
      urna, non placerat ex.
      <div slot="footer">
        <sgds-button>Button</sgds-button>
      </div>
    </sgds-drawer>
  `;
};

const showDrawerSize = size => {
  const drawer = document.querySelector("#drawer_size");
  drawer.setAttribute("size", size);
  drawer.show();
};

export const Sizes = {
  render: SizeTemplate.bind({}),
  name: "Size",
  args: {},
  parameters: {
    docs: {
      story: {
        height: "500px"
      }
    }
  },
  tags: ["!dev"]
};
