import { css } from "lit";
export default css`
  /**scss */
  .nav-link {
    gap: 1rem;
    &.show,
    &.active {
      color: var(--mainnav-item-theme-color);
      border-color: var(--mainnav-item-theme-color);
    }
  }

  .dropdown-menu {
    margin-top: 0;
    border: 1px solid rgba(#000, 0.1);
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(#000, 0.15);
  }
  /** scss from mainnav-item  */
  :host {
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

    &.active,
    &:hover {
      color: var(--mainnav-item-theme-color);
      border-color: var(--mainnav-item-theme-color);
    }
  }
`;
