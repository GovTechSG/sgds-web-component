import { css } from "lit";

export default css`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  .nav {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
  }
  .nav-tabs {
    border-bottom: 1px solid transparent;
  }
  .sgds.nav-tabs {
    border-bottom: none;
    gap: 2rem;
  }
  .sgds.nav-tabs[variant="tabs-basic-toggle"] {
    gap: 0;
  }
  /** scss */
  slot[name="nav"] {
    &[variant="tabs-basic-toggle"]::slotted(sgds-tab) {
      margin-left: -2px;
    }
  }
`;
