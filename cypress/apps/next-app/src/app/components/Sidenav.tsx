import SgdsSidenav from "@govtechsg/sgds-web-component/react/sidenav/index.js";
import SgdsSidenavLink from "@govtechsg/sgds-web-component/react/sidenav-link/index.js";
import SgdsSidenavItem from "@govtechsg/sgds-web-component/react/sidenav-item/index.js";

export const Sidenav = () => {
  return (
    <SgdsSidenav>
      <SgdsSidenavItem href="">
        <span slot="title">SideNav Item #1 (control by Argstable) </span>
        <SgdsSidenavLink href="undefined">sgds-sidenav-link (control by Argstable)</SgdsSidenavLink>
        <SgdsSidenavLink href="#" disabled="">
          sgds-sidenav-link
        </SgdsSidenavLink>
        <SgdsSidenavLink href="#">sgds-sidenav-link</SgdsSidenavLink>
      </SgdsSidenavItem>
      <SgdsSidenavItem>
        <span slot="title">SideNav Item #2</span>
        <span slot="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-layers-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"></path>
            <path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"></path>
          </svg>
        </span>
        <SgdsSidenavLink href="#">sgds-sidenav-link</SgdsSidenavLink>
        <SgdsSidenavLink href="#">sgds-sidenav-link</SgdsSidenavLink>
        <SgdsSidenavLink href="#">sgds-sidenav-link</SgdsSidenavLink>
      </SgdsSidenavItem>
      <SgdsSidenavItem href="#">
        <span slot="title">SideNav Item #3</span>
        <span slot="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-layers-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"></path>
            <path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"></path>
          </svg>
        </span>
      </SgdsSidenavItem>
    </SgdsSidenav>
  );
};
