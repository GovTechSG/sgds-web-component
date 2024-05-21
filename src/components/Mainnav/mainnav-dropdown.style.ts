import { css } from "lit";
export default css`
  :host {
    --mainnav-dropdown-theme-color: var(--sgds-primary);
    --mainnav-dropdown-color: var(--sgds-gray-600);
    --mainnav-dropdown-borderBottom-width: 0.125rem;
    /* SUGGESTIONS */
    /* mainnav-item-disabled-opacity: var(--sgds-disabled-opacity) */
  }

  .dropdown-menu {
    margin-top: 0;
    border: 1px solid rgba(#000, 0.1);
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(#000, 0.15);
  }
  .nav-link.show {
    border-color: var(--mainnav-dropdown-theme-color);
    color: var(--mainnav-dropdown-theme-color);
  }

  li {
    height: 100%;
  }
  a.nav-link {
    display: flex;
    cursor: pointer;
    color: var(--mainnav-dropdown-color);
    border-bottom: var(--mainnav-dropdown-borderBottom-width) solid transparent;
    min-height: 100%;
    align-items: center;
    padding: 0;
    text-decoration: none;
    &.active,
    &:hover {
      color: var(--mainnav-dropdown-theme-color);
      border-color: var(--mainnav-dropdown-theme-color);
    }
    &:focus-visible {
      box-shadow: 0 0 0 0.25rem rgba(89, 66, 219, 0.25);
      outline: 0;
    }
  }

  .nav-link.disabled {
    cursor: default;
    pointer-events: none;
    opacity: 30%;
  }
`;
