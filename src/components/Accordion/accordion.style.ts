import { css } from "lit";

export default css`
  .accordion {
    --sgds-accordion-color: var(--sgds-body-color);
    --sgds-accordion-bg: var(--sgds-body-bg);
    --sgds-accordion-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
    --sgds-accordion-border-color: var(--sgds-border-color);
    --sgds-accordion-border-width: var(--sgds-border-width);
    --sgds-accordion-border-radius: var(--sgds-border-radius);
    --sgds-accordion-inner-border-radius: calc(var(--sgds-border-radius) - var(--sgds-border-width));
    --sgds-accordion-btn-padding-x: 1.5rem;
    --sgds-accordion-btn-padding-y: 1rem;
    --sgds-accordion-btn-color: var(--sgds-body-color);
    --sgds-accordion-btn-bg: var(--sgds-accordion-bg);
    --sgds-accordion-btn-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--sgds-body-color)'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    --sgds-accordion-btn-icon-width: 1.25rem;
    --sgds-accordion-btn-icon-transform: rotate(-180deg);
    --sgds-accordion-btn-icon-transition: transform 0.2s ease-in-out;
    --sgds-accordion-btn-active-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--sgds-primary-text-emphasis)'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    --sgds-accordion-btn-focus-border-color: #90b5ff;
    --sgds-accordion-btn-focus-box-shadow: 0 0 0 0.25rem rgba(89, 66, 219, 0.25);
    --sgds-accordion-body-padding-x: 1.5rem;
    --sgds-accordion-body-padding-y: 1rem;
    --sgds-accordion-active-color: var(--sgds-primary-text-emphasis);
    --sgds-accordion-active-bg: none;
  }
  .accordion-button {
    align-items: center;
    background-color: var(--sgds-accordion-btn-bg);
    border: 0;
    border-radius: 0;
    color: var(--sgds-accordion-btn-color);
    display: flex;
    font-size: 1rem;
    overflow-anchor: none;
    padding: var(--sgds-accordion-btn-padding-y) var(--sgds-accordion-btn-padding-x);
    position: relative;
    text-align: left;
    transition: var(--sgds-accordion-transition);
    width: 100%;
  }
  @media (prefers-reduced-motion: reduce) {
    .accordion-button {
      transition: none;
    }
  }
  .accordion-button:not(.collapsed) {
    background-color: var(--sgds-accordion-active-bg);
    box-shadow: inset 0 calc(var(--sgds-accordion-border-width) * -1) 0 var(--sgds-accordion-border-color);
    color: var(--sgds-accordion-active-color);
  }
  .accordion-button:not(.collapsed):after {
    background-image: var(--sgds-accordion-btn-active-icon);
    transform: var(--sgds-accordion-btn-icon-transform);
  }
  .accordion-button:after {
    background-image: var(--sgds-accordion-btn-icon);
    background-repeat: no-repeat;
    background-size: var(--sgds-accordion-btn-icon-width);
    content: "";
    flex-shrink: 0;
    height: var(--sgds-accordion-btn-icon-width);
    margin-left: auto;
    transition: var(--sgds-accordion-btn-icon-transition);
    width: var(--sgds-accordion-btn-icon-width);
  }
  @media (prefers-reduced-motion: reduce) {
    .accordion-button:after {
      transition: none;
    }
  }
  .accordion-button:hover {
    z-index: 2;
  }
  .accordion-button:focus {
    border-color: var(--sgds-accordion-btn-focus-border-color);
    box-shadow: var(--sgds-accordion-btn-focus-box-shadow);
    outline: 0;
    z-index: 3;
  }
  .accordion-header {
    margin-bottom: 0;
  }
  .accordion-item {
    background-color: var(--sgds-accordion-bg);
    border: var(--sgds-accordion-border-width) solid var(--sgds-accordion-border-color);
    color: var(--sgds-accordion-color);
  }
  .accordion-item:first-of-type {
    border-top-left-radius: var(--sgds-accordion-border-radius);
    border-top-right-radius: var(--sgds-accordion-border-radius);
  }
  .accordion-item:first-of-type .accordion-button {
    border-top-left-radius: var(--sgds-accordion-inner-border-radius);
    border-top-right-radius: var(--sgds-accordion-inner-border-radius);
  }
  .accordion-item:not(:first-of-type) {
    border-top: 0;
  }
  .accordion-item:last-of-type {
    border-bottom-left-radius: var(--sgds-accordion-border-radius);
    border-bottom-right-radius: var(--sgds-accordion-border-radius);
  }
  .accordion-item:last-of-type .accordion-button.collapsed {
    border-bottom-left-radius: var(--sgds-accordion-inner-border-radius);
    border-bottom-right-radius: var(--sgds-accordion-inner-border-radius);
  }
  .accordion-item:last-of-type .accordion-collapse {
    border-bottom-left-radius: var(--sgds-accordion-border-radius);
    border-bottom-right-radius: var(--sgds-accordion-border-radius);
  }
  .accordion-body {
    padding: var(--sgds-accordion-body-padding-y) var(--sgds-accordion-body-padding-x);
  }
  .accordion-flush .accordion-collapse {
    border-width: 0;
  }
  .accordion-flush .accordion-item {
    border-left: 0;
    border-radius: 0;
    border-right: 0;
  }
  .accordion-flush .accordion-item:first-child {
    border-top: 0;
  }
  .accordion-flush .accordion-item:last-child {
    border-bottom: 0;
  }
  .accordion-flush .accordion-item .accordion-button,
  .accordion-flush .accordion-item .accordion-button.collapsed {
    border-radius: 0;
  }
  [data-bs-theme="dark"] .accordion-button:after {
    --sgds-accordion-btn-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23D6D6D6'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    --sgds-accordion-btn-active-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23D6D6D6'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  }
  .sgds.accordion .accordion-button {
    line-height: 2rem;
  }
  .sgds.accordion .accordion-button:not(.collapsed) {
    box-shadow: none;
    font-weight: 700;
  }
  .sgds.accordion .accordion-body {
    line-height: 2rem;
    padding-bottom: 1.5rem;
    padding-top: 0;
  }
`