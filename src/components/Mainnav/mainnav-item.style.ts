import { css } from "lit";

export default css`
  .nav-link {
    background: none;
    border: 0;
    color: var(--sgds-nav-link-color);
    display: block;
    font-size: var(--sgds-nav-link-font-size);
    font-weight: var(--sgds-nav-link-font-weight);
    padding: var(--sgds-nav-link-padding-y) var(--sgds-nav-link-padding-x);
    text-decoration: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .nav-link {
      transition: none;
    }
  }
  .nav-link:focus,
  .nav-link:hover {
    color: var(--sgds-nav-link-hover-color);
  }
  .nav-link:focus-visible {
    box-shadow: 0 0 0 0.25rem rgba(89, 66, 219, 0.25);
    outline: 0;
  }
  .nav-link.disabled,
  .nav-link:disabled {
    color: var(--sgds-nav-link-disabled-color);
    cursor: default;
    pointer-events: none;
  }
  .nav-tabs .nav-link {
    border: var(--sgds-nav-tabs-border-width) solid transparent;
    border-top-left-radius: var(--sgds-nav-tabs-border-radius);
    border-top-right-radius: var(--sgds-nav-tabs-border-radius);
    margin-bottom: calc(var(--sgds-nav-tabs-border-width) * -1);
  }
  .nav-tabs .nav-link:focus,
  .nav-tabs .nav-link:hover {
    border-color: var(--sgds-nav-tabs-link-hover-border-color);
    isolation: isolate;
  }
  .nav-tabs .nav-item.show .nav-link,
  .nav-tabs .nav-link.active {
    background-color: var(--sgds-nav-tabs-link-active-bg);
    border-color: var(--sgds-nav-tabs-link-active-border-color);
    color: var(--sgds-nav-tabs-link-active-color);
  }
  .nav-pills .nav-link {
    border-radius: var(--sgds-nav-pills-border-radius);
  }
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    background-color: var(--sgds-nav-pills-link-active-bg);
    color: var(--sgds-nav-pills-link-active-color);
  }
  .nav-underline .nav-link {
    border-bottom: var(--sgds-nav-underline-border-width) solid transparent;
    padding-left: 0;
    padding-right: 0;
  }
  .nav-underline .nav-link:focus,
  .nav-underline .nav-link:hover {
    border-bottom-color: currentcolor;
  }
  .nav-underline .nav-link.active,
  .nav-underline .show > .nav-link {
    border-bottom-color: currentcolor;
    color: var(--sgds-nav-underline-link-active-color);
    font-weight: 700;
  }
  .nav-fill > .nav-link {
    flex: 1 1 auto;
    text-align: center;
  }
  .nav-justified > .nav-link {
    flex-basis: 0;
    flex-grow: 1;
    text-align: center;
  }
  .nav-fill .nav-item .nav-link,
  .nav-justified .nav-item .nav-link {
    width: 100%;
  }
  .navbar-nav .nav-link.active,
  .navbar-nav .nav-link.show {
    color: var(--sgds-navbar-active-color);
  }
  @media (min-width: 576px) {
    .navbar-expand-sm .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
  }
  @media (min-width: 768px) {
    .navbar-expand-md .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
  }
  @media (min-width: 992px) {
    .navbar-expand-lg .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
  }
  @media (min-width: 1200px) {
    .navbar-expand-xl .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
  }
  @media (min-width: 1400px) {
    .navbar-expand-xxl .navbar-nav .nav-link {
      padding-left: var(--sgds-navbar-nav-link-padding-x);
      padding-right: var(--sgds-navbar-nav-link-padding-x);
    }
  }
  .navbar-expand .navbar-nav .nav-link {
    padding-left: var(--sgds-navbar-nav-link-padding-x);
    padding-right: var(--sgds-navbar-nav-link-padding-x);
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
  .card-header-tabs .nav-link.active {
    background-color: var(--sgds-card-bg);
    border-bottom-color: var(--sgds-card-bg);
  }
  .sgds.sidenav .sidenav-item .collapse a.nav-link,
  .sgds.sidenav .sidenav-item .collapse.show a.nav-link,
  .sgds.sidenav .sidenav-item .collapsing a.nav-link {
    color: inherit;
    font-size: inherit;
    padding: 0.5rem 0 0.5rem 4.125rem;
  }
  .sgds.sidenav .sidenav-item .collapse a.nav-link + a.nav-link,
  .sgds.sidenav .sidenav-item .collapse.show a.nav-link + a.nav-link,
  .sgds.sidenav .sidenav-item .collapsing a.nav-link + a.nav-link {
    margin-top: 1rem;
  }
  .sgds.sidenav .sidenav-item .collapse a.nav-link.active,
  .sgds.sidenav .sidenav-item .collapse a.nav-link:hover,
  .sgds.sidenav .sidenav-item .collapse.show a.nav-link.active,
  .sgds.sidenav .sidenav-item .collapse.show a.nav-link:hover,
  .sgds.sidenav .sidenav-item .collapsing a.nav-link.active,
  .sgds.sidenav .sidenav-item .collapsing a.nav-link:hover {
    color: var(--sgds-primary-text-emphasis);
  }
  .sgds.sidenav .sidenav-item .collapse a.nav-link.disabled,
  .sgds.sidenav .sidenav-item .collapse.show a.nav-link.disabled,
  .sgds.sidenav .sidenav-item .collapsing a.nav-link.disabled {
    color: var(--sgds-secondary-color);
  }
  .sgds.nav-tabs[variant="tabs-info-toggle"] li.nav-item button.nav-link {
    background-color: #fff;
    border: 1px solid #909090;
    border-radius: 0.3125rem;
    color: #252525;
    min-width: 11.875rem;
    padding: 0.75rem;
  }
  .sgds.nav-tabs[variant="tabs-info-toggle"] li.nav-item button.nav-link .tabs-info-label {
    display: flex;
    justify-content: flex-end;
    text-align: right;
  }
  .sgds.nav-tabs[variant="tabs-info-toggle"] li.nav-item button.nav-link .tabs-info-label.has-icon {
    justify-content: space-between;
  }
  .sgds.nav-tabs[variant="tabs-info-toggle"] li.nav-item button.nav-link .tabs-info-count {
    text-align: right;
  }
  .sgds.nav-tabs[variant="tabs-info-toggle"] li.nav-item button.nav-link.active,
  .sgds.nav-tabs[variant="tabs-info-toggle"] li.nav-item button.nav-link:hover {
    border-color: #9182e8;
    color: #9182e8;
    font-weight: 700;
  }
  .sgds.nav-tabs[variant="tabs-basic-toggle"] li.nav-item button.nav-link {
    background-color: #fff;
    border: 1px solid #909090;
    border-radius: 0;
    color: #252525;
    padding: 0.5rem 1.5rem;
  }
  .sgds.nav-tabs[variant="tabs-basic-toggle"] li.nav-item button.nav-link i.left,
  .sgds.nav-tabs[variant="tabs-basic-toggle"] li.nav-item button.nav-link span.left {
    margin-right: 1rem;
  }
  .sgds.nav-tabs[variant="tabs-basic-toggle"] li.nav-item button.nav-link i.right,
  .sgds.nav-tabs[variant="tabs-basic-toggle"] li.nav-item button.nav-link span.right {
    margin-left: 1rem;
  }
  .sgds.nav-tabs[variant="tabs-basic-toggle"] li.nav-item button.nav-link.active,
  .sgds.nav-tabs[variant="tabs-basic-toggle"] li.nav-item button.nav-link:hover {
    background-color: #0950df;
    color: #fff;
  }
  .sgds.nav-tabs:not([variant="tabs-basic-toggle"]):not([variant="tabs-info-toggle"]) li.nav-item button.nav-link {
    background-color: transparent;
    border: none;
    color: #252525;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }
  .sgds.nav-tabs:not([variant="tabs-basic-toggle"]):not([variant="tabs-info-toggle"])
    li.nav-item
    button.nav-link.active {
    background-color: transparent;
    border-bottom: 0.125rem solid #0950df;
    font-weight: 700;
  }
`;
