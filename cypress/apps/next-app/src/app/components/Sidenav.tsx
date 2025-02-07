import SgdsSidenav from "@govtechsg/sgds-web-component/react/sidenav/index.js";
import SgdsSidenavLink from "@govtechsg/sgds-web-component/react/sidenav-link/index.js";
import SgdsSidenavItem from "@govtechsg/sgds-web-component/react/sidenav-item/index.js";
import SgdsIcon from "@govtechsg/sgds-web-component/react/icon/index.js";

export const Sidenav = () => {
  return (
    <SgdsSidenav >
    <SgdsSidenavItem>
      <span slot="title">
        Title
      </span>
      <SgdsSidenavLink disabled>
        <a href="#"> disbaED-test</a>
      </SgdsSidenavLink>
      <SgdsSidenavLink>
        <a href="#"> first-test</a>
      </SgdsSidenavLink>
      <SgdsSidenavItem title="Test title 2">
        <SgdsIcon name="placeholder" slot="icon"></SgdsIcon>
        <span slot="title">
          Title level 2 very long so just wrap
        </span>
        <SgdsSidenavLink active>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>
        <SgdsSidenavLink>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>

      </SgdsSidenavItem>
    </SgdsSidenavItem>
    <SgdsSidenavItem title="Test title 2">
      <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
      <span slot="title">
        Title
      </span>
      <SgdsSidenavLink>
        <a href="#"> first-test</a>
      </SgdsSidenavLink>
      <SgdsSidenavLink>
        <a href="#"> first-test</a>
      </SgdsSidenavLink>

    </SgdsSidenavItem>
    <SgdsSidenavItem href="#">
      <span slot="title">
         Title 3
      </span>
    </SgdsSidenavItem>
    <SgdsSidenavItem href="#" disabled>
      <span slot="title">
         Title 3
      </span>
    </SgdsSidenavItem>
  </SgdsSidenav >
  );
};
