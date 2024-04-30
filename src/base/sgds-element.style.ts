import { css } from "lit";

export default css`
  :host {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: var(--sgds-body-bg);
    color: var(--sgds-body-color);
    font-family: var(--sgds-body-font-family);
    font-size: var(--sgds-body-font-size);
    font-weight: var(--sgds-body-font-weight);
    line-height: var(--sgds-body-line-height);
    margin: 0;
    text-align: var(--sgds-body-text-align);

    *,
    :after,
    :before {
      box-sizing: border-box;
    }
    @media (prefers-reduced-motion: no-preference) {
      :root {
        scroll-behavior: smooth;
      }
    }
  }
`;
