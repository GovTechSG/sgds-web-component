import { css } from "lit";

export default css`
  .input-group
    > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(
      .invalid-feedback
    ) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    margin-left: -1px;
  }
  .valid-feedback {
    color: var(--sgds-form-valid-color);
    display: none;
    font-size: 1rem;
    width: 100%;
  }
  .is-valid ~ .valid-feedback,
  .was-validated :valid ~ .valid-feedback {
    display: block;
  }
  .form-check-inline .form-check-input ~ .valid-feedback {
    margin-left: 0.5em;
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
`;