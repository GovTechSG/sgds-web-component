import { css } from "lit";

export default css`
  .text-primary {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-primary-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-secondary {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-secondary-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-success {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-success-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-info {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-info-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-warning {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-warning-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-danger {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-danger-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-light {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-light-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-dark {
    --sgds-text-opacity: 1;
    color: rgba(var(--sgds-dark-rgb), var(--sgds-text-opacity)) !important;
  }
  .text-muted {
    --sgds-text-opacity: 1;
    color: var(--sgds-secondary-color) !important;
  }
`;
