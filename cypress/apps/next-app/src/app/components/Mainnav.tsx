export const Mainnav = () => {
  return (
    <sgds-mainnav suppressHydrationWarning>
      <img width="130" src="https://www.designsystem.tech.gov.sg/assets/img/logo-sgds.svg" slot="brand" />
      <sgds-mainnav-item suppressHydrationWarning>
        <a href="#">ArgsTable Controlled</a>
      </sgds-mainnav-item>
      <sgds-mainnav-dropdown close="default" suppressHydrationWarning>
        <span slot="toggler">Dropdown</span>
        <sgds-dropdown-item disabled suppressHydrationWarning>
          <a href="https://google.com">Item 1</a>
        </sgds-dropdown-item>
        <sgds-dropdown-item suppressHydrationWarning>
          <a href="#">Item 2</a>
        </sgds-dropdown-item>
        <sgds-dropdown-item suppressHydrationWarning>
          <a href="#">Item 3</a>
        </sgds-dropdown-item>
      </sgds-mainnav-dropdown>
      <sgds-mainnav-item suppressHydrationWarning>
        <a href="#">About</a>
      </sgds-mainnav-item>
      <sgds-mainnav-item slot="end" suppressHydrationWarning>
        <a href="#">Contact Us</a>
      </sgds-mainnav-item>
      <sgds-button slot="end" suppressHydrationWarning>Login</sgds-button>
    </sgds-mainnav>
  );
};
