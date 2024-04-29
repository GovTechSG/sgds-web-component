import { css } from "lit";
export default css`
  /* svg{vertical-align:middle;}
table{border-collapse:collapse;caption-side:bottom;}
th{text-align:inherit;text-align:-webkit-match-parent;}

.table{--sgds-table-bg:transparent;--sgds-table-accent-bg:transparent;--sgds-table-striped-color:#1d2939;--sgds-table-striped-bg:rgba(0,0,0,.05);--sgds-table-active-color:#1d2939;--sgds-table-active-bg:rgba(0,0,0,.1);--sgds-table-hover-color:#1d2939;--sgds-table-hover-bg:rgba(0,0,0,.075);border-color:#98a2b3;color:#1d2939;margin-bottom:1rem;vertical-align:top;width:100%;}
.table>:not(caption)>*>*{background-color:var(--sgds-table-bg);border-bottom-width:1px;box-shadow:inset 0 0 0 9999px var(--sgds-table-accent-bg);padding:1rem;}
.table>tbody{vertical-align:inherit;}
.table>thead{vertical-align:bottom;}

.table-sm>:not(caption)>*>*{padding:.5rem;} */
  .table > :not(:first-child) {
    border-top: 2px solid;
  }
  .table-bordered > :not(caption) > * {
    border-width: 1px 0;
  }
  .table-bordered > :not(caption) > * > * {
    border-width: 0 1px;
  }
  .table-borderless > :not(caption) > * > * {
    border-bottom-width: 0;
  }
  .table-borderless > :not(:first-child) {
    border-top-width: 0;
  }
  .table-striped > tbody > tr:nth-of-type(odd) > * {
    --sgds-table-accent-bg: var(--sgds-table-striped-bg);
    color: var(--sgds-table-striped-color);
  }
  .table-hover > tbody > tr:hover > * {
    --sgds-table-accent-bg: var(--sgds-table-hover-bg);
    color: var(--sgds-table-hover-color);
  }
  /* .sgds.table{font-size:1rem;}
.align-self-center{align-self:center!important;}
.ms-2{margin-left:.5rem!important;}  */

  tbody,
  td,
  th,
  thead,
  tr {
    border: 0 solid;
    border-color: inherit;
  }
  table {
    border-collapse: collapse;
    caption-side: bottom;
  }
  tbody {
    border: 0 solid;
    border-color: inherit;
  }
  .table {
    --sgds-table-color-type: initial;
    --sgds-table-bg-type: initial;
    --sgds-table-color-state: initial;
    --sgds-table-bg-state: initial;
    --sgds-table-color: var(--sgds-emphasis-color);
    --sgds-table-bg: var(--sgds-body-bg);
    --sgds-table-border-color: var(--sgds-border-color);
    --sgds-table-accent-bg: transparent;
    --sgds-table-striped-color: var(--sgds-emphasis-color);
    --sgds-table-striped-bg: rgba(var(--sgds-emphasis-color-rgb), 0.05);
    --sgds-table-active-color: var(--sgds-emphasis-color);
    --sgds-table-active-bg: rgba(var(--sgds-emphasis-color-rgb), 0.1);
    --sgds-table-hover-color: var(--sgds-emphasis-color);
    --sgds-table-hover-bg: rgba(var(--sgds-emphasis-color-rgb), 0.075);
    border-color: var(--sgds-table-border-color);
    margin-bottom: 1rem;
    vertical-align: top;
    width: 100%;
  }
  .table > :not(caption) > * > * {
    background-color: var(--sgds-table-bg);
    border-bottom-width: var(--sgds-border-width);
    box-shadow: inset 0 0 0 9999px var(--sgds-table-bg-state, var(--sgds-table-bg-type, var(--sgds-table-accent-bg)));
    color: var(--sgds-table-color-state, var(--sgds-table-color-type, var(--sgds-table-color)));
    padding: 1rem;
  }
  .table > tbody {
    vertical-align: inherit;
  }
  .table > thead {
    vertical-align: bottom;
  }
  .table-group-divider {
    border-top: calc(var(--sgds-border-width) * 2) solid;
  }
  .table-sm > :not(caption) > * > * {
    padding: 0.5rem;
  }
  .table-bordered > :not(caption) > * {
    border-width: var(--sgds-border-width) 0;
  }
  .table-bordered > :not(caption) > * > * {
    border-width: 0 var(--sgds-border-width);
  }
  .table-borderless > :not(caption) > * > * {
    border-bottom-width: 0;
  }
  .table-borderless > :not(:first-child) {
    border-top-width: 0;
  }
  .table-striped-columns > :not(caption) > tr > :nth-child(2n),
  .table-striped > tbody > tr:nth-of-type(odd) > * {
    --sgds-table-color-type: var(--sgds-table-striped-color);
    --sgds-table-bg-type: var(--sgds-table-striped-bg);
  }
  .table-active {
    --sgds-table-color-state: var(--sgds-table-active-color);
    --sgds-table-bg-state: var(--sgds-table-active-bg);
  }
  .table-hover > tbody > tr:hover > * {
    --sgds-table-color-state: var(--sgds-table-hover-color);
    --sgds-table-bg-state: var(--sgds-table-hover-bg);
  }
  .table-primary {
    --sgds-table-color: #000;
    --sgds-table-bg: #ded9f8;
    --sgds-table-border-color: #c8c3df;
    --sgds-table-striped-bg: #d3ceec;
    --sgds-table-striped-color: #000;
    --sgds-table-active-bg: #c8c3df;
    --sgds-table-active-color: #000;
    --sgds-table-hover-bg: #cdc9e5;
    --sgds-table-hover-color: #000;
  }
  .table-primary,
  .table-secondary {
    border-color: var(--sgds-table-border-color);
    color: var(--sgds-table-color);
  }
  .table-secondary {
    --sgds-table-color: #000;
    --sgds-table-bg: #cee0e4;
    --sgds-table-border-color: #b9cacd;
    --sgds-table-striped-bg: #c4d5d9;
    --sgds-table-striped-color: #000;
    --sgds-table-active-bg: #b9cacd;
    --sgds-table-active-color: #000;
    --sgds-table-hover-bg: #bfcfd3;
    --sgds-table-hover-color: #000;
  }
  .table-success {
    --sgds-table-color: #000;
    --sgds-table-bg: #cde2cf;
    --sgds-table-border-color: #b9cbba;
    --sgds-table-striped-bg: #c3d7c5;
    --sgds-table-striped-color: #000;
    --sgds-table-active-bg: #b9cbba;
    --sgds-table-active-color: #000;
    --sgds-table-hover-bg: #bed1bf;
    --sgds-table-hover-color: #000;
  }
  .table-info,
  .table-success {
    border-color: var(--sgds-table-border-color);
    color: var(--sgds-table-color);
  }
  .table-info {
    --sgds-table-color: #000;
    --sgds-table-bg: #cedcf9;
    --sgds-table-border-color: #b9c6e0;
    --sgds-table-striped-bg: #c4d1ed;
    --sgds-table-striped-color: #000;
    --sgds-table-active-bg: #b9c6e0;
    --sgds-table-active-color: #000;
    --sgds-table-hover-bg: #bfcce6;
    --sgds-table-hover-color: #000;
  }
  .table-warning {
    --sgds-table-color: #000;
    --sgds-table-bg: #e7dccf;
    --sgds-table-border-color: #d0c6ba;
    --sgds-table-striped-bg: #dbd1c5;
    --sgds-table-striped-color: #000;
    --sgds-table-active-bg: #d0c6ba;
    --sgds-table-active-color: #000;
    --sgds-table-hover-bg: #d6ccbf;
    --sgds-table-hover-color: #000;
  }
  .table-danger,
  .table-warning {
    border-color: var(--sgds-table-border-color);
    color: var(--sgds-table-color);
  }
  .table-danger {
    --sgds-table-color: #000;
    --sgds-table-bg: #f0d3cf;
    --sgds-table-border-color: #d8beba;
    --sgds-table-striped-bg: #e4c8c5;
    --sgds-table-striped-color: #000;
    --sgds-table-active-bg: #d8beba;
    --sgds-table-active-color: #000;
    --sgds-table-hover-bg: #dec3bf;
    --sgds-table-hover-color: #000;
  }
  .table-light {
    --sgds-table-color: #000;
    --sgds-table-bg: #b1b1b1;
    --sgds-table-border-color: #9f9f9f;
    --sgds-table-striped-bg: #a8a8a8;
    --sgds-table-striped-color: #000;
    --sgds-table-active-bg: #9f9f9f;
    --sgds-table-active-color: #000;
    --sgds-table-hover-bg: #a4a4a4;
    --sgds-table-hover-color: #000;
  }
  .table-dark,
  .table-light {
    border-color: var(--sgds-table-border-color);
    color: var(--sgds-table-color);
  }
  .table-dark {
    --sgds-table-color: #fff;
    --sgds-table-bg: #252525;
    --sgds-table-border-color: #3b3b3b;
    --sgds-table-striped-bg: #303030;
    --sgds-table-striped-color: #fff;
    --sgds-table-active-bg: #3b3b3b;
    --sgds-table-active-color: #fff;
    --sgds-table-hover-bg: #353535;
    --sgds-table-hover-color: #fff;
  }
  .table-responsive {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
  }
  @media (max-width: 575.98px) {
    .table-responsive-sm {
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
    }
  }
  @media (max-width: 767.98px) {
    .table-responsive-md {
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
    }
  }
  @media (max-width: 991.98px) {
    .table-responsive-lg {
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
    }
  }
  @media (max-width: 1199.98px) {
    .table-responsive-xl {
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
    }
  }
  @media (max-width: 1399.98px) {
    .table-responsive-xxl {
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
    }
  }
  .sgds.table {
    font-size: 1rem;
  }
  .d-table {
    display: table !important;
  }
  .d-table-row {
    display: table-row !important;
  }
  .d-table-cell {
    display: table-cell !important;
  }
  @media (min-width: 576px) {
    .d-sm-table {
      display: table !important;
    }
    .d-sm-table-row {
      display: table-row !important;
    }
    .d-sm-table-cell {
      display: table-cell !important;
    }
  }
  @media (min-width: 768px) {
    .d-md-table {
      display: table !important;
    }
    .d-md-table-row {
      display: table-row !important;
    }
    .d-md-table-cell {
      display: table-cell !important;
    }
  }
  @media (min-width: 992px) {
    .d-lg-table {
      display: table !important;
    }
    .d-lg-table-row {
      display: table-row !important;
    }
    .d-lg-table-cell {
      display: table-cell !important;
    }
  }
  @media (min-width: 1200px) {
    .d-xl-table {
      display: table !important;
    }
    .d-xl-table-row {
      display: table-row !important;
    }
    .d-xl-table-cell {
      display: table-cell !important;
    }
  }
  @media (min-width: 1400px) {
    .d-xxl-table {
      display: table !important;
    }
    .d-xxl-table-row {
      display: table-row !important;
    }
    .d-xxl-table-cell {
      display: table-cell !important;
    }
  }
  @media print {
    .d-print-table {
      display: table !important;
    }
    .d-print-table-row {
      display: table-row !important;
    }
    .d-print-table-cell {
      display: table-cell !important;
    }
  }
`;
