import { css } from "lit";
export default css`
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  svg {
    vertical-align: middle;
  }
  button {
    border-radius: 0;
  }
  button:focus:not(:focus-visible) {
    outline: 0;
  }
  button,
  input {
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
  .form-control {
    appearance: none;
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #98a2b3;
    border-radius: 0.3125rem;
    color: #1d2939;
    display: block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2;
    padding: 0.4375rem 1rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 100%;
  }
  @media (prefers-reduced-motion: reduce) {
    .form-control {
      transition: none;
    }
  }
  .form-control:focus {
    background-color: #fff;
    border-color: #87b8dd;
    box-shadow: 0 0 0 0.125rem rgba(15, 113, 187, 0.25);
    color: #1d2939;
    outline: 0;
  }
  .form-control::placeholder {
    color: #98a2b3;
    opacity: 1;
  }
  .form-control:disabled {
    background-color: #e4e7ec;
    opacity: 1;
  }
  .form-control-sm {
    border-radius: 0.2rem;
    font-size: 0.875rem;
    min-height: calc(2em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
  }
  .input-group {
    align-items: stretch;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
  }
  .input-group > .form-control {
    flex: 1 1 auto;
    min-width: 0;
    position: relative;
    width: 1%;
  }
  .input-group > .form-control:focus {
    z-index: 3;
  }
  .input-group .btn {
    position: relative;
    z-index: 2;
  }
  .input-group .btn:focus {
    z-index: 3;
  }
  .input-group-sm > .btn,
  .input-group-sm > .form-control {
    border-radius: 0.2rem;
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
  }
  .input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .input-group
    > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(
      .invalid-feedback
    ) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    margin-left: -1px;
  }
  .btn {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.3125rem;
    color: #1d2939;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2;
    padding: 0.4375rem 1rem;
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
    color: #1d2939;
  }
  .btn:focus {
    box-shadow: 0 0 0 0.125rem rgba(15, 113, 187, 0.25);
    outline: 0;
  }
  .btn:disabled {
    opacity: 0.65;
    pointer-events: none;
  }
  .btn-primary {
    background-color: #5925dc;
    border-color: #5925dc;
    color: #fff;
  }
  .btn-primary:focus,
  .btn-primary:hover {
    background-color: #4c1fbb;
    border-color: #471eb0;
    color: #fff;
  }
  .btn-primary:focus {
    box-shadow: 0 0 0 0.125rem rgba(114, 70, 225, 0.5);
  }
  .btn-primary:active {
    background-color: #471eb0;
    border-color: #431ca5;
    color: #fff;
  }
  .btn-primary:active:focus {
    box-shadow: 0 0 0 0.125rem rgba(114, 70, 225, 0.5);
  }
  .btn-primary:disabled {
    background-color: #5925dc;
    border-color: #5925dc;
    color: #fff;
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
  .text-center {
    text-align: center !important;
  }
`;
