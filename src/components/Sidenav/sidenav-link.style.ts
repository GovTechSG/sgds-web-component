import { css } from "lit";

export default css`
  :host {
    --sidenav-link-font-size: var(--sgds-body-font-size);
    --sidenav-link-padding-x: 1rem;
    --sidenav-link-padding-y: 0.5rem;
    --sidenav-link-disabled-color: var(--sgds-gray-600);
  }

  a.nav-link {
    display: block;
    color: inherit;
    font-size: var(--sidenav-link-font-size);
    padding-top: var(--sidenav-link-padding-y);
    padding-bottom: var(--sidenav-link-padding-y);
    padding-left: calc(var(--sidenav-link-padding-y) * 4 + var(--sidenav-item-button-border-left-width));
    padding-right: 0;
    text-decoration: none;
  }
  a.nav-link.active,
  a.nav-link:hover {
    color: var(--sidenav-theme-color);
  }

  a.nav-link.disabled {
    color: var(--sidenav-link-disabled-color);
    pointer-events: none;
    cursor: default;
  }
`;
