
export const Mainnav = () => 
  <sgds-mainnav>
      <img alt="sgds logo" width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand" />
      <sgds-mainnav-item>
        <a href="#">ArgsTable Controlled</a>
      </sgds-mainnav-item>
      <sgds-mainnav-item>
        <a href="#">About</a>
      </sgds-mainnav-item>
      <sgds-mainnav-dropdown>
        <span slot="toggler">Dropdown</span>
        <sgds-dropdown-item><a href="https://google.com">Item 1</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 2</a></sgds-dropdown-item>
        <sgds-dropdown-item><a href="#">Item 3</a></sgds-dropdown-item>
      </sgds-mainnav-dropdown>
      <sgds-mainnav-item slot="end">
        <a href="#">Contact Us</a>
      </sgds-mainnav-item>
      <sgds-button slot="end">Login</sgds-button>
      <dev-console-widget slot="non-collapsible" iconcolor="black" iconwidth="28px" iconheight="28px"></dev-console-widget>
    </sgds-mainnav>
