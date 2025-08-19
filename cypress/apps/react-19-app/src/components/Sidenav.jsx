

export const Sidenav = () => {
    return (
        <sgds-sidenav>
      <sgds-sidenav-item>
          <span slot="title">SideNavItem L1 label (menu) </span>
          <sgds-sidenav-link><a href="#">SidenavLink L2 label</a></sgds-sidenav-link>
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
      </sgds-sidenav-link></sgds-sidenav-item>
      <sgds-sidenav-item>
        <a href="#">SidenavItem L1 label (link)</a>
      </sgds-sidenav-item>
    </sgds-sidenav>
    )
}
