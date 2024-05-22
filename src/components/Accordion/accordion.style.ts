import { css } from "lit";

export default css`
  :host {
    --accordion-color: var(--sgds-body-color);
    --accordion-bg: var(--sgds-body-bg);
    --accordion-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
    --accordion-border-color: var(--sgds-border-color);
    --accordion-border-width: var(--sgds-border-width);
    /* --accordion-border-radius: var(--sgds-border-radius); */
    --accordion-inner-border-radius: calc(var(--sgds-border-radius) - var(--sgds-border-width));
    /* --accordion-btn-padding-x: 1.5rem; */
    /* --accordion-btn-padding-y: 1rem; */
    --accordion-btn-color: var(--sgds-body-color);
    --accordion-btn-bg: var(--accordion-bg);
    --accordion-btn-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--sgds-body-color)'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    --accordion-btn-icon-width: 1.25rem;
    --accordion-btn-icon-transform: rotate(-180deg);
    --accordion-btn-icon-transition: transform 0.2s ease-in-out;
    --accordion-btn-active-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--sgds-primary-text-emphasis)'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    --accordion-btn-focus-border-color: #90b5ff;
    --accordion-btn-focus-box-shadow: 0 0 0 0.25rem rgba(90, 66, 192, 0.25);
    --accordion-body-padding-x: 1.5rem;
    --accordion-body-padding-y: 1rem;
    --accordion-active-color: var(--sgds-primary-text-emphasis);
    --accordion-active-bg: none;
  }
`;
