import { css } from "lit";

export default css`
  :host {
    --sidenav-item-button-border-left-width: 0.125rem;
    --sidenav-item-padding-x: 1rem;
    --sidenav-item-padding-y: 0.5rem;
    --sidenav-item-icon-title-gap: 1rem;
  }

  .sidenav-btn {
    width: 100%;
    text-align: initial;
    line-height: 1.5rem;
    font-size: var(--sgds-body-font-size);
    border: 0;
    background: 0;
    padding: 0.5rem 1rem;
    border-left: var(--sidenav-item-button-border-left-width) solid transparent;
    border-radius: 0;
    display: flex;
    gap: var(--sidenav-item-icon-title-gap);
    align-items: center;

    svg.bi-chevron-down {
      margin-left: auto;
      transition: all 0.3s ease-in-out;
      transform: rotate(180deg);
    }
  }
  .sidenav-btn.active,
  .sidenav-btn:hover {
    color: var(--sidenav-theme-color);
    border-left-color: var(--sidenav-theme-color);
    font-weight: 700;
  }
  .sidenav-btn.disabled {
    opacity: 0.65;
    pointer-events: none;
  }
  .sidenav-btn:not(.active) {
    svg.bi-chevron-down {
      transform: rotate(0deg);
    }
  }

  a.sidenav-btn {
    color: inherit;
    text-decoration: none;
    line-height: 1.5rem;
  }

  .sidenav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin: 0;
    line-height: 2rem;
  }

  .collapse,
  .collapse.show,
  .collapsing {
    margin-top: 1rem;
  }
`;
