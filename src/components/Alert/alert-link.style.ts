import { css } from "lit";
import anchor from "../../styles/anchor";

export default css`
  ${anchor},
  :host {
    --alert-link-anchor-color: var(--sgds-alert-link-color, #2a3343);
  }
  .alert-link {
    color: var(--alert-link-anchor-color);
    font-weight: 700;
  }
`;
