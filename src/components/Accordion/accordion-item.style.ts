import { css } from "lit";
export default css`
  :host {
    --accordion-item-padding-y: 1rem;
    --accordion-item-padding-x: 1.5rem;
    --accordion-item-border-radius: 0.25rem;
    --accordion-item-font-weight: 700;
    --accordion-item-line-height: 2rem;
  }
  .accordion-button {
    align-items: center;
    background-color: var(--accordion-btn-bg);
    border: 0;
    border-radius: 0;
    color: var(--accordion-btn-color);
    display: flex;
    font-size: 1rem;
    overflow-anchor: none;
    padding: var(--accordion-btn-padding-y) var(--accordion-btn-padding-x);
    position: relative;
    text-align: left;
    transition: var(--accordion-transition);
    width: 100%;
  }
  @media (prefers-reduced-motion: reduce) {
    .accordion-button {
      transition: none;
    }
  }
  .accordion-button:not(.collapsed) {
    background-color: var(--accordion-active-bg);
    box-shadow: inset 0 calc(var(--accordion-border-width) * -1) 0 var(--accordion-border-color);
    color: var(--accordion-active-color);
  }
  .accordion-button:not(.collapsed):after {
    background-image: var(--accordion-btn-active-icon);
    transform: var(--accordion-btn-icon-transform);
  }
  .accordion-button:after {
    background-image: var(--accordion-btn-icon);
    background-repeat: no-repeat;
    background-size: var(--accordion-btn-icon-width);
    content: "";
    flex-shrink: 0;
    height: var(--accordion-btn-icon-width);
    margin-left: auto;
    transition: var(--accordion-btn-icon-transition);
    width: var(--accordion-btn-icon-width);
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
    border-color: var(--accordion-btn-focus-border-color);
    box-shadow: var(--accordion-btn-focus-box-shadow);
    outline: 0;
    z-index: 3;
  }
  /* .accordion-header {
    margin-bottom: 0;
  } */
  /* .accordion-item:last-of-type .accordion-collapse {
    border-bottom-left-radius: var(--accordion-border-radius);
    border-bottom-right-radius: var(--accordion-border-radius);
  } */
  /* 
  .accordion-body {
    padding: var(--accordion-body-padding-y) var(--accordion-body-padding-x);
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
    --accordion-btn-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23D2D2D2'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    --accordion-btn-active-icon: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23D2D2D2'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  } */
  .accordion-item {
    background-color: var(--accordion-bg);
    border: var(--accordion-border-width) solid var(--accordion-border-color);
    color: var(--accordion-color);
  }
  .accordion-item:first-of-type {
    border-top-left-radius: var(--accordion-border-radius);
    border-top-right-radius: var(--accordion-border-radius);
  }
  .accordion-item:first-of-type .accordion-button {
    border-top-left-radius: var(--accordion-inner-border-radius);
    border-top-right-radius: var(--accordion-inner-border-radius);
  }
  .accordion-item:not(:first-of-type) {
    border-top: 0;
  }
  .accordion-item:last-of-type {
    border-bottom-left-radius: var(--accordion-border-radius);
    border-bottom-right-radius: var(--accordion-border-radius);
  }
  .accordion-item:last-of-type .accordion-button.collapsed {
    border-bottom-left-radius: var(--accordion-inner-border-radius);
    border-bottom-right-radius: var(--accordion-inner-border-radius);
  }
  .accordion-body {
    padding: 0;
    line-height: var(--accordion-item-line-height);
    overflow: hidden;
  }

  .accordion-content {
    display: block;
    padding: 0 var(--accordion-item-padding-x) var(--accordion-item-padding-y);
  }

  .accordion-button {
    line-height: var(--accordion-item-line-height);
  }

  .accordion-button:not(.collapsed) {
    font-weight: var(--accordion-item-font-weight);
    box-shadow: none;
  }

  :host([first-of-type]) .accordion-item {
    border-radius: var(--accordion-item-border-radius) var(--accordion-item-border-radius) 0 0;
  }

  :host([nth-of-type]) .accordion-item {
    border-radius: 0;
    border-top: 0;
  }

  :host([last-of-type]) .accordion-item {
    border-radius: 0 0 var(--accordion-item-border-radius) var(--accordion-item-border-radius);
    border-top: 0;
  }
`;
