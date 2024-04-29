import { css } from "lit";
export default css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  b {
    font-weight: bolder;
  }
  a {
    color: #0f71bb;
    text-decoration: underline;
  }
  a:hover {
    color: #0c5a96;
  }
  svg {
    vertical-align: middle;
  }
  [role="button"] {
    cursor: pointer;
  }
  a {
    text-underline-offset: 0.25rem;
  }
  a[target="_blank"]:after {
    content: "";
    display: inline-block;
    font-family: bootstrap-icons;
    padding-left: 0.25rem;
    text-decoration-line: none;
  }
  .container,
  .container-fluid {
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--sgds-gutter-x, 0.75rem);
    padding-right: var(--sgds-gutter-x, 0.75rem);
    width: 100%;
  }
  @media (min-width: 576px) {
    .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px;
    }
  }
  @media (min-width: 1400px) {
    .container {
      max-width: 1320px;
    }
  }
  .row {
    --sgds-gutter-x: 1.5rem;
    --sgds-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-left: calc(var(--sgds-gutter-x) * -0.5);
    margin-right: calc(var(--sgds-gutter-x) * -0.5);
    margin-top: calc(var(--sgds-gutter-y) * -1);
  }
  .row > * {
    flex-shrink: 0;
    margin-top: var(--sgds-gutter-y);
    max-width: 100%;
    padding-left: calc(var(--sgds-gutter-x) * 0.5);
    padding-right: calc(var(--sgds-gutter-x) * 0.5);
    width: 100%;
  }
  .col {
    flex: 1 0 0%;
  }
  /*! CSS Used from: Embedded */
  .container {
    display: flex;
    flex-direction: column;
  }
`;
