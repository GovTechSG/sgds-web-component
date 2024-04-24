import { css } from "lit";
import anchorStyles from "../../styles/anchor";

export default css`
${anchorStyles}
.breadcrumb-item + .breadcrumb-item {
    padding-left: var(--sgds-breadcrumb-item-padding-x);
  }
  .breadcrumb-item + .breadcrumb-item:before {
    color: var(--sgds-breadcrumb-divider-color);
    content: var(--sgds-breadcrumb-divider, "/");
    float: left;
    padding-right: var(--sgds-breadcrumb-item-padding-x);
  }
  .breadcrumb-item.active {
    color: var(--sgds-breadcrumb-item-active-color);
  }
 ` 