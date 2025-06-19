import SgdsSidenav from "@govtechsg/sgds-web-component/react/sidenav";
import SgdsSidenavLink from "@govtechsg/sgds-web-component/react/sidenav-link";
import SgdsSidenavItem from "@govtechsg/sgds-web-component/react/sidenav-item";
import SgdsIcon from "@govtechsg/sgds-web-component/react/icon/index.js";

export const Sidenav = () => {
    return (
        <SgdsSidenav class="mt-3" id="test-id">
      <SgdsSidenavItem>
        <SgdsIcon name="placeholder" slot="icon"></SgdsIcon>
        <span slot="title">Title</span>
        <SgdsSidenavLink disabled>
          <a href="#"> disbaED-test</a>
        </SgdsSidenavLink>
        <SgdsSidenavLink active>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>
        <SgdsSidenavItem>
          <span slot="title">Title level 2 very long so just wrap</span>
          <SgdsSidenavLink>
            <a href="#"> first-test</a>
          </SgdsSidenavLink>
          <SgdsSidenavLink>
            <a href="#"> first-test</a>
          </SgdsSidenavLink>
        </SgdsSidenavItem>
      </SgdsSidenavItem>
      <SgdsSidenavItem disabled>
        <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>
        <span slot="title">Title</span>
        <SgdsSidenavLink>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>
        <SgdsSidenavLink>
          <a href="#"> first-test</a>
        </SgdsSidenavLink>
      </SgdsSidenavItem>
      <SgdsSidenavItem active>
        <a href="#">
          {" "}
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon>anchor
        </a>
      </SgdsSidenavItem>
      <SgdsSidenavItem>
        <a href="https://www.google.com">
          <SgdsIcon slot="icon" name="placeholder"></SgdsIcon> Google
        </a>
      </SgdsSidenavItem>
    </SgdsSidenav>
    )
}
