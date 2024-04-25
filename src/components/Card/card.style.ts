import { css } from "lit";

export default css`
  .stretched-link:after {
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .fw-bold {
    font-weight: 700 !important;
  }
`;
