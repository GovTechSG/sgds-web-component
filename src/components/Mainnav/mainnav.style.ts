import { css } from "lit";
export default css`
  :host {
    --mainnav-padding-x: 2rem;
    --mainnav-padding-y: 0;

    --mainnav-toggler-icon-bg: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16" ><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" /></svg>');
    --mainnav-toggler-padding-y: 0.25rem;
    --mainnav-toggler-padding-x: 0.75rem;
    --mainnav-toggler-font-size: 1.25rem;

    --mainnav-brand-padding-y: 0.125rem; //0.25rem;
    --mainnav-brand-margin-end: 1rem;
    --mainnav-brand-font-size: 1.25rem;
    --mainnav-brand-color: rgba(var(--sgds-emphasis-color-rgb), 0.9);
    --mainnav-brand-hover-color: rgba(var(--sgds-emphasis-color-rgb), 0.9);

    --mainnav-toggler-transition: box-shadow 0.15s ease-in-out;
    
    /* --mainnav-color: rgba(var(--sgds-emphasis-color-rgb), 0.55); */
    /* --mainnav-hover-color: rgba(var(--sgds-emphasis-color-rgb), 0.7); */
    /* --mainnav-disabled-color: rgba(var(--sgds-emphasis-color-rgb), 0.3); */
    /* --mainnav-active-color: rgba(var(--sgds-emphasis-color-rgb), 0.9); */

    /** existing */
    --mainnav-background-color: white;
    --mainnav-mobile-padding-x: 0.5rem;
    --mainnav-mobile-padding-y: 0;
    --mainnav-borderBottom-width: 1px;
    --mainnav-borderBottom-color: #98a2b3;

    /**new */
    --mainnav-gutter: 1.5rem;
  }
  .navbar {
    color: pink;
    align-items: stretch;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: var(--mainnav-padding-y) var(--mainnav-padding-x);
    position: relative;
    min-height: 80px;
    background-color: var(--mainnav-background-color);
    border-bottom: var(--mainnav-borderBottom-width) solid var(--mainnav-borderBottom-color);
    @media (max-width: 768px) {
      padding: var(--mainnav-mobile-padding-y) var(--mainnav-mobile-padding-x);
    }
  }
  .navbar-brand {
    display: flex;
    align-items: center;
    color: var(--mainnav-brand-color);
    font-size: var(--mainnav-brand-font-size);
    margin-right: var(--mainnav-brand-margin-end);
    text-decoration: none;
    white-space: nowrap;
    padding-bottom: var(--mainnav-brand-padding-y);
    padding-top: var(--mainnav-brand-padding-y);
  }

  .navbar-brand:focus,
  .navbar-brand:hover {
    color: var(--mainnav-brand-hover-color);
  }
  .navbar-nav {
    /* --sgds-nav-link-padding-x: 0;
    --sgds-nav-link-padding-y: 0.5rem;
    --sgds-nav-link-font-weight: ;
    --sgds-nav-link-color: var(--mainnav-color);
    --sgds-nav-link-hover-color: var(--mainnav-hover-color);
    --sgds-nav-link-disabled-color: var(--mainnav-disabled-color); */
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: var(--mainnav-gutter);
    padding-left: 0.5rem;
    padding-right: var(--mainnav-gutter);
    height: 100%;
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
  }
  .navbar-collapse {
    align-items: center;
    flex-basis: 100%;
    flex-grow: 1;
  }
  .navbar-toggler {
    background-color: transparent;
    border: none;
    /* color: var(--mainnav-color); */
    font-size: var(--mainnav-toggler-font-size);
    line-height: 1;
    padding: var(--mainnav-toggler-padding-y) var(--mainnav-toggler-padding-x);
    transition: var(--mainnav-toggler-transition);
  }
  @media (prefers-reduced-motion: reduce) {
    .navbar-toggler {
      transition: none;
    }
  }
  .navbar-toggler:hover {
    text-decoration: none;
  }
  .navbar-toggler:focus {
    box-shadow: none;
    outline: 0;
    text-decoration: none;
  }
  .navbar-toggler-icon {
    background-image: var(--mainnav-toggler-icon-bg);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    display: inline-block;
    height: 1.5em;
    vertical-align: middle;
    width: 1.5em;
  }
  .navbar-nav-scroll {
    max-height: 75vh;
    padding-right: 0.5rem;
    overflow-y: auto;
  }
  @media (min-width: 576px) {
    .navbar-expand-sm {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-sm .navbar-nav {
      flex-direction: row;
    }
    /* .navbar-expand-sm .navbar-nav .dropdown-menu {
      position: absolute;
    } */
    /* .navbar-expand-sm .navbar-nav .nav-link {
      padding-left: var(--mainnav-nav-link-padding-x);
      padding-right: var(--mainnav-nav-link-padding-x);
    } */
    .navbar-expand-sm .navbar-nav-scroll {
      overflow: visible;
    }
    .navbar-expand-sm .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }
    .navbar-expand-sm .navbar-toggler {
      display: none;
    }
    /* .navbar-expand-sm .offcanvas {
      background-color: transparent !important;
      border: 0 !important;
      flex-grow: 1;
      height: auto !important;
      position: static;
      transform: none !important;
      transition: none;
      visibility: visible !important;
      width: auto !important;
      z-index: auto;
    }
    .navbar-expand-sm .offcanvas .offcanvas-header {
      display: none;
    }
    .navbar-expand-sm .offcanvas .offcanvas-body {
      display: flex;
      flex-grow: 0;
      overflow-y: visible;
      padding: 0;
    } */
  }
  @media (min-width: 768px) {
    .navbar-expand-md {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-md .navbar-nav {
      flex-direction: row;
    }
    /* .navbar-expand-md .navbar-nav .dropdown-menu {
      position: absolute;
    } */
    /* .navbar-expand-md .navbar-nav .nav-link {
      padding-left: var(--mainnav-nav-link-padding-x);
      padding-right: var(--mainnav-nav-link-padding-x);
    } */
    .navbar-expand-md .navbar-nav-scroll {
      overflow: visible;
    }
    .navbar-expand-md .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }
    .navbar-expand-md .navbar-toggler {
      display: none;
    }
    /* 
    .navbar-expand-md .offcanvas {
      background-color: transparent !important;
      border: 0 !important;
      flex-grow: 1;
      height: auto !important;
      position: static;
      transform: none !important;
      transition: none;
      visibility: visible !important;
      width: auto !important;
      z-index: auto;
    }
    .navbar-expand-md .offcanvas .offcanvas-header {
      display: none;
    }
    .navbar-expand-md .offcanvas .offcanvas-body {
      display: flex;
      flex-grow: 0;
      overflow-y: visible;
      padding: 0;
    } */
  }
  @media (min-width: 992px) {
    .navbar-expand-lg {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-lg .navbar-nav {
      flex-direction: row;
    }
    /* .navbar-expand-lg .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-lg .navbar-nav .nav-link {
      padding-left: var(--mainnav-nav-link-padding-x);
      padding-right: var(--mainnav-nav-link-padding-x);
    } */
    .navbar-expand-lg .navbar-nav-scroll {
      overflow: visible;
    }
    .navbar-expand-lg .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }
    .navbar-expand-lg .navbar-toggler {
      display: none;
    }
    /* .navbar-expand-lg .offcanvas {
      background-color: transparent !important;
      border: 0 !important;
      flex-grow: 1;
      height: auto !important;
      position: static;
      transform: none !important;
      transition: none;
      visibility: visible !important;
      width: auto !important;
      z-index: auto;
    }
    .navbar-expand-lg .offcanvas .offcanvas-header {
      display: none;
    }
    .navbar-expand-lg .offcanvas .offcanvas-body {
      display: flex;
      flex-grow: 0;
      overflow-y: visible;
      padding: 0;
    } */
  }
  @media (min-width: 1200px) {
    .navbar-expand-xl {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    /* .navbar-expand-xl .navbar-nav {
      flex-direction: row;
    }
    .navbar-expand-xl .navbar-nav .dropdown-menu {
      position: absolute;
    } */
    .navbar-expand-xl .navbar-nav .nav-link {
      padding-left: var(--mainnav-nav-link-padding-x);
      padding-right: var(--mainnav-nav-link-padding-x);
    }
    .navbar-expand-xl .navbar-nav-scroll {
      overflow: visible;
    }
    .navbar-expand-xl .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }
    .navbar-expand-xl .navbar-toggler {
      display: none;
    }
    /* .navbar-expand-xl .offcanvas {
      background-color: transparent !important;
      border: 0 !important;
      flex-grow: 1;
      height: auto !important;
      position: static;
      transform: none !important;
      transition: none;
      visibility: visible !important;
      width: auto !important;
      z-index: auto;
    }
    .navbar-expand-xl .offcanvas .offcanvas-header {
      display: none;
    }
    .navbar-expand-xl .offcanvas .offcanvas-body {
      display: flex;
      flex-grow: 0;
      overflow-y: visible;
      padding: 0;
    } */
  }
  @media (min-width: 1400px) {
    .navbar-expand-xxl {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-xxl .navbar-nav {
      flex-direction: row;
    }
    /* .navbar-expand-xxl .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-xxl .navbar-nav .nav-link {
      padding-left: var(--mainnav-nav-link-padding-x);
      padding-right: var(--mainnav-nav-link-padding-x);
    } */
    .navbar-expand-xxl .navbar-nav-scroll {
      overflow: visible;
    }
    .navbar-expand-xxl .navbar-collapse {
      display: flex !important;
      flex-basis: auto;
    }
    .navbar-expand-xxl .navbar-toggler {
      display: none;
    }
    /* .navbar-expand-xxl .offcanvas {
      background-color: transparent !important;
      border: 0 !important;
      flex-grow: 1;
      height: auto !important;
      position: static;
      transform: none !important;
      transition: none;
      visibility: visible !important;
      width: auto !important;
      z-index: auto;
    }
    .navbar-expand-xxl .offcanvas .offcanvas-header {
      display: none;
    }
    .navbar-expand-xxl .offcanvas .offcanvas-body {
      display: flex;
      flex-grow: 0;
      overflow-y: visible;
      padding: 0;
    } */
  }
  .navbar-expand {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand .navbar-nav {
    flex-direction: row;
  }
  /* .navbar-expand .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand .navbar-nav .nav-link {
    padding-left: var(--mainnav-nav-link-padding-x);
    padding-right: var(--mainnav-nav-link-padding-x);
  } */
  .navbar-expand .navbar-nav-scroll {
    overflow: visible;
  }
  .navbar-expand .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }
  .navbar-expand .navbar-toggler {
    display: none;
  }
  /* .navbar-expand .offcanvas {
    background-color: transparent !important;
    border: 0 !important;
    flex-grow: 1;
    height: auto !important;
    position: static;
    transform: none !important;
    transition: none;
    visibility: visible !important;
    width: auto !important;
    z-index: auto;
  }
  .navbar-expand .offcanvas .offcanvas-header {
    display: none;
  }
  .navbar-expand .offcanvas .offcanvas-body {
    display: flex;
    flex-grow: 0;
    overflow-y: visible;
    padding: 0;
  } */
  /* .navbar-dark,
  .navbar[data-bs-theme="dark"] {
    --mainnav-color: hsla(0, 0%, 100%, 0.55);
    --mainnav-hover-color: hsla(0, 0%, 100%, 0.75);
    --mainnav-disabled-color: hsla(0, 0%, 100%, 0.25);
    --mainnav-active-color: #fff;
    --mainnav-brand-color: #fff;
    --mainnav-brand-hover-color: #fff;
    --mainnav-toggler-border-color: hsla(0, 0%, 100%, 0.1);
  }
  .navbar-dark,
  .navbar[data-bs-theme="dark"],
  [data-bs-theme="dark"] .navbar-toggler-icon {
    --mainnav-toggler-icon-bg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }

  [data-bs-theme="dark"] .sgds.navbar {
    --mainnav-bg-color: $body-bg;
    --mainnav-color: var(--sgds-body-color);
    --mainnav-hover-color: $purple-400;
    --mainnav-disabled-color: rgba(var(--sgds-emphasis-color-rgb), 0.3);
    --mainnav-active-color: var(--sgds-primary-text-emphasis);
  } */
  /* @media (max-width: 991.98px) {
    .sgds.navbar {
      padding: 0 1rem;
    }
  } */
  /* .sgds.navbar .nav-item.has-megamenu {
    position: static;
  } */

  .order-first {
    order: -1 !important;
  }
  .order-1 {
    order: 1 !important;
  }
  .order-2 {
    order: 2 !important;
  }
  .order-last {
    order: 6 !important;
  }

  /* slot */

  slot[name="non-collapsible"] {
    display: flex;
    gap: var(--mainnav-gutter);
    align-items: center;
    margin-left: auto;
  }

  .slot-end {
    display: flex;
    margin-left: auto;
    align-items: stretch;
    gap: var(--mainnav-gutter);
  }

  /* there is no wildcard selector for element tag names in css */
  .slot-end::slotted(:not([name$="-mainnav-item"]):not([name$="-mainnav-dropdown"])) {
    align-self: center;
  }
`;
