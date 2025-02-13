import { html } from "lit-html";

export const Template = ({ active, activeSNL, activeSNIAsLink, disabledSNL, disabledSNI, sticky }) => {
  return html`
    <sgds-sidenav ?sticky=${sticky}>
      <sgds-sidenav-item ?active=${active} ?disabled=${disabledSNI}>
          <span slot="title">SideNavItem L1 label (menu) </span>
          <sgds-sidenav-link
            ?active=${activeSNL}
            ?disabled=${disabledSNL}
            ><a href="#">SidenavLink L2 label</a></sgds-sidenav-link
          >
          <sgds-sidenav-link> 
            <a href="#">SidenavLink L2 label</a>
          </sgds-sidenav-link>
          <sgds-sidenav-link>
            <a href="#">SidenavLink L2 label</a>
          </sgds-sidenav-link>
          <sgds-sidenav-item>
            <span slot="title">
            SidenavItem L2 label
            </span>
            <sgds-sidenav-link>
              <a href="#"> SidenavLink L3 label</a>
            </sgds-sidenav-link>
            <sgds-sidenav-link>
              <a href="#">SidenavLink L3 label</a>
            </sgds-sidenav-link>
          </sgds-sidenav-item>
      </sgds-sidenav-item>
      <sgds-sidenav-item>
        <span slot="title">SideNavItem L1 label (menu)</span>
        <sgds-sidenav-link> 
            <a href="#">SidenavLink L2 label</a>
          <sgds-sidenav-link>
            <a href="#">SidenavLink L2 label</a>
          </sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item ?active=${activeSNIAsLink}>
        <a href="#">SidenavItem L1 label (link)</a>
      </sgds-sidenav-item>
    </sgds-sidenav>
  `;
};

export const args = {};

export const parameters = {};
