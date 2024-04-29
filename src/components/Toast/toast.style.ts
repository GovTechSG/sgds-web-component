import { css } from "lit";
import bgVariants from "../../styles/bg-variants";
export default css`
  ${bgVariants}
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  strong {
    font-weight: bolder;
  }
  small {
    font-size: 0.875em;
  }
  button {
    border-radius: 0;
  }
  button:focus:not(:focus-visible) {
    outline: 0;
  }
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }
  button {
    text-transform: none;
  }
  button {
    -webkit-appearance: button;
  }
  button:not(:disabled) {
    cursor: pointer;
  }
  .btn-sm {
    border-radius: 0.2rem;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
  }
  .btn-close {
    background: transparent
      url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2398A2B3'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E")
      50%/1em auto no-repeat;
    border: 0;
    border-radius: 0.3125rem;
    box-sizing: content-box;
    color: #98a2b3;
    height: 1em;
    opacity: 1;
    padding: 0.25em;
    width: 1em;
  }
  .btn-close:hover {
    color: #98a2b3;
    opacity: 1;
    text-decoration: none;
  }
  .btn-close:focus {
    box-shadow: 0 0 0 0.125rem rgba(15, 113, 187, 0.25);
    opacity: 1;
    outline: 0;
  }
  .btn-close:disabled {
    opacity: 0.25;
    pointer-events: none;
    user-select: none;
  }
  .btn-close:hover {
    background: transparent
      url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23344054'%3E%3Cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E")
      50%/1em auto no-repeat;
  }
  .toast {
    background-clip: padding-box;
    background-color: hsla(0, 0%, 100%, 0.85);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.3125rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    font-size: 1rem;
    max-width: 100%;
    pointer-events: auto;
    width: 350px;
  }
  .toast-header {
    align-items: center;
    background-clip: padding-box;
    background-color: hsla(0, 0%, 100%, 0.85);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top-left-radius: calc(0.3125rem - 1px);
    border-top-right-radius: calc(0.3125rem - 1px);
    color: #344054;
    display: flex;
    padding: 0.5rem 0.75rem;
  }
  .toast-header .btn-close {
    margin-left: 0.75rem;
    margin-right: -0.375rem;
  }
  .toast-body {
    word-wrap: break-word;
    padding: 0.75rem;
  }
  .sgds.toast {
    border-color: #344054;
    border-left: 5px solid;
    border-radius: 0 0.3125rem 0.3125rem 0;
    font-size: 1rem;
  }
  .sgds.toast .toast-header {
    border-bottom: 0;
    padding: 1rem 1rem 0.5rem;
  }
  .sgds.toast .toast-header .btn-close {
    margin: 0;
  }
  .sgds.toast .toast-body {
    padding: 0 1rem 1rem;
  }
  .me-2 {
    margin-right: 0.5rem !important;
  }
  .me-auto {
    margin-right: auto !important;
  }
  .text-muted {
    --sgds-text-opacity: 1;
    color: #667085 !important;
  }

  .sgds.is-primary {
    border-color: #5942db;
  }
  .sgds.is-primary .toast-header {
    color: #5942db;
  }
  .sgds.is-secondary {
    border-color: #0a6679;
  }
  .sgds.is-secondary .toast-header {
    color: #0a6679;
  }
  .sgds.is-success {
    border-color: #066e0e;
  }
  .sgds.is-success .toast-header {
    color: #066e0e;
  }
  .sgds.is-info {
    border-color: #0950df;
  }
  .sgds.is-info .toast-header {
    color: #0950df;
  }
  .sgds.is-warning {
    border-color: #88500d;
  }
  .sgds.is-warning .toast-header {
    color: #88500d;
  }
  .sgds.is-danger {
    border-color: #b6220d;
  }
  .sgds.is-danger .toast-header {
    color: #b6220d;
  }
  .sgds.is-light {
    border-color: #b1b1b1;
  }
  .sgds.is-light .toast-header {
    color: #b1b1b1;
  }
  .sgds.is-dark {
    border-color: #252525;
  }
  .sgds.is-dark .toast-header {
    color: #252525;
  }
`;
