import { css } from "lit";
import svgStyle from "../../styles/svg";
export default css`
  ${svgStyle}
  /** scss */
  :host {
    --fileupload-left-icon-fill: green;
    --fileupload-remove-icon-fill: red;
    --fileupload-remove-icon-hover-fill: hsl(0, 100%, 40%);
  }

  .fileupload-list-item span {
    cursor: pointer;
    &:first-of-type {
      svg {
        fill: var(--fileupload-left-icon-fill);
      }
    }
    &:last-of-type {
      svg {
        fill: var(--fileupload-remove-icon-fill);
        &:hover {
          fill: var(--fileupload-remove-icon-hover-fill);
        }
      }
    }
  }
  .file-upload__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  /** end scss */
  .form-control[type="file"] {
    overflow: hidden;
  }
  .form-control[type="file"]:not(:disabled):not([readonly]) {
    cursor: pointer;
  }
  .sgds.fileupload-list {
    list-style-type: none;
    margin-top: 1rem;
    padding: 0;
  }
  .sgds.fileupload-list .fileupload-list-item + .fileupload-list-item {
    margin-top: 0.5rem;
  }
  .sgds.fileupload-list .fileupload-list-item i:first-child {
    color: #09a716;
  }
  .sgds.fileupload-list .fileupload-list-item i:last-child {
    color: #ef6447;
  }
  .sgds.fileupload-list .fileupload-list-item .filename {
    color: var(--sgds-link-color);
    text-decoration: underline;
    text-underline-offset: 0.25rem;
  }
  .d-flex {
    display: flex !important;
  }
  .d-none {
    display: none !important;
  }
  .gap-2 {
    gap: 0.5rem !important;
  }
`;
