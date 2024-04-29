import { css } from "lit";
import feedback from "../../styles/feedback";
export default css`
  ${feedback}
  *,:after,:before {
    box-sizing: border-box;
  }
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
  }
  textarea {
    resize: vertical;
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
  textarea.form-control {
    min-height: calc(2em + 0.875rem + 2px);
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  label {
    display: inline-block;
  }
  .form-label {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .form-label {
    margin-bottom: 0;
  }
  .form-text {
    color: #667085;
    font-size: 1rem;
    font-weight: 300;
  }
  .form-text {
    display: block !important;
  }
  .d-flex {
    display: flex !important;
  }
  .justify-content-between {
    justify-content: space-between !important;
  }
`;
