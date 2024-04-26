import { css } from "lit";

export default css`
  .sgds.combobox .form-control-icon,
  .sgds.combobox .form-control-icon-validate {
    align-items: center;
    display: flex;
    font-size: 1rem;
    height: 3rem;
    justify-content: center;
    position: absolute;
    width: 3rem;
    z-index: 4;
  }
  .sgds.combobox {
    align-items: stretch;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
  }
  .sgds.combobox > .form-control {
    padding-left: 3rem;
  }
  .sgds.combobox > .form-control:focus {
    z-index: 3;
  }
  .sgds.combobox .form-control-icon-validate {
    left: inherit;
    right: 0;
  }
  .sgds.combobox {
    justify-content: flex-end;
  }
  .sgds.combobox > .form-control {
    padding-left: 1rem;
    padding-right: 3rem;
  }
  .sgds.combobox > .dropdown-menu {
    min-width: 100%;
  }
  .w-100 {
    width: 100% !important;
  }
  .form-control-icon {
    bottom: 0;
  }
`;