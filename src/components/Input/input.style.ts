import { css } from "lit";
import feedbackStyle from "../../styles/feedback";

export default css`
  :host {
    --input-border-radius: var(--sgds-border-radius, 0.3215rem);
  }
  ${feedbackStyle}
  .form-label {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .form-label {
    margin-bottom: 0;
  }
  .form-text {
    color: var(--sgds-secondary-color);
    font-weight: 300;
  }
  .form-control,
  .form-text {
    display: block;
    font-size: 1rem;
  }
  .form-control {
    appearance: none;
    background-clip: padding-box;
    background-color: var(--sgds-body-bg);
    border: 1px solid var(--sgds-border-color);
    border-radius: var(--input-border-radius); // var(--sgds-border-radius);
    color: var(--sgds-body-color);
    font-weight: 400;
    line-height: 2;
    padding: 0.4375rem 1rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: -webkit-fill-available;
    width: -moz-available;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-control {
      transition: none;
    }
  }
  .form-control[type="file"] {
    overflow: hidden;
  }
  .form-control[type="file"]:not(:disabled):not([readonly]) {
    cursor: pointer;
  }
  .form-control:focus {
    background-color: var(--sgds-body-bg);
    border-color: #90b5ff;
    box-shadow: 0 0 0 0.25rem rgba(89, 66, 219, 0.25);
    color: var(--sgds-body-color);
    outline: 0;
  }
  .form-control::-webkit-date-and-time-value {
    height: 2em;
    margin: 0;
    min-width: 85px;
  }
  .form-control::-webkit-datetime-edit {
    display: block;
    padding: 0;
  }
  .form-control::placeholder {
    color: var(--sgds-secondary-color);
    opacity: 1;
  }
  .form-control:disabled {
    background-color: var(--sgds-secondary-bg);
    opacity: 1;
  }
  .form-control::file-selector-button {
    background-color: var(--sgds-tertiary-bg);
    border: 0 solid;
    border-color: inherit;
    border-inline-end-width: 1px;
    border-radius: 0;
    color: var(--sgds-body-color);
    margin: -0.4375rem -1rem;
    margin-inline-end: 1rem;
    padding: 0.4375rem 1rem;
    pointer-events: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-control::file-selector-button {
      transition: none;
    }
  }
  .form-control:hover:not(:disabled):not([readonly])::file-selector-button {
    background-color: var(--sgds-secondary-bg);
  }
  .form-control-plaintext {
    background-color: transparent;
    border: solid transparent;
    border-width: 1px 0;
    color: var(--sgds-body-color);
    display: block;
    line-height: 2;
    margin-bottom: 0;
    padding: 0.4375rem 0;
    width: 100%;
  }
  .form-control-plaintext:focus {
    outline: 0;
  }
  .form-control-plaintext.form-control-lg,
  .form-control-plaintext.form-control-sm {
    padding-left: 0;
    padding-right: 0;
  }
  .form-control-sm {
    border-radius: var(--sgds-border-radius-sm);
    font-size: 0.875rem;
    min-height: calc(2em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
  }
  .form-control-sm::file-selector-button {
    margin: -0.25rem -0.5rem;
    margin-inline-end: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  .form-control-lg {
    border-radius: var(--sgds-border-radius-lg);
    font-size: 1.25rem;
    min-height: calc(2em + 1rem + 2px);
    padding: 0.5rem 1rem;
  }
  .form-control-lg::file-selector-button {
    margin: -0.5rem -1rem;
    margin-inline-end: 1rem;
    padding: 0.5rem 1rem;
  }
  .form-control-color {
    height: calc(2em + 0.875rem + 2px);
    padding: 0.4375rem;
    width: 3rem;
  }
  .form-control-color:not(:disabled):not([readonly]) {
    cursor: pointer;
  }
  .form-control-color::-moz-color-swatch {
    border: 0 !important;
    border-radius: var(--sgds-border-radius);
  }
  .form-control-color::-webkit-color-swatch {
    border: 0 !important;
    border-radius: var(--sgds-border-radius);
  }
  .form-control-color.form-control-sm {
    height: calc(2em + 0.5rem + 2px);
  }
  .form-control-color.form-control-lg {
    height: calc(2em + 1rem + 2px);
  }
  .sgds.form-control-group .form-control-icon,
  .sgds.form-control-group .form-control-icon-validate {
    align-items: center;
    display: flex;
    font-size: 1rem;
    height: 3rem;
    justify-content: center;
    position: absolute;
    width: 3rem;
    z-index: 4;
  }
  .sgds.form-control-group {
    align-items: stretch;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
  }
  .sgds.form-control-group > .form-control {
    padding-left: 3rem;
  }
  .sgds.form-control-group > .form-control:focus {
    z-index: 3;
  }
  .sgds.form-control-group .form-control-icon-validate {
    left: inherit;
    right: 0;
  }
  .form-control.is-valid {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23066E0E'%3E%3Cpath d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/%3E%3C/svg%3E");
    background-position: right calc(0.5em + 0.21875rem) center;
    background-repeat: no-repeat;
    background-size: calc(1em + 0.4375rem) calc(1em + 0.4375rem);
    border-color: var(--sgds-form-valid-border-color);
    padding-right: calc(2em + 0.875rem);
  }
  .form-control.is-valid:focus {
    border-color: var(--sgds-form-valid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--sgds-success-rgb), 0.25);
  }
  .form-control-color.is-valid {
    width: calc(3.875rem + 2em);
  }
  .form-control.is-invalid {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23B6220D'%3E%3Cpath d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/%3E%3Cpath d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/%3E%3C/svg%3E");
    background-position: right calc(0.5em + 0.21875rem) center;
    background-repeat: no-repeat;
    background-size: calc(1em + 0.4375rem) calc(1em + 0.4375rem);
    border-color: var(--sgds-form-invalid-border-color);
    padding-right: calc(2em + 0.875rem);
  }
  .form-control.is-invalid:focus {
    border-color: var(--sgds-form-invalid-border-color);
    box-shadow: 0 0 0 0.25rem rgba(var(--sgds-danger-rgb), 0.25);
  }
  .form-control-color.is-invalid {
    width: calc(3.875rem + 2em);
  }
  .d-flex {
    display: flex !important;
  }
  .w-100 {
    width: 100% !important;
  }
  .flex-column {
    flex-direction: column !important;
  }
  .text-muted {
    --sgds-text-opacity: 1;
    color: var(--sgds-secondary-color) !important;
  }
`;
