import { css } from "lit";

export default css`
  :host {
    /* suggestions */
    /* mainnav-item-disabled-opacity: var(--sgds-disabled-opacity) */

    --mainnav-item-theme-color: #5925dc;
    --mainnav-item-color: #344054;
    --mainnav-item-borderBottom-width: 0.125rem;
  }
  li {
    height: 100%;
  }
  a.nav-link {
    display: flex;
    color: var(--mainnav-item-color);
    border-bottom: var(--mainnav-item-borderBottom-width) solid transparent;
    min-height: 100%;
    align-items: center;
    padding: 0;
    text-decoration: none;
    &.active,
    &:hover {
      color: var(--mainnav-item-theme-color);
      border-color: var(--mainnav-item-theme-color);
    }
    &:focus-visible {
      box-shadow: 0 0 0 0.25rem rgba(89, 66, 219, 0.25);
      outline: 0;
    }
  }

  .nav-link.disabled,
  .nav-link:disabled {
    /* color: var(--sgds-nav-link-disabled-color); */
    cursor: default;
    pointer-events: none;
    opacity: 30%;
  }
`;
