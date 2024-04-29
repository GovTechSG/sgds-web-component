import { css } from "lit";
export default css`
  .datepicker-header {
    padding: 1.5rem 1.5rem 0;
    border: none;
    color: var(--datepicker-theme-color);
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    line-height: 28px;

    button {
      cursor: pointer;
      background-color: transparent;
      color: var(--datepicker-theme-color);
      border: none;
      font-weight: bold;
      font-size: 14px;
    }
    button:focus {
      outline: var(--datepicker-theme-color) auto 2px;
    }
    svg {
      font-size: 10rem;
    }
  }
`;
