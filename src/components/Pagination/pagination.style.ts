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
  svg {
    vertical-align: middle;
  }
  .pagination {
    display: flex;
    list-style: none;
    padding-left: 0;
  }
  .page-link {
    background-color: #fff;
    border: 1px solid #98a2b3;
    color: #0f71bb;
    display: block;
    position: relative;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .page-link {
      transition: none;
    }
  }
  .page-link:hover {
    border-color: #d0d5dd;
    z-index: 2;
  }
  .page-link:focus,
  .page-link:hover {
    background-color: #e4e7ec;
    color: #0c5a96;
  }
  .page-link:focus {
    box-shadow: 0 0 0 0.125rem rgba(15, 113, 187, 0.25);
    outline: 0;
    z-index: 3;
  }
  .page-item:not(:first-child) .page-link {
    margin-left: -1px;
  }
  .page-item.active .page-link {
    background-color: #0f71bb;
    border-color: #0f71bb;
    color: #fff;
    z-index: 3;
  }
  .page-item.disabled .page-link {
    background-color: #fff;
    border-color: #98a2b3;
    color: #344054;
    pointer-events: none;
  }
  .page-link {
    padding: 0.5rem 1rem;
  }
  .page-item:first-child .page-link {
    border-bottom-left-radius: 0.3125rem;
    border-top-left-radius: 0.3125rem;
  }
  .page-item:last-child .page-link {
    border-bottom-right-radius: 0.3125rem;
    border-top-right-radius: 0.3125rem;
  }
  .pagination-sm .page-link {
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
  }
  .pagination-sm .page-item:first-child .page-link {
    border-bottom-left-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
  }
  .pagination-sm .page-item:last-child .page-link {
    border-bottom-right-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }
  .visually-hidden {
    clip: rect(0, 0, 0, 0) !important;
    border: 0 !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    white-space: nowrap !important;
    width: 1px !important;
  }
  /**scss */
  :host {
  --pagination-color: var(--sgds-cyan);
  --pagination-bg-color: var(--sgds-white);
  --pagination-hover-bg-color: var(--sgds-gray-200);
  --pagination-hover-border-color: var(--sgds-gray-300);
  --pagination-active-color: var(--sgds-white);
  --pagination-active-bg-color: var(--sgds-cyan);
  --pagination-disabled-color: var(--sgds-gray-600);
  --pagination-disabled-bg-color: var(--sgds-white);
}

ul.pagination.sgds {
  li {
    cursor: pointer;
    &.disabled {
      cursor: default;
    }
    &.page-item {
      span {
        &.page-link {
          color: var(--pagination-color);
          background-color: var(--pagination-bg-color);

          &:hover {
            color: var(--pagination-color);
            background-color: var(--pagination-hover-bg-color);
            border-color: var(--pagination-hover-border-color);
          }
        }
      }
      &.disabled .page-link {
        color: var(--pagination-disabled-color);
        background-color: var(--pagination-disabled-bg-color);
      }
      &.active .page-link {
        color: var(--pagination-active-color);
        background-color: var(--pagination-active-bg-color);
      }
    }
  }
}

`;
