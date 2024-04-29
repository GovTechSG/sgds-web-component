import { css } from "lit";
export default css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  ul {
    padding-left: 2rem;
  }
  ul {
    margin-bottom: 1rem;
    margin-top: 0;
  }
  .list-unstyled {
    list-style: none;
    padding-left: 0;
  }
  .nav-link {
    color: #0f71bb;
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .nav-link {
      transition: none;
    }
  }
  .nav-link:focus,
  .nav-link:hover {
    color: #0c5a96;
  }
  /** scss */
  :host {
  --tab-theme-color: var(--sgds-primary);
  display: inline-block;
}

li.nav-item {
  div.nav-link {
    &.tabs-info-toggle {
      cursor: pointer;
      padding: 0.75rem;
      border-radius: 0.3125rem;
      color: #1d2939;
      background-color: #fff;
      border: 1px solid var(--sgds-gray-400);
      min-width: 11.875rem;
      .tabs-info {
        &-label {
          display: flex;
          text-align: right;
          justify-content: space-between;
        }
        &-count {
          text-align: right;
        }
      }
      &.active,
      &:hover {
        border-color: var(--tab-theme-color); //$primary;
        color: var(--tab-theme-color); //$primary;
        font-weight: 700; //$font-weight-bold;
      }
      &.disabled {
        background-color: var(--sgds-gray-200);
        color: var(--sgds-gray-400);
        border-color: var(--sgds-gray-400);
        cursor: not-allowed;
      }
    }
    &.tabs-basic-toggle {
      padding: initial;
      cursor: pointer;
      border: 1px solid var(--sgds-gray-400); //$gray-400;
      border-radius: 0;
      padding: 0.5rem 1.5rem;
      color: #1d2939; //$body-color;
      background-color: #fff; //$white;
      slot {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      &.active,
      &:hover {
        color: #fff; //$white;
        background-color: var(--tab-theme-color); //$link-color;
      }
      &.disabled {
        background-color: var(--sgds-gray-200);
        color: var(--sgds-gray-400);
        border-color: var(--sgds-gray-400);
        cursor: not-allowed;
      }
    }
    &:not(.tabs-basic-toggle):not(.tabs-info-toggle) {
      cursor: pointer;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
      background-color: transparent;
      color: #1d2939; //$body-color
      border-color: transparent;
      border: none;
      &.active,
      &:hover {
        border-bottom: 0.125rem solid var(--tab-theme-color); // $navbar-border-bottom-height solid $link-color;
        font-weight: 700; // $font-weight-bold;
        background-color: transparent;
      }
      &.disabled {
        background-color: var(--sgds-gray-200);
        color: var(--sgds-gray-400);
        border-color: var(--sgds-gray-400);
        cursor: not-allowed;
        background-color: transparent;
      }
    }
  }
}


`;
