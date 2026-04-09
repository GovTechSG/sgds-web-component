'use client';

export const Sidenav = () => {
  return (
    <sgds-sidenav className="mt-3" id="test-id" suppressHydrationWarning>
      <sgds-sidenav-item suppressHydrationWarning>
        <sgds-icon name="placeholder" slot="icon" suppressHydrationWarning></sgds-icon>
        <span slot="title">Title</span>
        <sgds-sidenav-link disabled suppressHydrationWarning>
          <a href="#"> disabled-test</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link active suppressHydrationWarning>
          <a href="#"> first-test</a>
        </sgds-sidenav-link>
        <sgds-sidenav-item suppressHydrationWarning>
          <span slot="title">Title level 2 very long so just wrap</span>
          <sgds-sidenav-link suppressHydrationWarning>
            <a href="#"> first-test</a>
          </sgds-sidenav-link>
          <sgds-sidenav-link suppressHydrationWarning>
            <a href="#"> first-test</a>
          </sgds-sidenav-link>
        </sgds-sidenav-item>
      </sgds-sidenav-item>
      <sgds-sidenav-item disabled suppressHydrationWarning>
        <sgds-icon slot="icon" name="placeholder" suppressHydrationWarning></sgds-icon>
        <span slot="title">Title</span>
        <sgds-sidenav-link suppressHydrationWarning>
          <a href="#"> first-test</a>
        </sgds-sidenav-link>
        <sgds-sidenav-link suppressHydrationWarning>
          <a href="#"> first-test</a>
        </sgds-sidenav-link>
      </sgds-sidenav-item>
      <sgds-sidenav-item active suppressHydrationWarning>
        <a href="#">
          {" "}
          <sgds-icon slot="icon" name="placeholder" suppressHydrationWarning></sgds-icon>anchor
        </a>
      </sgds-sidenav-item>
      <sgds-sidenav-item suppressHydrationWarning>
        <a href="https://www.google.com">
          <sgds-icon slot="icon" name="placeholder" suppressHydrationWarning></sgds-icon> Google
        </a>
      </sgds-sidenav-item>
    </sgds-sidenav>
  );
};
