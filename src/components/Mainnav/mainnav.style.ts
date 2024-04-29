import { css } from "lit";
export default css`
  .navbar {
    --sgds-navbar-padding-x: 0;
    --sgds-navbar-padding-y: 2rem;
    --sgds-navbar-color: rgba(var(--sgds-emphasis-color-rgb), 0.55);
    --sgds-navbar-hover-color: rgba(var(--sgds-emphasis-color-rgb), 0.7);
    --sgds-navbar-disabled-color: rgba(var(--sgds-emphasis-color-rgb), 0.3);
    --sgds-navbar-active-color: rgba(var(--sgds-emphasis-color-rgb), 0.9);
    --sgds-navbar-brand-padding-y: 0.25rem;
    --sgds-navbar-brand-margin-end: 1rem;
    --sgds-navbar-brand-font-size: 1.25rem;
    --sgds-navbar-brand-color: rgba(var(--sgds-emphasis-color-rgb), 0.9);
    --sgds-navbar-brand-hover-color: rgba(var(--sgds-emphasis-color-rgb), 0.9);
    --sgds-navbar-nav-link-padding-x: 0.5rem;
    --sgds-navbar-toggler-padding-y: 0.25rem;
    --sgds-navbar-toggler-padding-x: 0.75rem;
    --sgds-navbar-toggler-font-size: 1.25rem;
    --sgds-navbar-toggler-icon-bg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(var(--sgds-emphasis-color-rgb), 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    --sgds-navbar-toggler-border-color: rgba(0, 0, 0, 0.1);
    --sgds-navbar-toggler-border-radius: var(--sgds-border-radius);
    --sgds-navbar-toggler-focus-width: 0.25rem;
    --sgds-navbar-toggler-transition: box-shadow 0.15s ease-in-out;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: var(--sgds-navbar-padding-y) var(--sgds-navbar-padding-x);
    position: relative;
  }
  .navbar > .container,
  .navbar > .container-fluid,
  .navbar > .container-lg,
  .navbar > .container-md,
  .navbar > .container-sm,
  .navbar > .container-xl,
  .navbar > .container-xxl {
    align-items: center;
    display: flex;
    flex-wrap: inherit;
    justify-content: space-between;
  }
  .navbar-brand {
    color: var(--sgds-navbar-brand-color);
    font-size: var(--sgds-navbar-brand-font-size);
    margin-right: var(--sgds-navbar-brand-margin-end);
    padding-bottom: var(--sgds-navbar-brand-padding-y);
    padding-top: var(--sgds-navbar-brand-padding-y);
    text-decoration: none;
    white-space: nowrap;
  }
  .navbar-brand:focus,
  .navbar-brand:hover {
    color: var(--sgds-navbar-brand-hover-color);
  }
  .navbar-nav {
    --sgds-nav-link-padding-x: 0;
    --sgds-nav-link-padding-y: 0.5rem;
    --sgds-nav-link-font-weight: ;
    --sgds-nav-link-color: var(--sgds-navbar-color);
    --sgds-nav-link-hover-color: var(--sgds-navbar-hover-color);
    --sgds-nav-link-disabled-color: var(--sgds-navbar-disabled-color);
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
  }
  .navbar-nav .nav-link.active,
  .navbar-nav .nav-link.show {
    color: var(--sgds-navbar-active-color);
  }
  .navbar-nav .dropdown-menu {
    position: static;
  }
  .navbar-text {
    color: var(--sgds-navbar-color);
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  .navbar-text a,
  .navbar-text a:focus,
  .navbar-text a:hover {
    color: var(--sgds-navbar-active-color);
  }
  .navbar-collapse {
    align-items: center;
    flex-basis: 100%;
    flex-grow: 1;
  }
  .navbar-toggler {
    background-color: transparent;
    border: var(--sgds-border-width) solid var(--sgds-navbar-toggler-border-color);
    border-radius: var(--sgds-navbar-toggler-border-radius);
    color: var(--sgds-navbar-color);
    font-size: var(--sgds-navbar-toggler-font-size);
    line-height: 1;
    padding: var(--sgds-navbar-toggler-padding-y) var(--sgds-navbar-toggler-padding-x);
    transition: var(--sgds-navbar-toggler-transition);
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
    box-shadow: 0 0 0 var(--sgds-navbar-toggler-focus-width);
    outline: 0;
    text-decoration: none;
  }
  .navbar-toggler-icon {
    background-image: var(--sgds-navbar-toggler-icon-bg);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    display: inline-block;
    height: 1.5em;
    vertical-align: middle;
    width: 1.5em;
  }
  .navbar-nav-scroll {
    max-height: var(--sgds-scroll-height, 75vh);
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
    .navbar-expand-sm .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-sm .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
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
    .navbar-expand-sm .offcanvas {
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
    }
  }
  @media (min-width: 768px) {
    .navbar-expand-md {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-md .navbar-nav {
      flex-direction: row;
    }
    .navbar-expand-md .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-md .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
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
    }
  }
  @media (min-width: 992px) {
    .navbar-expand-lg {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-lg .navbar-nav {
      flex-direction: row;
    }
    .navbar-expand-lg .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-lg .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
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
    .navbar-expand-lg .offcanvas {
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
    }
  }
  @media (min-width: 1200px) {
    .navbar-expand-xl {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-xl .navbar-nav {
      flex-direction: row;
    }
    .navbar-expand-xl .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-xl .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
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
    .navbar-expand-xl .offcanvas {
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
    }
  }
  @media (min-width: 1400px) {
    .navbar-expand-xxl {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
    .navbar-expand-xxl .navbar-nav {
      flex-direction: row;
    }
    .navbar-expand-xxl .navbar-nav .dropdown-menu {
      position: absolute;
    }
    .navbar-expand-xxl .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
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
    .navbar-expand-xxl .offcanvas {
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
    }
  }
  .navbar-expand {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .navbar-expand .navbar-nav {
    flex-direction: row;
  }
  .navbar-expand .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand .navbar-nav .nav-link {
    padding-left: var(--sgds-navbar-nav-link-padding-x);
    padding-right: var(--sgds-navbar-nav-link-padding-x);
  }
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
  .navbar-expand .offcanvas {
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
  }
  .navbar-dark,
  .navbar[data-bs-theme="dark"] {
    --sgds-navbar-color: hsla(0, 0%, 100%, 0.55);
    --sgds-navbar-hover-color: hsla(0, 0%, 100%, 0.75);
    --sgds-navbar-disabled-color: hsla(0, 0%, 100%, 0.25);
    --sgds-navbar-active-color: #fff;
    --sgds-navbar-brand-color: #fff;
    --sgds-navbar-brand-hover-color: #fff;
    --sgds-navbar-toggler-border-color: hsla(0, 0%, 100%, 0.1);
  }
  .navbar-dark,
  .navbar[data-bs-theme="dark"],
  [data-bs-theme="dark"] .navbar-toggler-icon {
    --sgds-navbar-toggler-icon-bg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }
  .sgds.navbar {
    align-items: stretch;
    background-color: var(--sgds-navbar-bg-color);
    min-height: 80px;
    padding: 0 2rem;
  }
  [data-bs-theme="dark"] .sgds.navbar {
    --sgds-navbar-bg-color: $body-bg;
    --sgds-navbar-color: var(--sgds-body-color);
    --sgds-navbar-hover-color: $purple-400;
    --sgds-navbar-disabled-color: rgba(var(--sgds-emphasis-color-rgb), 0.3);
    --sgds-navbar-active-color: var(--sgds-primary-text-emphasis);
  }
  @media (max-width: 991.98px) {
    .sgds.navbar {
      padding: 0 1rem;
    }
  }
  .sgds.navbar a.navbar-brand {
    align-items: center;
    display: flex;
    padding-bottom: 0.125rem;
  }
  .sgds.navbar .navbar-collapse {
    align-items: stretch;
  }
  .sgds.navbar .nav-item.has-megamenu {
    position: static;
  }
  .sgds.navbar .nav-item a.nav-link {
    align-items: center;
    border-bottom: 0.125rem solid transparent;
    color: var(--sgds-navbar-color);
    display: flex;
    min-height: 100%;
  }
  .sgds.navbar .nav-item a.nav-link.active,
  .sgds.navbar .nav-item a.nav-link:hover {
    border-color: var(--sgds-navbar-active-color);
    color: var(--sgds-navbar-active-color);
  }
  .sgds.navbar .nav-item a.nav-link.dropdown-toggle {
    gap: 0.75rem;
  }
  .sgds.navbar .nav-item a.nav-link.dropdown-toggle.show {
    border-bottom: 0.125rem solid #9182e8;
    color: #9182e8;
  }
  .sgds.navbar .dropdown-menu {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0 0 5px 5px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    margin-top: 0;
  }
  .sgds.navbar .dropdown-menu.megamenu {
    left: 0;
    right: 0;
    width: 100%;
  }
  .order-first {
    order: -1 !important;
  }
  .order-0 {
    order: 0 !important;
  }
  .order-1 {
    order: 1 !important;
  }
  .order-2 {
    order: 2 !important;
  }
  .order-3 {
    order: 3 !important;
  }
  .order-4 {
    order: 4 !important;
  }
  .order-5 {
    order: 5 !important;
  }
  .order-last {
    order: 6 !important;
  }
  .me-auto {
    margin-right: auto !important;
  }
  @media (min-width: 576px) {
    .order-sm-first {
      order: -1 !important;
    }
    .order-sm-0 {
      order: 0 !important;
    }
    .order-sm-1 {
      order: 1 !important;
    }
    .order-sm-2 {
      order: 2 !important;
    }
    .order-sm-3 {
      order: 3 !important;
    }
    .order-sm-4 {
      order: 4 !important;
    }
    .order-sm-5 {
      order: 5 !important;
    }
    .order-sm-last {
      order: 6 !important;
    }
  }
  @media (min-width: 768px) {
    .order-md-first {
      order: -1 !important;
    }
    .order-md-0 {
      order: 0 !important;
    }
    .order-md-1 {
      order: 1 !important;
    }
    .order-md-2 {
      order: 2 !important;
    }
    .order-md-3 {
      order: 3 !important;
    }
    .order-md-4 {
      order: 4 !important;
    }
    .order-md-5 {
      order: 5 !important;
    }
    .order-md-last {
      order: 6 !important;
    }
  }
  @media (min-width: 992px) {
    .order-lg-first {
      order: -1 !important;
    }
    .order-lg-0 {
      order: 0 !important;
    }
    .order-lg-1 {
      order: 1 !important;
    }
    .order-lg-2 {
      order: 2 !important;
    }
    .order-lg-3 {
      order: 3 !important;
    }
    .order-lg-4 {
      order: 4 !important;
    }
    .order-lg-5 {
      order: 5 !important;
    }
    .order-lg-last {
      order: 6 !important;
    }
  }
  @media (min-width: 1200px) {
    .order-xl-first {
      order: -1 !important;
    }
    .order-xl-0 {
      order: 0 !important;
    }
    .order-xl-1 {
      order: 1 !important;
    }
    .order-xl-2 {
      order: 2 !important;
    }
    .order-xl-3 {
      order: 3 !important;
    }
    .order-xl-4 {
      order: 4 !important;
    }
    .order-xl-5 {
      order: 5 !important;
    }
    .order-xl-last {
      order: 6 !important;
    }
  }
  @media (min-width: 1400px) {
    .order-xxl-first {
      order: -1 !important;
    }
    .order-xxl-0 {
      order: 0 !important;
    }
    .order-xxl-1 {
      order: 1 !important;
    }
    .order-xxl-2 {
      order: 2 !important;
    }
    .order-xxl-3 {
      order: 3 !important;
    }
    .order-xxl-4 {
      order: 4 !important;
    }
    .order-xxl-5 {
      order: 5 !important;
    }
    .order-xxl-last {
      order: 6 !important;
    }
  }
  /** scss */
  :host {
  --mainnav-background-color: white;
  --mainnav-padding-x: 1rem;
  --mainnav-padding-y: 0;
  --mainnav-mobile-padding-x: 0.5rem;
  --mainnav-mobile-padding-y: 0;
  --mainnav-borderBottom-width: 1px;
  --mainnav-borderBottom-color: #98a2b3;
}

ul {
  margin-bottom: 1rem;
  margin-top: 0;
}

.sgds.navbar {
    background-color: var(--mainnav-background-color);
    padding: var(--mainnav-padding-y) var(--mainnav-padding-x);
    border-bottom: var(--mainnav-borderBottom-width) solid var(--mainnav-borderBottom-color);
    @media (max-width: 768px) {
      padding: var(--mainnav-mobile-padding-y) var(--mainnav-mobile-padding-x);
    }
}

.navbar-nav {
  display: flex;
  gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  width: 100%;
}

.navbar-toggler {
  border: none;
}
.navbar-toggler:focus {
  box-shadow: none;
}

slot[name="non-collapsible"] {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.slot-end {
  display: flex;
  margin-left: auto;
  align-items: stretch;
  gap: 1rem;
}

// there is no wildcard selector for element tag names in css :/
.slot-end::slotted(:not([name$="-mainnav-item"]):not([name$="-mainnav-dropdown"])) {
  align-self: center;
}

`;
