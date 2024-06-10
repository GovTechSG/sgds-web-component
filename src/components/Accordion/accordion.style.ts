import { css } from "lit";

export default css`
  :host {
    /** NEW in 3.0.0 */
    --accordion-bg: var(--sgds-body-bg);
    --accordion-active-color: var(--sgds-primary-text-emphasis);
    --accordion-active-bg: none;
    --accordion-border-color: var(--sgds-border-color);
    --accordion-border-width: var(--sgds-border-width);
  }
`;
