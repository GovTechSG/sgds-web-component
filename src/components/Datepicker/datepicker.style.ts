import { css } from "lit";
export default css`
  .btn {
    --sgds-btn-padding-x: 1rem;
    --sgds-btn-padding-y: 0.4375rem;
    --sgds-btn-font-family: ;
    --sgds-btn-font-size: 1rem;
    --sgds-btn-font-weight: 400;
    --sgds-btn-line-height: 2;
    --sgds-btn-color: var(--sgds-body-color);
    --sgds-btn-bg: transparent;
    --sgds-btn-border-width: 1px;
    --sgds-btn-border-color: transparent;
    --sgds-btn-border-radius: var(--sgds-border-radius);
    --sgds-btn-hover-border-color: transparent;
    --sgds-btn-box-shadow: inset 0 1px 0 hsla(0, 0%, 100%, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
    --sgds-btn-disabled-opacity: 0.65;
    --sgds-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--sgds-btn-focus-shadow-rgb), 0.5);
    background-color: var(--sgds-btn-bg);
    border: var(--sgds-btn-border-width) solid var(--sgds-btn-border-color);
    border-radius: var(--sgds-btn-border-radius);
    color: var(--sgds-btn-color);
    cursor: pointer;
    display: inline-block;
    font-family: var(--sgds-btn-font-family);
    font-size: var(--sgds-btn-font-size);
    font-weight: var(--sgds-btn-font-weight);
    line-height: var(--sgds-btn-line-height);
    padding: var(--sgds-btn-padding-y) var(--sgds-btn-padding-x);
    text-align: center;
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    user-select: none;
    vertical-align: middle;
  }
  @media (prefers-reduced-motion: reduce) {
    .btn {
      transition: none;
    }
  }
  .btn:hover {
    background-color: var(--sgds-btn-hover-bg);
    border-color: var(--sgds-btn-hover-border-color);
    color: var(--sgds-btn-hover-color);
  }
  .btn-primary {
    --sgds-btn-color: #fff;
    --sgds-btn-bg: #5942db;
    --sgds-btn-border-color: #5942db;
    --sgds-btn-hover-color: #fff;
    --sgds-btn-hover-bg: #4c38ba;
    --sgds-btn-hover-border-color: #4735af;
    --sgds-btn-focus-shadow-rgb: 114, 94, 224;
    --sgds-btn-active-color: #fff;
    --sgds-btn-active-bg: #4735af;
    --sgds-btn-active-border-color: #4332a4;
    --sgds-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --sgds-btn-disabled-color: #fff;
    --sgds-btn-disabled-bg: #5942db;
    --sgds-btn-disabled-border-color: #5942db;
  }
  .btn-outline-dark {
    --sgds-btn-color: #252525;
    --sgds-btn-border-color: #252525;
    --sgds-btn-hover-color: #fff;
    --sgds-btn-hover-bg: #252525;
    --sgds-btn-hover-border-color: #252525;
    --sgds-btn-focus-shadow-rgb: 37, 37, 37;
    --sgds-btn-active-color: #fff;
    --sgds-btn-active-bg: #252525;
    --sgds-btn-active-border-color: #252525;
    --sgds-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --sgds-btn-disabled-color: #252525;
    --sgds-btn-disabled-bg: transparent;
    --sgds-btn-disabled-border-color: #252525;
    --sgds-gradient: none;
  }
  .sgds.datepicker {
    border-color: #909090;
    font-size: 1rem;
    max-width: 24rem;
    width: 24rem;
  }
  .border {
    border: var(--sgds-border-width) var(--sgds-border-style) var(--sgds-border-color) !important;
  }
  .rounded-0 {
    border-radius: 0 !important;
  }
`;
