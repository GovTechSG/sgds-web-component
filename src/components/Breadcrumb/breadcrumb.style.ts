import { css } from "lit";
export default css`
  /* slot[name="separator"]::slotted(*) {
    display: inline-block;
    align-items: center;
    padding-left: 0.25rem;
    padding-right: 0.5rem;
  } */

  /* :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  } */

  .breadcrumb {
    --sgds-breadcrumb-padding-x: 0;
    --sgds-breadcrumb-padding-y: 0;
    --sgds-breadcrumb-margin-bottom: 1rem;
    --sgds-breadcrumb-bg: ;
    --sgds-breadcrumb-border-radius: ;
    --sgds-breadcrumb-divider-color: var(--sgds-secondary-color);
    --sgds-breadcrumb-item-padding-x: 0.5rem;
    --sgds-breadcrumb-item-active-color: var(--sgds-secondary-color);
    background-color: var(--sgds-breadcrumb-bg);
    border-radius: var(--sgds-breadcrumb-border-radius);
    display: flex;
    flex-wrap: wrap;
    font-size: var(--sgds-breadcrumb-font-size);
    list-style: none;
    margin-bottom: var(--sgds-breadcrumb-margin-bottom);
    padding: var(--sgds-breadcrumb-padding-y) var(--sgds-breadcrumb-padding-x);
  }
`;
