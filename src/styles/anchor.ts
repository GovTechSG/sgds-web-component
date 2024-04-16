import { css } from "lit";

export default css`
  a {
    color: rgba(var(--sgds-link-color-rgb), var(--sgds-link-opacity, 1));
    text-decoration: underline;
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
`;
