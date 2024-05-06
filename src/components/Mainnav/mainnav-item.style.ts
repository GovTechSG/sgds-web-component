import { css } from "lit";

export default css`
  :host {
    --mainnav-item-theme-color: var(--sgds-primary);
    --mainnav-item-color: var(--sgds-gray-600);
    --mainnav-item-borderBottom-width: 0.125rem;
    /* SUGGESTIONS */
    /* mainnav-item-disabled-opacity: var(--sgds-disabled-opacity) */
  }
  li {
    height: 100%;
  }
  a.nav-link {
    display: flex;
    cursor: pointer;
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

  .nav-link.disabled {
    cursor: default;
    pointer-events: none;
    opacity: 30%;
  }
`;
