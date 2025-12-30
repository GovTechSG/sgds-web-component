import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-button @click=${showDrawer}>Open ${args.placement} Drawer</sgds-button>
    <sgds-drawer
      ?open=${args.open}
      size=${args.size}
      placement=${ifDefined(args.placement)}
      ?contained=${args.contained}
    >
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

export const showDrawer = () => {
  const drawer = document.querySelector("sgds-drawer");
  drawer.show();
};
export const closeDrawer = () => {
  const drawer = document.querySelector("sgds-drawer");
  drawer.hide();
};

export const args = {};

export const parameters = {
  docs: {
    story: {
      height: "500px"
    }
  }
};
