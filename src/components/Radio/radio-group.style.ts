import { css } from "lit";

export default css`
  fieldset {
    border: 0;
    margin: 0;
    min-width: 0;
    padding: 0;
  }
  .input-group
    > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(
      .invalid-feedback
    ) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    margin-left: -1px;
  }
  .invalid-feedback {
    color: var(--sgds-form-invalid-color);
    display: none;
    font-size: 1rem;
    width: 100%;
  }
  .is-invalid ~ .invalid-feedback,
  .was-validated :invalid ~ .invalid-feedback {
    display: block;
  }
  .form-check-inline .form-check-input ~ .invalid-feedback {
    margin-left: 0.5em;
  }
  fieldset:disabled .btn {
    background-color: var(--sgds-btn-disabled-bg);
    border-color: var(--sgds-btn-disabled-border-color);
    color: var(--sgds-btn-disabled-color);
    opacity: var(--sgds-btn-disabled-opacity);
    pointer-events: none;
  }
  .visually-hidden {
    clip: rect(0, 0, 0, 0) !important;
    border: 0 !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    white-space: nowrap !important;
    width: 1px !important;
  }
`;
